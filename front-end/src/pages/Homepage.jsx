// src/pages/HomePage.jsx
import React, { useState } from 'react';

const HomePage = ({ onScrollToContact }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const codeString = `const developer = {
  name: 'Mugisha Isihaq',
  skills: [ 'JS', 'React.js', 'HTML', 'CSS'],
  passion: 'Creating Amazing Web Experiences'
}`;

  // Search functionality
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setShowResults(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = [];

    // Search through projects
    const projects = [
      { name: 'Wolfras AI', type: 'Project', link: '#projects' },
      { name: 'Islamic Knowledge Hub', type: 'Project', link: '#projects' },
      { name: 'Intruder App', type: 'Project', link: '#projects' },
      { name: 'Web Blocker', type: 'Project', link: '#projects' },
      { name: 'E-commerce Website', type: 'Project', link: '#projects' },
      { name: 'WolfPort', type: 'Project', link: '#projects' },
    ];

    // Search through sections
    const sections = [
      { name: 'About', type: 'Section', link: '#about' },
      { name: 'Projects', type: 'Section', link: '#projects' },
      { name: 'Skills', type: 'Section', link: '#skills' },
      { name: 'Contact', type: 'Section', link: '#contact' },
      { name: 'Home', type: 'Section', link: '#home' },
    ];

    // Search through skills
    const skills = [
      { name: 'React.js', type: 'Skill', link: '#skills' },
      { name: 'JavaScript', type: 'Skill', link: '#skills' },
      { name: 'HTML', type: 'Skill', link: '#skills' },
      { name: 'CSS', type: 'Skill', link: '#skills' },
      { name: 'Node.js', type: 'Skill', link: '#skills' },
      { name: 'Express.js', type: 'Skill', link: '#skills' },
      { name: 'MongoDB', type: 'Skill', link: '#skills' },
      { name: 'MySQL', type: 'Skill', link: '#skills' },
      { name: 'Git', type: 'Skill', link: '#skills' },
      { name: 'Docker', type: 'Skill', link: '#skills' },
    ];

    // Filter all categories
    projects.forEach(project => {
      if (project.name.toLowerCase().includes(query)) {
        results.push(project);
      }
    });

    sections.forEach(section => {
      if (section.name.toLowerCase().includes(query)) {
        results.push(section);
      }
    });

    skills.forEach(skill => {
      if (skill.name.toLowerCase().includes(query)) {
        results.push(skill);
      }
    });

    setSearchResults(results);
    setShowResults(true);
  };

  const handleResultClick = (link) => {
    const element = document.getElementById(link.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setShowResults(false);
      setSearchQuery('');
    }
  };

  // Close results when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.search-container')) {
        setShowResults(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <section id="home" className="hero">
      {/* Top Center Search Bar */}
      <div className="top-search-container">
        <div className="search-container">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              className="search-input"
              placeholder="🔍 Search portfolio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery && setShowResults(true)}
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
          
          {/* Search Results Dropdown */}
          {showResults && (
            <div className="search-results">
              {searchResults.length > 0 ? (
                searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="search-result-item"
                    onClick={() => handleResultClick(result.link)}
                  >
                    <span className="result-icon">
                      {result.type === 'Project' && '📁'}
                      {result.type === 'Section' && '📍'}
                      {result.type === 'Skill' && '💻'}
                    </span>
                    <div className="result-info">
                      <div className="result-name">{result.name}</div>
                      <div className="result-type">{result.type}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="search-no-results">
                  No results found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="hero-container">
        {/* Left Column - Main Content */}
        <div className="hero-left">
          <div className="hero-badge">✨ Available for new opportunities</div>
          
          <h1>
            Hi, I'm <span className="highlight">Mugisha Isihaqa</span>
          </h1>
          
          <h2 className="hero-title">Full-Stack Developer</h2>
          
          <p className="hero-description">
            I build real-world web applications, dashboards, and backend systems 
            that actually work in production — not just demos or templates.
          </p>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">6+</div>
              <div className="stat-label">PROJECTS</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">2+</div>
              <div className="stat-label">YEARS EXP</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">SATISFACTION</div>
            </div>
          </div>
          
          <div className="code-wrapper">
            <div className="code-header">
              <span className="code-dot red"></span>
              <span className="code-dot yellow"></span>
              <span className="code-dot green"></span>
              <span className="code-title">developer.js</span>
            </div>
            <div className="code-block">
              <pre>{codeString}</pre>
            </div>
          </div>
        </div>
        
        {/* Right Column - Profile Card */}
        <div className="hero-right">
          <div className="profile-card">
            <div className="profile-icon">🐺</div>
            <h3>Mugisha Isihaqa</h3>
            <p className="profile-title">Full Stack Developer</p>
            <div className="profile-divider"></div>
            <div className="profile-email">
              <span className="email-icon">📧</span>
              wolfras87@gmail.com
            </div>
            <div className="profile-github">
              <span className="github-icon">🐙</span>
              github.com/wolfras
            </div>
            <button className="ask-ai-btn" onClick={() => {
              const chatbotBtn = document.querySelector('.chatbot-toggle');
              if (chatbotBtn) chatbotBtn.click();
            }}>
              💬 Ask WolfrasAI
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;