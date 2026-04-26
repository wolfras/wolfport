// backend/src/services/chatService.js
const deepseek = require('../config/deepseek');

const getAIResponse = async (messages, options = {}) => {
  try {
    const response = await deepseek.chat.completions.create({
      model: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
      messages: messages,
      temperature: options.temperature || 0.7,
      max_tokens: options.max_tokens || 1000,
      stream: false,
    });

    return {
      success: true,
      content: response.choices[0].message.content,
      usage: response.usage,
    };
  } catch (error) {
    console.error('DeepSeek API Error:', error.message);
    
    if (error.status === 401) {
      throw new Error('Invalid API key. Please check your DeepSeek API configuration.');
    }
    if (error.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    
    throw new Error('AI service temporarily unavailable. Please try again.');
  }
};

module.exports = { getAIResponse };