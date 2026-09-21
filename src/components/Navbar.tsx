// ================================
// Floating Pill Navbar Component
// ================================
// Appears centered at top once user scrolls past hero.
// Icons match the hero nav card exactly.

import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';

interface NavbarProps {
    heroRef: React.RefObject<HTMLElement | null>;
    onNavClick: (id: string) => void;
}

const NAV_ITEMS = [
    {
        id: 'about-anchor',
        label: 'About',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
    },
    {
        id: 'work-anchor',
        label: 'Projects',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 3h-2V2h-4v1H8" />
            </svg>
        ),
    },
    {
        id: 'library-anchor',
        label: 'Library',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
        ),
    },
    {
        id: 'contact-anchor',
        label: 'Contact',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        ),
    },
];

const Navbar: React.FC<NavbarProps> = ({ heroRef, onNavClick }) => {
    const [visible, setVisible] = useState(false);
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const handleScroll = () => {
            const heroEl = heroRef.current;
            if (!heroEl) return;
            setVisible(heroEl.getBoundingClientRect().bottom <= 0);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [heroRef]);

    // Highlight active section based on scroll position
    useEffect(() => {
        const handleSectionHighlight = () => {
            const scrollY = window.scrollY + 120;
            const ids = NAV_ITEMS.map((n) => n.id);
            let current = '';
            for (const id of ids) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top + window.scrollY <= scrollY) {
                    current = id;
                }
            }
            setActiveId(current);
        };
        window.addEventListener('scroll', handleSectionHighlight, { passive: true });
        return () => window.removeEventListener('scroll', handleSectionHighlight);
    }, []);

    const handleClick = (id: string) => {
        onNavClick(id);
        setActiveId(id);
    };

    return (
        <nav className={`pill-navbar ${visible ? 'pill-show' : 'pill-hide'}`} aria-label="Main navigation">
            <div className="pill-inner">

                {/* Logo — "A" avatar */}
                {/* <button
                    className="pill-logo"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    aria-label="Back to top"
                    title="Back to top"
                >
                    <span className="pill-logo-letter">A</span>
                </button> */}

                {/* Separator */}
                {/* <div className="pill-sep" /> */}

                {/* Nav items */}
                {NAV_ITEMS.map((item) => (
                    <button
                        key={item.id}
                        className={`pill-btn ${activeId === item.id ? 'pill-btn-active' : ''}`}
                        onClick={() => handleClick(item.id)}
                        aria-label={item.label}
                        title={item.label}
                    >
                        <span className="pill-btn-icon">{item.icon}</span>
                        <span className="pill-btn-label">{item.label}</span>
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
