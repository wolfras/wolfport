// src/api/chat.js - This will be your API helper
// Note: For security, you should create a proper backend server
// But for development, we'll use a proxy approach

const DEEPSEEK_API_KEY = 'sk-db77972051e74b9db4ac2beb631e64d1'; // Get from https://platform.deepseek.com/
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
 const sendMessageToAI = async (messages) => {
  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('AI Error:', error);
    return "I'm having trouble connecting to my AI brain. Please check your API key or try again later.";
  }
};

export { sendMessageToAI };