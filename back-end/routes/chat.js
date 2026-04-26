// backend/src/routes/chat.js
const express = require('express');
const { validateChatRequest } = require('../middleware/validation');
const { getAIResponse } = require('../services/chatService');

const router = express.Router();

// Simple in-memory rate limiting
const requestCounts = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 30; // 30 requests per minute

const rateLimiter = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const userRequests = requestCounts.get(ip) || [];
  
  // Clean old requests
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

// Chat endpoint
router.post('/chat', rateLimiter, validateChatRequest, async (req, res) => {
  try {
    const { messages, options = {} } = req.body;
    
    // Add system prompt about Frank's portfolio
    const enhancedMessages = [
      {
        role: 'system',
        content: `You are WolfrasAI, a helpful AI assistant integrated into FrankPort, the portfolio website of Frank Nabasa, a full-stack developer. 
        You help visitors learn about Frank's work, answer technical questions, and provide assistance with web development topics.
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

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

module.exports = router;