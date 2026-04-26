// src/components/SystemStream.jsx
import React from 'react';

const SystemStream = ({ isOpen, messages, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="system-stream">
      <div className="stream-header">
        <h3>System Stream</h3>
        <button onClick={onClose}>×</button>
      </div>
      <div className="stream-messages">
        {messages.length === 0 ? (
          <div className="empty-stream">
            <p>Your garden is quiet</p>
            <small>No notifications yet. Messages from visitors will bloom here</small>
          </div>
        ) : (
          messages.map(msg => (
            <div key={msg.id} className="stream-message">
              <strong>{msg.name}</strong>
              <p>{msg.text}</p>
              <small>{msg.timestamp.toLocaleTimeString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SystemStream;