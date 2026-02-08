import React, { useContext } from "react";
import { motion } from "framer-motion";
import { DarkModeContext } from "../contexts/DarkModeContext";

export default function Hero() {
  const { isDark } = useContext(DarkModeContext);

  return (
    <section id="home" data-section className="section hero">
      <div className="container hero-grid">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow">Full-Stack Developer · 5+ Years in IT</p>
          <h1 className="hero-title">
            Riya Debnath
            <span className="hero-title-accent">Builds clean, scalable products.</span>
          </h1>
          <p className="hero-subtitle">
            I design and ship web and mobile experiences that feel effortless to
            use, stay fast under load, and are easy to maintain. My work blends
            thoughtful UX with production-grade engineering.
          </p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="mailto:riya.debnath@email.com">
              Hire Me
            </a>
            <a className="btn btn-ghost" href="#projects">
              View Projects
            </a>
            <a className="btn btn-outline" href="/resume.pdf" download>
              Download Resume
            </a>
          </div>

          <div className="hero-stats">
            {[
              { label: "Years Experience", value: "5+" },
              { label: "Tech Domains", value: "Web · Mobile · API" },
              { label: "Focus", value: "Performance + UX" }
            ].map((stat) => (
              <div key={stat.label} className="stat-card">
                <p className="stat-value">{stat.value}</p>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={`hero-portrait ${isDark ? "hero-portrait-dark" : ""}`}
        >
          <img
            src={process.env.PUBLIC_URL + "/pp.jpeg"}
            alt="Riya Debnath portrait"
          />
          <div className="hero-badge">
            <p>Open to full-time + freelance roles</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
