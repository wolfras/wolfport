// src/pages/MessagePage.jsx
import React, { useState } from 'react';

const MessagePage = ({ onAddMessage }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !message) return;

    setIsLoading(true);
    setStatus({ type: '', text: '' });

    try {
      // Send to your backend API endpoint
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          message: message,
          timestamp: new Date().toISOString(),
          email: 'wolfras87@gmail.com' // Your email
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      
      // Add to System Stream
      onAddMessage({ name, text: message });
      
      // Clear form
      setName('');
      setMessage('');
      
      // Show success message
      setStatus({
        type: 'success',
        text: '✅ Message sent successfully! I will get back to you soon.'
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => setStatus({ type: '', text: '' }), 5000);
      
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus({
        type: 'error',
        text: '❌ Failed to send message. Please try again later or contact me directly at wolfras87@gmail.com'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="message-section">
      <div className="container">
        <div className="section-header">
          <h2>Leave Your Digital Signature</h2>
          <p>Join visitors who've left their mark on WolfPort</p>
          <small>Your message will be sent to my email and appear in the System Stream</small>
        </div>

        {/* Status Message */}
        {status.text && (
          <div className={`status-message ${status.type}`}>
            {status.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="message-form">
          <input
            type="text"
            placeholder="Your name (max 50 characters)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength="50"
            required
            disabled={isLoading}
          />
          <textarea
            placeholder="Your message (max 300 characters)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength="300"
            rows="4"
            required
            disabled={isLoading}
          />
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Leave Your Mark →'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default MessagePage;