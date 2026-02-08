import React from "react";
import { motion } from "framer-motion";

const EXPERIENCE = [
  {
    role: "Software Engineer",
    company: "Pursuit Software",
    highlights: [
      "Built React and Node.js features focused on performance and clarity.",
      "Collaborated across QA and product to deliver stable releases.",
      "Optimized API responses and reduced UI load times on key pages."
    ]
  },
  {
    role: "Associate",
    company: "Wipro Limited",
    highlights: [
      "Supported enterprise applications with strong testing discipline.",
      "Improved defect turnaround time with repeatable QA workflows.",
      "Partnered with engineers to translate issues into actionable fixes."
    ]
  },
  {
    role: "Assistant Claims Processing Executive",
    company: "HGS",
    highlights: [
      "Handled high-volume, detail-critical workflows with accuracy.",
      "Developed process improvements that reduced manual rework.",
      "Brought operational insights into later product development work."
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" data-section className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">Experience</p>
          <h2 className="section-title">Full-stack delivery with testing discipline.</h2>
          <p className="section-lead">
            I bring production experience across software engineering, enterprise
            delivery, and rigorous testing environments.
          </p>
        </motion.div>

        <div className="timeline mt-3">
          {EXPERIENCE.map((item, idx) => (
            <motion.div
              key={`${item.company}-${item.role}`}
              className="timeline-item"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
            >
              <div className="timeline-marker" />
              <div className="card-surface">
                <div className="timeline-header">
                  <h3>{item.role}</h3>
                  <span>{item.company}</span>
                </div>
                <ul>
                  {item.highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
