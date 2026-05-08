// back-end/server.js - Full version with Gemini AI + Email
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ==================== GEMINI AI SETUP ====================

// Initialize Gemini AI
const genAI = process.env.GEMINI_API_KEY 
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

// Generate response using Gemini AI
async function getGeminiResponse(userMessage) {
  if (!genAI) {
    return null;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const systemPrompt = `You are WolfrasAI, an intelligent assistant for Mugisha Isihaqa (wolfras), a Full-Stack Developer from Rwanda.

About Mugisha Isihaqa (wolfras):
- Full-Stack Developer specializing in React, Node.js, Express, MongoDB, MySQL
- Projects: Wolfras AI, Islamic Knowledge Hub, Intruder App, Web Blocker, E-commerce Website, WolfPort
- Skills: React, Node.js, JavaScript, HTML5, CSS3, Express, MongoDB, MySQL, Git, Docker
- Location: Rwanda (based in Kigali)
- Availability: Open for freelance, collaboration, and full-time opportunities
- Contact: wolfras87@gmail.com

Your role:
- Be friendly, professional, and conversational
- Provide accurate information about wolfras's work
- Answer general knowledge questions (capitals, technology, etc.)
- Keep responses concise but informative
- Use emojis occasionally to be engaging

You are integrated into WolfPort (https://wolfport.vercel.app), wolfras's professional portfolio website.`;

    const fullPrompt = `${systemPrompt}\n\nUser: ${userMessage}\n\nWolfrasAI:`;
    
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini Error:', error.message);
    return null;
  }
}

// Fallback responses (if Gemini fails)
function getFallbackResponse(question) {
  const q = question.toLowerCase();
  
  if (q.includes('who is mugisha') || q.includes('mugisha isihaqa') || q.includes('wolfras')) {
    return "🐺 **Mugisha Isihaqa (wolfras)** is a Full-Stack Developer specializing in React, Node.js, and modern web technologies. Based in Rwanda, he's available for freelance opportunities! 👨‍💻";
  }
  
  if (q.includes('capital of rwanda')) {
    return "🇷🇼 The capital city of Rwanda is **Kigali**. It's known for its cleanliness, safety, and beautiful hills!";
  }
  
  if (q.includes('hello') || q.includes('hi')) {
    return "👋 Hello! I'm **WolfrasAI**, your intelligent assistant. Ask me about Mugisha Isihaqa's work, web development, or general knowledge!";
  }
  
  return "Thanks for your question! I'm WolfrasAI. I can help you learn about wolfras's work, web development, or answer general knowledge questions. What would you like to know?";
}

// ==================== CHAT ENDPOINT ====================

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    const userMessage = messages[messages.length - 1]?.content || '';
    
    console.log(`💬 Message: "${userMessage.substring(0, 50)}"`);
    
    let aiResponse;
    let usedGemini = false;
    
    // Try Gemini AI first
    if (genAI) {
      aiResponse = await getGeminiResponse(userMessage);
      if (aiResponse) {
        usedGemini = true;
        console.log('✅ Gemini AI response used');
      }
    }
    
    // Fallback to smart responses
    if (!aiResponse) {
      aiResponse = getFallbackResponse(userMessage);
      console.log('📝 Fallback response used');
    }
    
    res.json({ success: true, content: aiResponse, usedGemini });
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ==================== CONTACT FORM ENDPOINT ====================

app.post('/api/contact', async (req, res) => {
  console.log('📧 Contact endpoint called');
  
  try {
    const { name, message, email } = req.body;
    
    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required' });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('Missing email credentials');
      return res.status(500).json({ error: 'Email not configured' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.verify();
    console.log('✅ Email transporter verified');

    const mailOptions = {
      from: `"WolfPort" <${process.env.EMAIL_USER}>`,
      to: 'wolfras87@gmail.com',
      subject: `🐺 New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email || 'Not provided'}\n\nMessage:\n${message}`,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', result.messageId);

    res.json({ success: true, message: 'Message sent successfully!' });

  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ==================== HEALTH CHECK ====================

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    geminiEnabled: !!genAI,
    emailConfigured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASSWORD)
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'WolfPort Backend Server',
    endpoints: ['/api/chat', '/api/contact', '/api/health']
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`🤖 Gemini AI: ${genAI ? 'Enabled' : 'Disabled (add GEMINI_API_KEY to .env)'}`);
  console.log(`📧 Email: ${process.env.EMAIL_USER ? 'Configured' : 'Not configured'}\n`);
});