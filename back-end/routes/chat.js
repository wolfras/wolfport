// backend/routes/chat.js
import express from 'express';
import { validateChatRequest } from '../middleware/validation.js';
import { getAIResponse } from '../services/chatService.js';

const router = express.Router();

const requestCounts = new Map();
const RATE_LIMIT_WINDOW = 60000;
const RATE_LIMIT_MAX = 30;

const rateLimiter = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const userRequests = requestCounts.get(ip) || [];
  
  const recentRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= RATE_LIMIT_MAX) {
    return res.status(429).json({ 
      error: 'Too many requests', 
      details: 'Please try again later.' 
    });
  }
  
  recentRequests.push(now);
  requestCounts.set(ip, recentRequests);
  next();
};

router.post('/chat', rateLimiter, validateChatRequest, async (req, res) => {
  try {
    const { messages, options = {} } = req.body;
    
    const enhancedMessages = [
      {
        role: 'system',
        content: `You are Kevin The Cyber Coder, a helpful AI assistant integrated into WolfPort, the portfolio website of Mukeshimana Kevin (Kevin The Cyber Coder), a full-stack developer from Rwanda.
        You help visitors learn about Kevin's work, answer technical questions, and provide assistance with web development topics.
        Be friendly, professional, and informative. Keep responses concise but helpful.`
      },
      ...messages
    ];
    
    const result = await getAIResponse(enhancedMessages, options);
    res.json(result);
  } catch (error) {
    console.error('Chat error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

router.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

export default router;