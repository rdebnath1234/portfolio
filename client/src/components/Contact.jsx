import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus("Thanks! Your message is ready to be sent.");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setStatus(""), 3500);
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
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:riya.debnath@email.com">
                  riya.debnath@email.com
                </a>
              </p>
              <p>
                <strong>LinkedIn:</strong>{" "}
                <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                  linkedin.com/in/riya-debnath
                </a>
              </p>
              <p>
                <strong>GitHub:</strong>{" "}
                <a href="https://github.com/" target="_blank" rel="noreferrer">
                  github.com/riya-debnath
                </a>
              </p>
              <p>
                <strong>Location:</strong> Remote · Open to relocation
              </p>
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
                {status && <span className="form-status">{status}</span>}
              </div>
              <p className="form-note">
                Optional backend: connect to a Node.js + MongoDB endpoint for
                production handling.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
