import React from "react";
import { motion } from "framer-motion";

const SKILL_GROUPS = [
  {
    title: "Frontend",
    items: ["React.js", "JavaScript (ES6+)", "HTML5", "CSS3", "Responsive UI", "Accessibility"]
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "Auth & RBAC", "API Documentation"]
  },
  {
    title: "Databases",
    items: ["MongoDB", "Mongoose", "Data Modeling", "Indexing", "Aggregation"]
  },
  {
    title: "Mobile",
    items: ["React Native", "Flutter", "Cross-platform UI", "State Management"]
  },
  {
    title: "Tools & Practices",
    items: ["Git", "CI/CD Basics", "Testing & QA", "Clean Code", "Performance Tuning"]
  }
];

export default function Skills() {
  return (
    <section id="skills" data-section className="section muted-surface">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">Skills</p>
          <h2 className="section-title">Balanced across frontend, backend, and mobile.</h2>
          <p className="section-lead">
            I build end-to-end experiences with a focus on clarity, performance,
            and maintainability.
          </p>
        </motion.div>

        <div className="row g-4 mt-1">
          {SKILL_GROUPS.map((group, idx) => (
            <motion.div
              key={group.title}
              className="col-12 col-md-6 col-lg-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
            >
              <div className="card-surface skill-card">
                <h3>{group.title}</h3>
                <div className="chip-grid">
                  {group.items.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
