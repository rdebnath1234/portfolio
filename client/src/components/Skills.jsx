import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { API_BASE } from "../config";

const CATEGORY_KEYWORDS = [
  { title: "Frontend", keys: ["react", "html", "css", "javascript"] },
  { title: "Backend", keys: ["node", "express", "api"] },
  { title: "Databases", keys: ["mongo", "mongoose", "sql", "database"] },
  { title: "Mobile", keys: ["react native", "flutter", "mobile"] },
  { title: "Tools & Practices", keys: ["git", "testing", "qa", "bootstrap"] }
];

const FALLBACK_GROUPS = [
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
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const ac = new AbortController();
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE}/api/skills`, { signal: ac.signal });
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        setSkills(Array.isArray(data) ? data : data.skills || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching skills:", err);
          setError("Could not load skills.");
        }
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => ac.abort();
  }, []);

  const groupedSkills = useMemo(() => {
    if (!skills.length) return null;
    const groups = CATEGORY_KEYWORDS.map((group) => ({
      title: group.title,
      items: []
    }));

    skills.forEach((skill) => {
      const lower = String(skill).toLowerCase();
      const match = CATEGORY_KEYWORDS.find((group) =>
        group.keys.some((key) => lower.includes(key))
      );
      const group = groups.find((g) => g.title === (match ? match.title : "Tools & Practices"));
      if (group) group.items.push(skill);
    });

    return groups.filter((group) => group.items.length > 0);
  }, [skills]);

  const groupsToRender = groupedSkills && groupedSkills.length > 0 ? groupedSkills : FALLBACK_GROUPS;

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
          {loading && <p className="section-text">Loading skills…</p>}
          {error && <p className="section-text">{error}</p>}
        </motion.div>

        <div className="row g-4 mt-1">
          {groupsToRender.map((group, idx) => (
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
