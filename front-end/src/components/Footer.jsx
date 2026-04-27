// frontend/src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Logo Section */}
          <div className="footer-section">
            <h3 className="footer-logo">WolfPort.</h3>
            <p className="footer-description">
              Building real-world web applications, dashboards, and backend systems 
              that actually work in production.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Connect Section */}
          <div className="footer-section">
            <h4>Connect</h4>
            <ul className="footer-links">
              <li>
                <a href="https://github.com/wolfras" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/wolfras" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:wolfras@example.com">
                  Email
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>Contact</h4>
            <ul className="footer-links">
              <li>📧 wolfras@example.com</li>
              <li>📍 Remote / Worldwide</li>
              <li>💼 Available for work</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} WolfPort. All rights reserved.</p>
          <p className="footer-credit">
            Built with React •  Powered by Wolfras AI •  Designed by Wolfras
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;