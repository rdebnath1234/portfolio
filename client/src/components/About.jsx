import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" data-section className="section">
      <div className="container section-grid">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">About</p>
          <h2 className="section-title">A builder who connects design and engineering.</h2>
          <p className="section-lead">
            I started in enterprise environments where clean code and predictable
            releases were non-negotiable. Over 5+ years, I grew from shipping
            discrete features to owning end-to-end product experiences, from UI
            architecture to API design and data models.
          </p>
          <p className="section-text">
            My career has moved from structured system testing to full-stack
            product delivery. Today, I focus on building scalable React and
            Node.js applications that are intuitive for users and resilient for
            teams.
          </p>
        </motion.div>

        <motion.div
          className="about-card"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3>What I bring</h3>
          <ul className="icon-list">
            <li>Product mindset with strong UX instincts</li>
            <li>Clean architecture, scalable components, and clear APIs</li>
            <li>Performance-first decisions and measurable outcomes</li>
            <li>Collaboration across design, QA, and engineering</li>
          </ul>
          <div className="about-highlight">
            <span>Open-source contributor</span>
            <span>Continuous learner</span>
            <span>Mentor-ready</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
