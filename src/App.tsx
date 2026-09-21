import IntroOverlay from "./components/intro";


import React, { useRef, useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import LightRays from './components/LightRays';
import Navbar from './components/Navbar';
import './App.css';

import { icons } from './assets/icons';
import titleSvg from './assets/pimg/title.png';
import LibraryGrid from './components/Library';
import Projects from './components/Projects';
import AboutMe from './components/AboutMe';
// Icons from lucide-react (install with `npm i lucide-react` if missing)

// return (
//   <>
//     <IntroOverlay/>
//     <main className="container">
//       {/* rest of your portfolio */}
//       </main>
//   </>
// );

interface NavLink {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const App: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [currentTime, setCurrentTime] = useState('00:00');

  const navLinks: NavLink[] = [
    {
      id: 'about-anchor',
      title: 'About',
      description: 'You can call me Anshu',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    },
    {
      id: 'work-anchor',
      title: 'Work',
      description: 'Experiments & projects',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 3h-2V2h-4v1H8"></path>
        </svg>
      )
    },
    {
      id: 'library-anchor',
      title: 'Library',
      description: "Books I've read",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      )
    },
    {
      id: 'contact-anchor',
      title: 'Contact',
      description: "Let's connect",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      )
    },
    {
      id: 'resume',
      title: 'Resume',
      description: 'View my resume',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="12" y1="11" x2="12" y2="17"></line>
          <line x1="9" y1="14" x2="15" y2="14"></line>
        </svg>
      )
    }
  ];
  const [currentDay, setCurrentDay] = useState('Sunday');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const timeFormatter = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Kolkata',
      });

      const dayFormatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        timeZone: 'Asia/Kolkata',
      });

      const time = timeFormatter.format(now);
      const day = dayFormatter.format(now);

      setCurrentTime(time);
      setCurrentDay(day);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleResultClick = (sectionId: string) => {
    if (sectionId === 'resume') {
      window.open('https://drive.google.com/file/d/1OFy3VFIpjWa-ky3mz1nzCdw59-DDRQ_4/view?usp=drive_link');
    
    }
    scrollToSection(sectionId);
  };

  // Projects are now handled by the Projects component

  // Contact form ref + status
  const contactFormRef = useRef<HTMLFormElement | null>(null);
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<string | null>(null);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactFormRef.current) return;
    setSending(true);
    setSendResult(null);
    try {
      await emailjs.sendForm(
        'service_lf1wyti', // service ID (provided)
        'template_h2vnari', // template ID (provided)
        contactFormRef.current,
        'RxnQkd68McQZKFvcd' // public key (provided)
      );
      setSendResult('Message sent — thank you!');
      contactFormRef.current.reset();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Email send error', err);
      setSendResult('Failed to send message. Please try again later.');
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="container">
      <Navbar heroRef={heroRef} onNavClick={scrollToSection} />
      <LightRays raysColor="#ffffff" raysOrigin="top-center" raysSpeed={1} followMouse={true} className="page-lightrays" />
      {/* Hero Section */}
      <section className="hero" ref={heroRef}>
        <div className="hero-content">
          <img src={titleSvg} alt="Anshu" className="hero-title-svg" />

          {/* Simple static navigation card */}
          <div className="nav-card">
            <div className="card-header">Thanks for stopping by!</div>

            {/* Navigation Menu (static items) */}
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
                <span className="footer-text">Enjoy your {currentDay}!</span>
                <span className="footer-time">{currentTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="section-content layout-container">
          <div id="about-anchor" className="section-anchor"></div>
          <br />

          <h2 id="about-title" className="section-title">About Me</h2>

          {/* New 2-col layout */}
          <AboutMe />

          {/* Technical Skills */}
          <div className="technical-skills hsection">
            <h2 className="skills-subtitle hsection-title">Technical Skills</h2>

            {/* Use a data-driven structure so each skill can include a lucide icon */}
            <div className="skills-grid">
              {(
                [
                  {
                    title: 'Languages',
                    items: [
                      { name: 'Python', icon: icons.python },
                      { name: 'C++', icon: icons.cpp },
                      { name: 'JavaScript', icon: icons.javascript },
                      { name: 'TypeScript', icon: icons.typescript },
                      { name: 'Java', icon: icons.java },
                    ],
                  },
                  {
                    title: 'Frontend',
                    items: [
                      { name: 'React.js', icon: icons.react },
                      { name: 'Next.js', icon: icons.nextjs },
                      { name: 'HTML5/CSS3', icon: icons.html5 },
                      { name: 'Tailwind CSS', icon: icons.tailwind },
                    ],
                  },
                  {
                    title: 'Backend',
                    items: [
                      { name: 'Node.js', icon: icons.nodejs },
                      { name: 'Express.js', icon: icons.express },
                      { name: 'Flask', icon: icons.flask },
                      { name: 'FastAPI', icon: icons.fastapi },
                    ],
                  },
                  {
                    title: 'Databases',
                    items: [
                      { name: 'MongoDB', icon: icons.mongodb },
                      { name: 'Firebase', icon: icons.firebase },
                      { name: 'MySQL', icon: icons.mysql },
                      { name: 'SQL', icon: icons.sql },
                    ],
                  },
                  {
                    title: 'AI/ML',
                    items: [
                      { name: 'HuggingFace Transformers', icon: icons.huggingface },
                      { name: 'PyTorch', icon: icons.pytorch },
                      { name: 'NLP', icon: icons.nlp },
                    ],
                  },
                  {
                    title: 'Tools & Platforms',
                    items: [
                      { name: 'Git', icon: icons.git },
                      { name: 'Docker', icon: icons.docker },
                      { name: 'REST APIs', icon: icons.fastapi },
                      { name: 'Vercel', icon: icons.vercel },
                      { name: 'AWS', icon: icons.cloud },
                    ],
                  },

                ]
              ).map((cat) => (
                <div key={cat.title} className="skill-category">
                  <h3>{cat.title}</h3>
                  <div className="skill-items">
                    {cat.items.map((it: any) => (
                      <span key={it.name} className="skill-item">
                        {it.icon ? (
                          <img src={it.icon} alt={it.name} className="skill-icon" />
                        ) : it.Icon ? (
                          <it.Icon className="skill-icon" />
                        ) : null}
                        <span className="skill-name">{it.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="section experiments-section">
        <div className="section-content layout-container">
          <div id="work-anchor" className="section-anchor"></div>
          <br />
          <h2 id="work-title" className="section-title">Projects</h2>

          <Projects />
        </div>
      </section>

      {/* Library Section */}
      <section id="library" className="section">
        <div className="section-content layout-container">
          <div id="library-anchor" className="section-anchor"></div>
          <br />
          <h2 className="section-title">Anshu's Library</h2>

          <LibraryGrid />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="section-content layout-container">
          <div id="contact-anchor" className="section-anchor"></div>
          <br />
          <h2 id="contact-title" className="section-title">Contact</h2>

          <p className="contact-subtitle">Let's Connect - Looking Forward to Working Together.</p>


          <form ref={contactFormRef} className="contact-form" onSubmit={handleContactSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                name="from_name"
                className="form-input"
                placeholder="Your name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="from_email"
                className="form-input"
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                name="message"
                className="form-textarea"
                placeholder="Your message here..."
                rows={6}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn" disabled={sending}>
              {sending ? 'Sending…' : 'Send Message'}
            </button>

            {sendResult ? (
              <p style={{ marginTop: 12, color: sendResult.startsWith('Failed') ? '#f87171' : '#86efac' }}>{sendResult}</p>
            ) : null}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; Made by Anshu</p>
      </footer>

    </main>
  );
};


export default App;

