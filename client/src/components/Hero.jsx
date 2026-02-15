import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { API_BASE } from "../config";

export default function Hero() {
  const { isDark } = useContext(DarkModeContext);
  const [hireEmail, setHireEmail] = useState("riyakolkatawb@gmail.com");

  useEffect(() => {
    const ac = new AbortController();
    async function loadContact() {
      try {
        const res = await fetch(`${API_BASE}/api/contact`, { signal: ac.signal });
        if (!res.ok) return;
        const data = await res.json();
        if (data?.email) {
          setHireEmail(data.email);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error loading hire email:", err);
        }
      }
    }
    loadContact();
    return () => ac.abort();
  }, []);

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
            <a className="btn btn-primary" href={`mailto:${hireEmail}`}>
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
