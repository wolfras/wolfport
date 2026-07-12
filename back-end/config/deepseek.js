// backend/config/deepseek.js
import 'dotenv/config';
import OpenAI from 'openai';

if (!process.env.DEEPSEEK_API_KEY) {
  console.warn('⚠️  Missing DEEPSEEK_API_KEY in .env file');
}

export const deepseek = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY || 'dummy-key',
  baseURL: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com',
});