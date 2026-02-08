import React from "react";
import { motion } from "framer-motion";

const HIGHLIGHTS = [
  {
    title: "Open-source contributions",
    text:
      "Regularly contribute to community projects, focusing on documentation, UI fixes, and small feature improvements."
  },
  {
    title: "Continuous learning",
    text:
      "Active in modern React patterns, API security, and performance tooling. I treat every project as a chance to level up."
  },
  {
    title: "Knowledge sharing",
    text:
      "Enjoy mentoring and writing clear technical documentation that accelerates onboarding."
  }
];

export default function OpenSource() {
  return (
    <section id="open-source" data-section className="section muted-surface">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">Open Source & Learning</p>
          <h2 className="section-title">Curious, generous, and always improving.</h2>
          <p className="section-lead">
            I invest in the developer community and keep sharpening my toolkit
            through real collaboration.
          </p>
        </motion.div>

        <div className="row g-4 mt-2">
          {HIGHLIGHTS.map((item, idx) => (
            <motion.div
              key={item.title}
              className="col-12 col-md-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
            >
              <div className="card-surface open-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
