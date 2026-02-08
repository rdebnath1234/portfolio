import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { API_BASE } from "../config";

const PROJECT_DETAILS = [
  {
    title: "Virtual Pet Simulator",
    summary:
      "Interactive web game that teaches state management and event-driven UI through a playful pet companion.",
    stack: ["HTML", "CSS", "JavaScript"],
    features: ["Time-based mood changes", "Mini games and rewards", "Persistent pet state"],
    challenges: ["State transitions without frameworks", "Balancing performance and animation smoothness"]
  },
  {
    title: "Weather Intelligence App",
    summary:
      "API-driven forecast experience with location search, smart alerts, and accessible data visualization.",
    stack: ["React", "OpenWeather API", "CSS"],
    features: ["Geolocation + search", "Hourly and 7-day views", "Severe weather highlights"],
    challenges: ["Handling API rate limits", "Designing responsive data cards"]
  },
  {
    title: "Food Ordering Platform",
    summary:
      "Flutter-based ordering flow with cart, live tracking, and restaurant discovery.",
    stack: ["Flutter", "Dart", "Firebase"],
    features: ["Real-time order status", "Saved favorites and reorder", "Promo and loyalty logic"],
    challenges: ["Offline-first caching", "Complex UI states in a single flow"]
  },
  {
    title: "MERN Project Hub",
    summary:
      "Full-stack app for teams to track work, approvals, and delivery status.",
    stack: ["React", "Node.js", "MongoDB", "Express"],
    features: ["Role-based access", "Audit trail", "Analytics dashboard"],
    challenges: ["Designing scalable schemas", "Optimizing list queries"]
  },
  {
    title: "Customer Care Insights",
    summary:
      "Dashboard for claims processing teams to reduce turnaround time and highlight bottlenecks.",
    stack: ["React", "Node.js", "MongoDB", "Charting"],
    features: ["Queue insights", "SLA monitoring", "Exportable reports"],
    challenges: ["Data normalization for reporting", "Keeping UI fast on large datasets"]
  }
];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const ac = new AbortController();
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE}/api/projects`, { signal: ac.signal });
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : data.projects || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching projects:", err);
          setError("Could not load projects.");
        }
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => ac.abort();
  }, []);

  const mergedProjects = useMemo(() => {
    if (!projects.length) return PROJECT_DETAILS;
    return projects.map((proj) => {
      const name = proj.title || proj.name || "";
      const detail = PROJECT_DETAILS.find(
        (item) => item.title.toLowerCase() === name.toLowerCase()
      );
      return {
        title: name || detail?.title || "Project",
        summary: detail?.summary || "Project summary coming soon.",
        stack: detail?.stack || [],
        features: detail?.features || [],
        challenges: detail?.challenges || [],
        link: proj.link || detail?.link
      };
    });
  }, [projects]);

  return (
    <section id="projects" data-section className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">Projects</p>
          <h2 className="section-title">Case studies that show scope and impact.</h2>
          <p className="section-lead">
            Each project reflects real-world constraints: performance, clarity,
            and scalable systems.
          </p>
          {loading && <p className="section-text">Loading projects…</p>}
          {error && <p className="section-text">{error}</p>}
        </motion.div>

        <div className="row g-4 mt-2">
          {mergedProjects.map((project, idx) => (
            <motion.div
              key={project.title}
              className="col-12 col-lg-6"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: idx * 0.04 }}
            >
              <div className="card-surface project-card">
                <h3>{project.title}</h3>
                <p className="project-summary">{project.summary}</p>
                <div className="tag-row">
                  {project.stack.map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-details">
                  <div>
                    <p className="project-label">Features</p>
                    <ul>
                      {project.features.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="project-label">Challenges Solved</p>
                    <ul>
                      {project.challenges.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                {project.link ? (
                  <a className="btn btn-ghost" href={project.link} target="_blank" rel="noreferrer">
                    View Project
                  </a>
                ) : (
                  <button className="btn btn-ghost" type="button">
                    View Case Study
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
