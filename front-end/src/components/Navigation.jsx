// src/components/Navigation.jsx
import React, { useState } from 'react';

const Navigation = ({ onScrollToSection, onToggleSystemStream }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo" onClick={() => onScrollToSection('home')}>
          <span className='wolf'>Wolf</span>Port.
        </div>
        
        <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {navItems.map(item => (
            <li key={item.id}>
              <a href={`#${item.id}`} onClick={(e) => {
                e.preventDefault();
                onScrollToSection(item.id);
                setIsMobileMenuOpen(false);
              }}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        
        <button 
          className="menu-icon" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navigation;