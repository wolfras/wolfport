// src/App.jsx
import React, { useState, useEffect } from 'react';
import './index.css';
import Navigation from './components/Navigation.jsx';
import SystemStream from './components/SystemStream.jsx';
import Chatbot from './components/Chatbot.jsx';
import HomePage from './pages/Homepage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import Footer from './components/Footer.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import SkillsPage from './pages/SkillsPage.jsx';
import TestimonialsPage from './pages/TestimonialsPage.jsx';
import MessagePage from './pages/MessagePage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import useScrollToSection from './useScrollToSection.js';

function App() {
  const [showSystemStream, setShowSystemStream] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const scrollToSection = useScrollToSection();

  // Load saved theme preference on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, []);

  // Save theme preference whenever it changes
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    if (!isDarkMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleToggleSystemStream = () => {
    setShowSystemStream(!showSystemStream);
  };

  const handleAddMessage = (message) => {
    setMessages([...messages, { ...message, id: Date.now(), timestamp: new Date() }]);
  };

  return (
    <div className="App">
      {/* Theme Toggle Button */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? '☀️' : '🌙'}
      </button>
      
      <Navigation 
        onScrollToSection={scrollToSection}
        onToggleSystemStream={handleToggleSystemStream}
      />
      
      <SystemStream 
        isOpen={showSystemStream}
        messages={messages}
        onClose={() => setShowSystemStream(false)}
      />
      
      <main>
        <HomePage onScrollToContact={() => scrollToSection('contact')} />
        <AboutPage />
        <ProjectsPage />
        <SkillsPage />
        <TestimonialsPage />
        <MessagePage onAddMessage={handleAddMessage} />
        <ContactPage />
        <Footer />
      </main>
      
      <Chatbot />
    </div>
  );
}

export default App;