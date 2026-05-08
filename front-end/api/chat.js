// frontend/api/chat.js - Gemini API backend for Vercel
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages array is required' });
    }
    
    // Get user's last message
    const userMessage = messages[messages.length - 1]?.content || '';
    
    // Get Gemini API key from environment variable
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY) {
      console.warn('⚠️ GEMINI_API_KEY not set, using fallback');
      return res.json({ 
        success: true, 
        content: getFallbackResponse(userMessage),
        usedGemini: false 
      });
    }
    
    // Updated Gemini API endpoint (using latest model)
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    // Enhanced system prompt
    const systemPrompt = `You are WolfrasAI, a helpful AI assistant for WolfPort, the portfolio of Mugisha Isihaqa (wolfras), a full-stack developer from Rwanda.

About Mugisha Isihaqa (wolfras):
- Full-Stack Developer specializing in React, Node.js, Express, MongoDB, MySQL
- Projects: Wolfras AI, Islamic Knowledge Hub, Intruder App, Web Blocker, E-commerce Website, WolfPort
- Skills: React, Node.js, JavaScript, HTML5, CSS3, Express, MongoDB, MySQL, Git, Docker
- Location: Rwanda (based in Kigali)
- Availability: Open for freelance, collaboration, and full-time opportunities
- Contact: wolfras87@gmail.com, GitHub: github.com/wolfras

Your role:
- Be friendly, professional, and conversational
- Provide accurate information about wolfras's work
- Answer general knowledge questions (capitals, technology, etc.)
- Keep responses concise but informative (2-3 sentences max)
- Use emojis occasionally to be engaging

You are integrated into WolfPort (https://wolfport.vercel.app).`;
    
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${systemPrompt}\n\nUser: ${userMessage}\n\nWolfrasAI:`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
          topP: 0.8,
          topK: 40
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Gemini API Error:', errorData);
      
      // Handle specific error types
      if (response.status === 429) {
        return res.json({ 
          success: true, 
          content: "⚠️ The AI is currently busy. Please try again in a moment! 🐺",
          usedGemini: false 
        });
      }
      
      if (response.status === 403 || response.status === 401) {
        return res.json({ 
          success: true, 
          content: "🔑 API key issue. Please contact wolfras to fix this.",
          usedGemini: false 
        });
      }
      
      throw new Error(`Gemini API Error: ${response.status}`);
    }
    
    const data = await response.json();
    let aiResponse = data.candidates[0]?.content?.parts[0]?.text || 'Sorry, I could not generate a response.';
    
    // Clean up response if needed
    aiResponse = aiResponse.replace(/^WolfrasAI:\s*/i, '');
    
    res.json({ success: true, content: aiResponse, usedGemini: true });
  } catch (error) {
    console.error('❌ AI Error:', error);
    res.status(500).json({ 
      success: false, 
      content: "I'm having trouble connecting to my AI brain. Please try again later. 🐺",
      error: error.message 
    });
  }
}

// Enhanced fallback responses when Gemini API is not available
function getFallbackResponse(question) {
  const q = question.toLowerCase();
  
  // About wolfras / Mugisha Isihaqa
  if (q.includes('who is') && (q.includes('wolfras') || q.includes('mugisha') || q.includes('isihaqa'))) {
    return "🐺 **Mugisha Isihaqa (wolfras)** is a Full-Stack Developer specializing in React, Node.js, and modern web technologies. Based in Rwanda, he builds real-world web applications and backend systems. He's available for freelance opportunities! 👨‍💻";
  }
  
  // Projects
  if (q.includes('project') || q.includes('built')) {
    return "💼 Mugisha has built several impressive projects:\n\n• **Wolfras AI** - AI assistant\n• **Islamic Knowledge Hub** - Content platform\n• **Intruder App** - Security app\n• **Web Blocker** - Distraction blocker\n• **WolfPort** - This portfolio!\n\nWhich one would you like to know more about?";
  }
  
  // Skills / technologies
  if (q.includes('skill') || q.includes('tech') || q.includes('technology')) {
    return "🛠️ **Tech Stack:** React, Node.js, JavaScript, HTML5, CSS3, Express, MongoDB, MySQL, Git, Docker. Full-stack development with focus on security and performance! 🚀";
  }
  
  // Contact / hire
  if (q.includes('contact') || q.includes('hire') || q.includes('available')) {
    return "📧 You can reach Mugisha at **wolfras87@gmail.com** or visit his GitHub: **github.com/wolfras**. He's open for freelance and full-time opportunities! 🤝";
  }
  
  // Geography
  if (q.includes('capital of rwanda')) {
    return "🇷🇼 The capital of Rwanda is **Kigali**. It's known for its cleanliness, safety, and beautiful hills!";
  }
  
  // Greeting
  if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    return "👋 Hello! I'm **WolfrasAI**, your intelligent assistant. Ask me about Mugisha's work, web development, or general knowledge! What would you like to know? 🐺";
  }
  
  // Thank you
  if (q.includes('thank')) {
    return "You're very welcome! 🙏 I'm glad I could help. Feel free to ask more questions anytime! 😊";
  }
  
  // Default response
  return `🤖 I'm WolfrasAI, assistant for Mugisha Isihaqa (wolfras). I can help with questions about his work, web development, or general knowledge. What would you like to know?

Try asking:
• "Who is wolfras?"
• "What projects has he built?"
• "What technologies does he use?"
• "How can I contact him?"`;
}