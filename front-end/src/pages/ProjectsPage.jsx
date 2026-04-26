// src/pages/ProjectsPage.jsx
import React from 'react';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projectsData';

const ProjectsPage = () => {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-header">
          <span className="section-number">02</span>
          <h2>Selected Projects</h2>
          <p className="section-subtitle">A focused selection of real-world systems I've built</p>
        </div>

        <div className="projects-grid">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsPage;