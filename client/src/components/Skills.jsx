import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionBox from "./SectionBox";
import { API_BASE } from "../config";
export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ac = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/skills`, { signal: ac.signal });
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        // Accept both arrays or object { skills: [...] }
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

  return (
    <section id="skills" className="pt-3">
      <SectionBox>
        <h2 className="fw-bold mb-4" style={{ fontSize: "2rem" }}>
          Skills
        </h2>

        {loading && <p>Loading skills…</p>}
        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && (
          <div className="row g-4">
            {skills.length === 0 ? (
              <div className="col-12">
                <p className="text-muted">No skills found.</p>
              </div>
            ) : (
              skills.map((s, i) => (
                <motion.div
                  key={s.id || s._id || i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.45 }}
                  className="col-6 col-md-3"
                >
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0,0,0,0.12)" }}
                    className="p-4 rounded-4 text-center shadow-sm"
                    style={{
                      background: "rgba(255, 255, 255, 0.02)",
                      backdropFilter: "blur(6px)",
                      cursor: "pointer",
                      transition: "0.3s"
                    }}
                  >
                    <span className="fw-medium" style={{ fontSize: "1.05rem", fontStyle: "italic" }}>
                      {typeof s === "string" ? s : s.name}
                    </span>
                  </motion.div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </SectionBox>
    </section>
  );
}
