// backend/src/config/deepseek.js
const OpenAI = require('openai');
require('dotenv').config();

// Check if API key exists
if (!process.env.DEEPSEEK_API_KEY) {
  console.error('ERROR: Missing DEEPSEEK_API_KEY in .env file');
  console.error('Please add: DEEPSEEK_API_KEY=your_api_key_here');
}

// Create DeepSeek client
const deepseek = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY || 'dummy-key',
  baseURL: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com',
});

module.exports = deepseek;