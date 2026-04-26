// src/pages/AboutPage.jsx
import React from 'react';

const AboutPage = () => {
  const strengths = [
    {
      title: 'Production-Ready Code',
      description: 'Writing maintainable, scalable code that supports real users, real data, and long-term growth.'
    },
    {
      title: 'System-Level Problem Solving',
      description: 'Designing and debugging complete systems from frontend behavior to backend logic and data flow.'
    },
    {
      title: 'Client & Team Collaboration',
      description: 'Translating business requirements into working technical solutions and communicating clearly.'
    }
  ];

  const timeline = [
    { year: '2024 - present', title: 'Frontend Developer', description: 'Building responsive web applications with HTML, CSS, and JavaScript' },
    { year: '2022 - 2024', title: 'cybersecurity analyst', description: 'Securing web applications and APIs, performing penetration testing, and implementing security best practices' },
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header">
          <span className="section-number">01</span>
          <h2>About Me</h2>
          <p className="section-subtitle">Passionate developer with a mission to create exceptional digital experiences</p>
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a full-stack web developer focused on building functional, production-ready systems — including APIs, 
              dashboards, authentication flows, and real data-driven applications.
            </p>
            <p>
              I don't just design interfaces. I also build the logic behind them, connect databases, secure user access, 
              and make sure applications actually run reliably in the real world.
            </p>
            
            <div className="strengths">
              {strengths.map((strength, index) => (
                <div key={index} className="strength">
                  <h4>{strength.title}</h4>
                  <p>{strength.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="timeline">
            <h3>Experience Timeline</h3>
            {timeline.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-content">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;