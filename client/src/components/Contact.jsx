import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { API_BASE } from "../config";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ message: "", type: "" });
  const [info, setInfo] = useState(null);
  const [loadingInfo, setLoadingInfo] = useState(true);
  const [errorInfo, setErrorInfo] = useState("");

  useEffect(() => {
    const ac = new AbortController();
    async function load() {
      setLoadingInfo(true);
      setErrorInfo("");
      try {
        const res = await fetch(`${API_BASE}/api/contact`, { signal: ac.signal });
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        setInfo(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error loading contact info:", err);
          setErrorInfo("Could not load contact info.");
        }
      } finally {
        setLoadingInfo(false);
      }
    }
    load();
    return () => ac.abort();
  }, []);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ message: "Sending…", type: "" });

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({ message: "Message sent successfully!", type: "success" });
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus({ message: data.error || data.message || "Failed to send message.", type: "error" });
      }
    } catch (error) {
      setStatus({ message: "Error sending message.", type: "error" });
    } finally {
      setTimeout(() => setStatus({ message: "", type: "" }), 4000);
    }
  };

  return (
    <section id="contact" data-section className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">Contact</p>
          <h2 className="section-title">Let’s build something resilient and delightful.</h2>
          <p className="section-lead">
            I am available for full-time roles, contract work, and product
            collaborations.
          </p>
        </motion.div>

        <div className="row g-4 mt-2">
          <div className="col-12 col-lg-5">
            <div className="card-surface contact-card">
              <h3>Contact Details</h3>
              {loadingInfo && <p>Loading contact info…</p>}
              {errorInfo && <p>{errorInfo}</p>}
              {info && (
                <>
                  <p>
                    <strong>Email:</strong>{" "}
                    <a href={`mailto:${info.email}`}>{info.email}</a>
                  </p>
                  <p>
                    <strong>LinkedIn:</strong>{" "}
                    <a href={info.linkedin} target="_blank" rel="noreferrer">
                      {info.linkedin}
                    </a>
                  </p>
                  <p>
                    <strong>GitHub:</strong>{" "}
                    <a href={info.github} target="_blank" rel="noreferrer">
                      {info.github}
                    </a>
                  </p>
                  <p>
                    <strong>Location:</strong> {info.location}
                  </p>
                </>
              )}
              <div className="contact-pill">Responds within 24-48 hours</div>
            </div>
          </div>

          <div className="col-12 col-lg-7">
            <form className="card-surface contact-form" onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@email.com"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Tell me about your product or role."
                    autoComplete="off"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-actions">
                <button className="btn btn-primary" type="submit">
                  Send Message
                </button>
                {status.message && <span className="form-status">{status.message}</span>}
              </div>
              <p className="form-note">
                Messages are stored securely and forwarded via email.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
