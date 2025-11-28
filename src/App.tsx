import React, { useRef, useEffect, useState } from 'react';
import LightRays from './components/LightRays';
import './App.css';

interface NavLink {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const App: React.FC = () => {
  const [currentTime, setCurrentTime] = useState('00:00 GMT+5:30');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const navLinks: NavLink[] = [
    {
      id: 'about',
      title: 'About',
      description: 'you can call me Anshu',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    },
    {
      id: 'work',
      title: 'Work',
      description: 'currently open to opportunities',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 3h-2V2h-4v1H8"></path>
        </svg>
      )
    },
    {
      id: 'experiments',
      title: 'Experiments',
      description: 'exploring new ideas',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      )
    },
    {
      id: 'achievements',
      title: 'Achievements',
      description: 'milestones & recognitions',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6-4 6 4"></path>
          <path d="M6 9v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9"></path>
          <path d="M6 13h12"></path>
        </svg>
      )
    },
    {
      id: 'colophon',
      title: 'Colophon',
      description: 'how this portfolio was built?',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="1"></circle>
          <path d="M12 1v6m0 6v6"></path>
          <path d="M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24"></path>
          <path d="M1 12h6m6 0h6"></path>
          <path d="M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24"></path>
        </svg>
      )
    },
    {
      id: 'now-playing',
      title: 'Now Playing',
      description: 'mama by rudy mancuso',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="11 5 6 8 6 16 11 19 11 5"></polygon>
          <polygon points="17 5 12 8 12 16 17 19 17 5"></polygon>
        </svg>
      )
    }
  ];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Kolkata'
      });
      const time = formatter.format(now);
      setCurrentTime(`${time} GMT+5:30`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 60;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    if (searchInputRef.current) {
      searchInputRef.current.blur();
      searchInputRef.current.value = '';
    }
  };

  const handleResultClick = (sectionId: string) => {
    scrollToSection(sectionId);
  };

  return (
    <main className="container">
      {/* Hero Section with Light Rays Background */}
      <section className="hero">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="light-rays-bg"
        />
        <div className="hero-content">
          <h1 className="hero-title">Anshu Kumar</h1>

          {/* Search Navigation Component */}
          <div className="search-container">
            <input
              ref={searchInputRef}
              type="text"
              className="search-input"
              placeholder="What's up?"
              autoComplete="off"
            />

            {/* Search Results / Navigation Menu */}
            <div className="search-results">
              {navLinks.map((link) => (
                <div
                  key={link.id}
                  className="result-item"
                  onClick={() => handleResultClick(link.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleResultClick(link.id);
                    }
                  }}
                >
                  <div className="result-icon">{link.icon}</div>
                  <div className="result-content">
                    <div className="result-title">{link.title}</div>
                    <div className="result-description">{link.description}</div>
                  </div>
                </div>
              ))}

              <div className="search-footer">
                <span className="footer-text">Enjoy your Saturday!</span>
                <span className="footer-time">{currentTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="section-content">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">Pixels • Product • People • Pizza</p>
          <div className="about-text">
            <p>
              Hi! I'm Anshu, a data analyst and developer with a passion for building innovative solutions.
              I specialize in turning complex data into actionable insights and creating intuitive user experiences.
            </p>
            <p>
              Throughout my journey, I've been guided by a simple belief: technology should feel natural and intuitive.
              When not in front of a digital screen, you'll probably find me exploring new things or contributing to open-source projects.
            </p>
          </div>
          <div className="about-meta">
            <div className="meta-item">
              <span className="meta-label">Currently Based In</span>
              <span className="meta-value">India</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Education</span>
              <span className="meta-value"><a href="#work">SRM University</a></span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Passionate About</span>
              <span className="meta-value">Data • Analytics • Problem Solving</span>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="section work-section">
        <div className="section-content">
          <h2 className="section-title">Professional Experience</h2>
          <div className="work-items">
            <div className="work-item">
              <div className="work-company">Data Analyst</div>
              <div className="work-position">Currently Open to Opportunities</div>
              <div className="work-description">
                Seeking roles in data analysis, business intelligence, or analytics engineering.
              </div>
            </div>

            <div className="work-item">
              <div className="work-company">Analytics & Development</div>
              <div className="work-position">Freelance Projects</div>
              <div className="work-description">
                Building custom dashboards and data solutions for various clients and projects.
              </div>
            </div>

            <div className="work-item">
              <div className="work-company">B.Tech Computer Science</div>
              <div className="work-position">SRM University (2023 - 2027)</div>
              <div className="work-description">
                Specializing in AI & Machine Learning with focus on data science applications.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experiments Section */}
      <section id="experiments" className="section experiments-section">
        <div className="section-content">
          <h2 className="section-title">Experiments & Projects</h2>
          <div className="projects-grid">
            {['Data Dashboard', 'Analytics Engine', 'Portfolio Website', 'Data Insights Tool', 'Business Analytics', 'Web Application'].map((title, i) => (
              <div key={i} className="project-card">
                <div className="project-placeholder">Project {i + 1}</div>
                <h3 className="project-title">{title}</h3>
                <p className="project-description">
                  {i === 0 && 'Interactive data visualization platform with real-time analytics.'}
                  {i === 1 && 'Machine learning-powered customer behavior prediction system.'}
                  {i === 2 && 'Modern portfolio built with TypeScript and vanilla JavaScript.'}
                  {i === 3 && 'AI-powered tool for automatic insight generation from datasets.'}
                  {i === 4 && 'Comprehensive analytics solution for tracking KPIs and metrics.'}
                  {i === 5 && 'Full-stack application with data visualization and reporting.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="section achievements-section">
        <div className="section-content">
          <h2 className="section-title">Recent Achievements</h2>
          <div className="achievements-list">
            {[
              { icon: '🏆', title: 'Hackathon Winner', desc: 'First place in Data Analytics Challenge 2024' },
              { icon: '⭐', title: 'Open Source Contributor', desc: 'Active contributor to multiple data science projects' },
              { icon: '📜', title: 'Certifications', desc: 'Advanced Data Analytics & Business Intelligence' },
              { icon: '🎓', title: 'Academic Excellence', desc: 'Dean\'s List & Merit Scholarship Recipient' }
            ].map((achievement, i) => (
              <div key={i} className="achievement-item">
                <span className="achievement-icon">{achievement.icon}</span>
                <div className="achievement-content">
                  <h3 className="achievement-title">{achievement.title}</h3>
                  <p className="achievement-description">{achievement.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Colophon Section */}
      <section id="colophon" className="section colophon-section">
        <div className="section-content">
          <h2 className="section-title">Colophon</h2>
          <div className="colophon-content">
            <p className="colophon-definition">
              <strong>Noun:</strong> a brief statement at a book's end detailing its production
            </p>
            <p className="colophon-description">
              Basically, it's a fancy word that I'm using to describe this website. This portfolio is crafted with
              <strong> React</strong>, <strong>TypeScript</strong>, and modern web technologies, designed with clean typography and
              subtle micro-interactions. The design emphasizes minimalism and elegant simplicity.
            </p>
            <div className="colophon-specs">
              <div className="spec-item">
                <span className="spec-label">Fonts:</span>
                <span className="spec-value">Playfair Display • Inter Sans</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Built With:</span>
                <span className="spec-value">React • TypeScript • CSS • OGL</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Version:</span>
                <span className="spec-value">2.0.0</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Now Playing Section */}
      <section id="now-playing" className="section now-playing-section">
        <div className="section-content">
          <h2 className="section-title">Now Playing</h2>
          <div className="player-container">
            <div className="player-controls">
              <button className="play-btn">▶</button>
            </div>
            <div className="player-info">
              <div className="player-title">Mama</div>
              <div className="player-artist">Rudy Mancuso</div>
            </div>
            <div className="player-time">
              <span className="current-time">0:00</span>
              <span className="total-time">3:45</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Anshu Kumar. Stay hydrated y'all 💧</p>
      </footer>

      {/* Vertical Social Icons Navigation Bar - Left Side */}
      <nav className="social-navbar">
        <div className="social-icons-container">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.259-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 11.806-2.806 1.44 1.44 0 01-.806 2.806z"/>
            </svg>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="mailto:anshu@example.com" aria-label="Email" className="social-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="social-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7s1.1 1 3 1.5A9.5 9.5 0 0023 3z"/>
            </svg>
          </a>
          <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" aria-label="Vimeo" className="social-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 4.3c0-.3-.1-.6-.2-.8-.2-.5-.6-.9-1.1-1C21 2.2 20.6 2 20 2H4c-.6 0-1 .2-1.4.3-.5.2-.9.6-1.1 1-.1.2-.2.5-.2.8-.1 1.2 0 2.4 0 3.7 0 1.3 0 2.5 0 3.7 0 1.3 0 2.5 0 3.7 0 1.3 0 2.5 0 3.7.1.3.1.6.2.8.2.5.6.9 1.1 1 .4.1.8.3 1.4.3h16c.6 0 1-.2 1.4-.3.5-.2.9-.6 1.1-1 .1-.2.2-.5.2-.8.1-1.2 0-2.4 0-3.7 0-1.3 0-2.5 0-3.7 0-1.3 0-2.5 0-3.7 0-1.3 0-2.5 0-3.7zm-2 8.7l-1 1.5c-.2.3-.5.4-.8.2l-1-1.5c-.2-.3-.2-.7 0-1l1-1.5c.2-.3.6-.4.8-.2l1 1.5c.2.3.2.7 0 1zm-6 0l-1 1.5c-.2.3-.5.4-.8.2l-1-1.5c-.2-.3-.2-.7 0-1l1-1.5c.2-.3.6-.4.8-.2l1 1.5c.2.3.2.7 0 1z"/>
            </svg>
          </a>
        </div>
      </nav>
    </main>
  );
};

export default App;
