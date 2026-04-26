// src/pages/MessagePage.jsx
import React, { useState } from 'react';

const MessagePage = ({ onAddMessage }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && message) {
      onAddMessage({ name, text: message });
      setName('');
      setMessage('');
      alert('Thank you for your message! It will appear in the System Stream.');
    }
  };

  return (
    <section className="message-section">
      <div className="container">
        <div className="section-header">
          <h2>Leave Your Digital Signature</h2>
          <p>Join visitors who've left their mark on FrankPort</p>
          <small>After review, your message will show in the System Stream</small>
        </div>

        <form onSubmit={handleSubmit} className="message-form">
          <input
            type="text"
            placeholder="Your name (max 50 characters)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength="50"
            required
          />
          <textarea
            placeholder="Your message (max 300 characters)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength="300"
            rows="4"
            required
          />
          <button type="submit" className="submit-button">
            Leave Your Mark →
          </button>
        </form>
      </div>
    </section>
  );
};

export default MessagePage;