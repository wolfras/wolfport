// frontend/api/send-message.js
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, message, timestamp, email } = req.body;

    // Validate input
    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required' });
    }

    // Your email address (you can store this in environment variables)
    const yourEmail = 'wolfras87@gmail.com';
    
    // Using EmailJS or FormSpree free service
    // Option 1: Using FormSpree (Free, no backend needed alternative)
    // Option 2: Using EmailJS (Free tier available)
    
    // For now, we'll use a free service called FormSpree
    // Sign up at https://formspree.io/ to get your endpoint
    
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;
    
    if (!formspreeEndpoint) {
      // Fallback: Log to console and don't send email
      console.log('New message received:');
      console.log(`From: ${name}`);
      console.log(`Message: ${message}`);
      console.log(`Time: ${timestamp}`);
      
      return res.status(200).json({ 
        success: true, 
        message: 'Message received (email service not configured)' 
      });
    }

    // Send to FormSpree
    const response = await fetch(formspreeEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        message: message,
        _subject: `New message from ${name} on WolfPort`,
        _replyto: yourEmail,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
}