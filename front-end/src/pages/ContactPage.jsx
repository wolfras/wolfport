// src/pages/ContactPage.jsx
import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-number">05</span>
          <h2>Get In Touch</h2>
          <p>Let's discuss your next project or opportunity</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's Work Together</h3>
            <p>I'm always interested in new opportunities and exciting projects. Whether you're looking for a developer to join your team or need help bringing your ideas to life, I'd love to hear from you.</p>
              <div className="contact-item">
                <strong>📧 Email</strong>
                <p>wolfras87@gmail.com</p>
              </div>
              <div className="contact-item">
                <strong>🔗 GitHub</strong>
                <p>github.com/wolfras</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Your name" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <input 
              type="email" 
              placeholder="Your email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <textarea 
              placeholder="Your message" 
              rows="5" 
              required
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            ></textarea>
            <button type="submit" className="submit-button">Send Message →</button>
          </form>
        </div>
    </section>
  );
};

export default ContactPage;