import React from 'react';
import { motion } from 'motion/react';
import profileImg from '../assets/pimg/profile.png';

// ─── Animation variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

const fadeRight = {
  hidden:  { opacity: 0, x: 36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

// ─── Component ────────────────────────────────────────────────────────────────
const AboutMe: React.FC = () => {
  return (
    <motion.div
      className="about-two-col"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {/* ── LEFT: text content ── */}
      <div className="about-left">

        {/* Name + role headline */}
        <motion.h3 variants={fadeUp} className="about-headline">
          I'm <span className="about-name">Anshu</span>{' '}
          — a <em className="about-role">Developer &amp; ML Engineer</em>
        </motion.h3>

        {/* Intro paragraph */}
        <motion.p variants={fadeUp} className="about-intro-para">
          A student, developer, and relentless problem-solver who finds deep satisfaction in
          turning complex ideas into working systems. My work lives at the intersection of{' '}
          <span className="about-kw">Data Science</span>,{' '}
          <span className="about-kw">Machine Learning</span>, and{' '}
          <span className="about-kw">Full Stack Development</span> — whether that's building
          intelligent backends, training models, or crafting seamless user experiences.
        </motion.p>

        {/* Mission statement */}
        <motion.p variants={fadeUp} className="about-mission-para">
          I believe the best products are born from curiosity and iteration — and that's
          exactly how I approach every project I touch. I don't just write code; I engineer
          solutions that make sense.
        </motion.p>
      </div>

      {/* ── RIGHT: profile image ── */}
      <motion.div variants={fadeRight} className="about-right">
        <motion.div
          className="about-profile-card"
          whileHover={{ scale: 1.025 }}
          transition={{ type: 'spring', stiffness: 220, damping: 24 }}
        >
          <div className="about-profile-frame">
            <img
              src={profileImg}
              alt="Anshu – Developer & ML Engineer"
              className="about-profile-img"
              draggable={false}
            />

            {/* Status badge */}
            <div className="about-status-badge">
              <span className="about-status-dot" />
              <span>Open to opportunities</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AboutMe;
