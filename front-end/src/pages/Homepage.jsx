// src/pages/HomePage.jsx
import React from 'react';
import CodeBlock from '../components/CodeBlock';
import { developer, stats } from '../data/developerData';

const HomePage = ({ onScrollToContact }) => {
  const codeString = `const developer = {
  name: 'Mugisha Isihaq',
  skills: [ 'JS', 'React.js', 'HTML', 'CSS'],
  passion: 'Creating Amazing Web Experiences'
}`;

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <div className="hero-badge">Available for new opportunities</div>
        <h1>
          Hi, I'm <span className="highlight">Mugisha Isihaqa</span>
        </h1>
        <p className="hero-subtitle">
          I build real-world web applications, dashboards, and backend systems 
          that actually work in production — not just demos or templates.
        </p>
        
        <div className="stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <CodeBlock code={codeString} />

        <button className="cta-button" onClick={onScrollToContact}>
          Let's Work Together →
        </button>
      </div>
    </section>
  );
};

export default HomePage;