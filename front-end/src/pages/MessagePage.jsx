// src/pages/MessagePage.jsx
import React, { useState } from 'react';

const MessagePage = ({ onAddMessage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !message) return;

    setIsLoading(true);
    setStatus({ type: '', text: '' });

    try {
      // Backend API URL (Nodemailer endpoint)
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }
      
      // Add to System Stream
      if (onAddMessage) {
        onAddMessage({ name, text: message });
      }
      
      // Clear form
      setName('');
      setEmail('');
      setMessage('');
      
      // Show success message
      setStatus({
        type: 'success',
        text: '✅ Message sent successfully! I will get back to you soon.',
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => setStatus({ type: '', text: '' }), 5000);
      
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus({
        type: 'error',
        text: '❌ Failed to send message. Please try again or contact me directly at wolfras87@gmail.com',
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
          <small>Your message will be sent directly to my email</small>
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
            placeholder="Your name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength="50"
            required
            disabled={isLoading}
          />
          <input
            type="email"
            placeholder="Your email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength="100"
            disabled={isLoading}
          />
          <textarea
            placeholder="Your message *"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength="500"
            rows="5"
            required
            disabled={isLoading}
          />
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Message →'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default MessagePage;