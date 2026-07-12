// backend/middleware/validation.js
const MAX_MESSAGES = 50;

export const validateChatRequest = (req, res, next) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ 
      error: 'Invalid request', 
      details: 'messages array is required' 
    });
  }

  if (messages.length > MAX_MESSAGES) {
    return res.status(400).json({ 
      error: 'Request too large', 
      details: `Maximum ${MAX_MESSAGES} messages allowed` 
    });
  }

  for (const msg of messages) {
    if (typeof msg.role !== 'string' || typeof msg.content !== 'string') {
      return res.status(400).json({ 
        error: 'Invalid message format', 
        details: 'Each message must have role and content strings' 
      });
    }
  }

  next();
};