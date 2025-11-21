import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionBox from "./SectionBox";
import { API_BASE } from "../config";

export default function Contact() {
  const [info, setInfo] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ message: "", type: "" });
  const [loadingInfo, setLoadingInfo] = useState(true);
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    async function load() {
      setLoadingInfo(true);
      setErrorInfo(null);
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ message: "Sending…", type: "" });

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({ message: "Message sent successfully!", type: "success" });
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus({ message: data.message || "Failed to send message.", type: "error" });
      }
    } catch (error) {
      setStatus({ message: "Error sending message.", type: "error" });
    } finally {
      setTimeout(() => setStatus({ message: "", type: "" }), 4000);
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="contact" className="pt-3">
      <SectionBox>
        <motion.h2
          className="fw-bold mb-4"
          style={{ fontSize: "2rem" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact
        </motion.h2>

        {loadingInfo && <p className="text-center">Loading contact info…</p>}
        {errorInfo && <p className="text-danger text-center">{errorInfo}</p>}

        {info && (
          <motion.div
            className="mb-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p><strong>Email:</strong> {info.email}</p>
            <p><strong>Phone:</strong> {info.phone}</p>
            <p><strong>Location:</strong> {info.location}</p>
            <p>
              <strong>LinkedIn:</strong>{" "}
              <a href={info.linkedin} target="_blank" rel="noopener noreferrer">{info.linkedin}</a>
            </p>
            <p>
              <strong>GitHub:</strong>{" "}
              <a href={info.github} target="_blank" rel="noopener noreferrer">{info.github}</a>
            </p>
          </motion.div>
        )}

        <motion.form
          className="mx-auto"
          style={{ maxWidth: "500px" }}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {["name", "email", "message"].map((field, idx) => (
            <motion.div key={field} className="mb-3" variants={inputVariants} initial="hidden" animate="visible" transition={{ delay: idx * 0.1 }}>
              {field !== "message" ? (
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="form-control"
                  value={form[field]}
                  onChange={handleChange}
                  required
                />
              ) : (
                <textarea
                  name={field}
                  placeholder="Message"
                  className="form-control"
                  rows="5"
                  value={form[field]}
                  onChange={handleChange}
                  required
                ></textarea>
              )}
            </motion.div>
          ))}

          <motion.button
            type="submit"
            className="btn btn-primary w-100"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Send Message
          </motion.button>

          {status.message && (
            <motion.div
              className={`text-center mt-3 p-2 rounded ${
                status.type === "success" ? "bg-success text-white" : status.type === "error" ? "bg-danger text-white" : "bg-secondary text-white"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {status.message}
            </motion.div>
          )}
        </motion.form>
      </SectionBox>
    </section>
  );
}
