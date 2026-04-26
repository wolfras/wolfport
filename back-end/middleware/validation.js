// backend/src/middleware/validation.js
const MAX_MESSAGES = 50;

const validateChatRequest = (req, res, next) => {
  const { messages } = req.body;

  // Check if messages exist
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ 
      error: 'Invalid request', 
      details: 'messages array is required' 
    });
  }

  // Check message limit
  if (messages.length > MAX_MESSAGES) {
    return res.status(400).json({ 
      error: 'Request too large', 
      details: `Maximum ${MAX_MESSAGES} messages allowed` 
    });
  }

  // Validate each message
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

module.exports = { validateChatRequest };