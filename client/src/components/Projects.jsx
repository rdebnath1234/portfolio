import React, { useState, useEffect } from "react";
import SectionBox from "./SectionBox";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ac = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:5001/api/projects", { signal: ac.signal });
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

  return (
    <section id="projects" className="pt-3">
      <SectionBox>
        <h2 className="fw-bold mb-4" style={{ fontSize: "2rem" }}>
          Projects
        </h2>

        {loading && <p>Loading projects…</p>}
        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && (
          <div className="row g-4">
            {projects.length === 0 ? (
              <div className="col-12">
                <p className="text-muted">No projects found.</p>
              </div>
            ) : (
              projects.map((p, idx) => (
                <div key={p.id || p._id || idx} className="col-12 col-md-6">
                  <div className="p-4 rounded-4 shadow-sm h-100" style={{ background: "rgba(255,255,255,0.02)", backdropFilter: "blur(6px)" }}>
                    <h4 className="fw-bold">{p.title || p.name}</h4>
                    <p>{p.description}</p>
                    {p.link && (
                      <a href={p.link} target="_blank" rel="noreferrer" className="text-primary">
                        View Project
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </SectionBox>
    </section>
  );
}
