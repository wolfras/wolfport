// back-end/server.js - Gemini API with fallback support
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize Gemini AI
const genAI = process.env.GEMINI_API_KEY 
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

// Intelligent responses without API key (fallback)
function getSmartResponse(question) {
  const q = question.toLowerCase();
  
  // Geography questions
  if (q.includes('capital of rwanda') || (q.includes('capital') && q.includes('rwanda'))) {
    return "The capital city of Rwanda is **Kigali**. It's the largest city in Rwanda and serves as the country's economic and cultural hub. 🇷🇼";
  }
  
  // About wolfras
  if (q.includes('who is mugisha isihaqa') || q.includes('mugisha isihaqa')) {
    return "**Mugisha isihaqa** is a talented Full-Stack Developer who builds real-world web applications, dashboards, and backend systems. He specializes in React, Node.js, Express, and modern web technologies. He created this portfolio and the WolfrasAI assistant you're talking to! 👨‍💻";
  }
  
  // wolfras's projects
  if (q.includes('project') || q.includes('built')) {
    return "wolfras has built several impressive projects:\n\n• **wolfras AI** - Production-ready AI assistant\n• **Fenix** - High-performance backend framework\n• **FrankCloud** - Intelligent weather application\n• **VoltChat** - Enterprise messaging system\n• **FrankPort** - This portfolio website\n\nWhich project would you like to know more about?";
  }
  
  // Technologies
  if (q.includes('technology') || q.includes('tech stack') || q.includes('skills')) {
    return "wolfras's tech stack includes:\n\n**Frontend:** React.js, Vue.js, HTML5, CSS3, JavaScript (ES6+)\n**Backend:** Node.js, Express.js, RESTful APIs\n**Databases:** MySQL, MongoDB\n**Tools:** Git, Docker, Figma";
  }
  
  // Greeting
  if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    return "Hello there! 👋 I'm WolfrasAI, wolfras's intelligent assistant. I can answer questions about wolfras's work, web development, general knowledge, and more. What would you like to know?";
  }
  
  // Default response
  return `Thanks for your question! I'm WolfrasAI, and I can help you with:

• Learning about Mugisha is'haqa (full-stack developer)
• wolfras's projects and experience  
• Web development technologies
• General knowledge questions

You asked: "${question}"

Could you rephrase or ask me something specific about wolfras's work or general knowledge?`;
}

// Generate response using Gemini AI
async function getGeminiResponse(messages) {
  if (!genAI) {
    return null; // No API key available
  }

  try {
    // Get the latest user message
    const userMessage = messages[messages.length - 1]?.content || '';
    
    // System prompt to guide the AI
    const systemPrompt = `You are WolfrasAI, an intelligent assistant for Mugisha Isihaqa (wolfras), a Full-Stack Developer. 
    Your role is to help visitors learn about wolfras's work, skills, projects, and web development expertise.
    
    Key information about wolfras:
    - Full-Stack Developer specializing in React, Node.js, Express, MongoDB, MySQL
    - Has built projects like: Fenix (backend framework), FrankCloud (weather app), VoltChat (messaging system)
    - Passionate about creating production-ready applications and innovative solutions
    - Based in Rwanda
    
    Be helpful, friendly, and professional. Keep responses concise but informative.
    If asked about topics outside your scope, politely redirect to wolfras's work or web development.`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [{ text: "I understand. I'll act as WolfrasAI and help visitors learn about Mugisha Isihaqa's work and web development expertise." }],
        },
      ],
    });

    // Add conversation history (last 5 messages for context)
    const recentMessages = messages.slice(-5);
    for (const msg of recentMessages) {
      if (msg.role === 'user') {
        await chat.sendMessage(msg.content);
      }
    }

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('❌ Gemini API Error:', error.message);
    return null; // Fallback to smart responses
  }
}

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    const userMessage = messages[messages.length - 1]?.content || '';
    console.log('💬 Message:', userMessage);
    
    let aiResponse;
    let usedGemini = false;
    
    // Try to use Gemini AI first if available
    if (genAI) {
      console.log('🤖 Attempting Gemini API response...');
      aiResponse = await getGeminiResponse(messages);
      if (aiResponse) {
        usedGemini = true;
        console.log('✅ Gemini API response successful');
      } else {
        console.log('⚠️ Gemini API failed, using fallback');
      }
    }
    
    // Fallback to smart responses if Gemini fails or isn't available
    if (!aiResponse) {
      aiResponse = getSmartResponse(userMessage);
      console.log('📝 Using fallback response system');
    }
    
    res.json({ 
      success: true, 
      content: aiResponse,
      usedGemini: usedGemini || false
    });
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    geminiEnabled: !!genAI,
    mode: genAI ? 'Gemini AI + Fallback' : 'Fallback Only'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📍 Chat endpoint: POST http://localhost:${PORT}/api/chat`);
  if (genAI) {
    console.log(`🤖 Mode: Gemini AI with intelligent fallback`);
  } else {
    console.log(`📝 Mode: Fallback responses (no API key found)`);
    console.log(`💡 Tip: Add GEMINI_API_KEY to your .env file to enable Gemini AI`);
  }
});