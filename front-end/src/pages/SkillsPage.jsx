// src/pages/SkillsPage.jsx
import React from 'react';
import SkillBar from '../components/SkillBar';
import { skills, techStack } from '../data/skillsData';

const SkillsPage = () => {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <div className="section-header">
          <span className="section-number">03</span>
          <h2>Skills & Expertise</h2>
          <p className="section-subtitle">Technical proficiencies and tools I work with</p>
        </div>

        <div className="skills-container">
          <div className="skills-category">
            <h3>Frontend Development</h3>
            {skills.frontend.map((skill, index) => (
              <SkillBar key={index} name={skill.name} level={skill.level} />
            ))}
          </div>
        </div>

        <div className="tech-stack">
          <div className="tech-icons">
            {techStack.map((tech, index) => (
              <div key={index} className="tech-icon">{tech}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsPage;