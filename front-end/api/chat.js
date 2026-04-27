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
      console.warn('GEMINI_API_KEY not set, using fallback');
      // Return a helpful fallback response
      return res.json({ 
        success: true, 
        content: getFallbackResponse(userMessage),
        usedGemini: false 
      });
    }
    
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
    
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are WolfrasAI, a helpful AI assistant for WolfPort, the portfolio of Mugisha Isihaqa (wolfras), a full-stack developer. Answer questions helpfully and conversationally.
            
            User question: ${userMessage}`
          }]
        }]
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API Error:', errorData);
      throw new Error(`Gemini API Error: ${response.status}`);
    }
    
    const data = await response.json();
    const aiResponse = data.candidates[0]?.content?.parts[0]?.text || 'Sorry, I could not generate a response.';
    
    res.json({ success: true, content: aiResponse, usedGemini: true });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ 
      success: false, 
      content: "I'm having trouble connecting to my AI brain. Please try again later.",
      error: error.message 
    });
  }
}

// Fallback responses when Gemini API is not available
function getFallbackResponse(question) {
  const q = question.toLowerCase();
  
  if (q.includes('who is') && (q.includes('wolfras') || q.includes('mugisha') || q.includes('isihaqa'))) {
    return "Mugisha Isihaqa (wolfras) is a passionate Full-Stack Developer who builds real-world web applications, dashboards, and backend systems. He specializes in React, Node.js, Express, and modern web technologies. He created this portfolio and the WolfrasAI assistant you're talking to! 👨‍💻";
  }
  
  if (q.includes('hello') || q.includes('hi')) {
    return "Hello there! 👋 I'm WolfrasAI, your intelligent assistant. How can I help you today? You can ask me about Mugisha's work, web development, or general knowledge questions!";
  }
  
  if (q.includes('project')) {
    return "Mugisha has built several impressive projects including WolfPort (this portfolio), AI chatbots, full-stack web applications, and more. What specific type of project would you like to know about?";
  }
  
  return "Thanks for your question! I'm WolfrasAI, and I'm here to help. Could you tell me more about what you'd like to know regarding Mugisha's work or web development?";
}