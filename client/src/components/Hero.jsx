import React, { useContext } from "react";
import { motion } from "framer-motion";
import { DarkModeContext } from "../contexts/DarkModeContext";
import SectionBox from "./SectionBox";
import { Link } from "react-router-dom";
export default function Hero() {
  const { isDark } = useContext(DarkModeContext);

  return (
    <section id="about" className="pt-5">
      <SectionBox>
        {/* unchanged structure, static content */}
        <div className="row align-items-center">
          <div className="col-md-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="fw-bold display-5 mb-3">
                Hi, I’m <span className="text-primary">Riya Debnath</span>
              </h1>

              <p
                className="mt-3 fs-5"
                style={{ maxWidth: "600px", lineHeight: "1.6" }}
              >
                Aspiring full stack developer focused on building clean,
                reliable web apps. Strong grasp of{" "}
                <b>JavaScript, React, Node.js, and SQL</b>
                with hands-on projects that turn ideas into working products.
                Quick learner who enjoys solving problems, writing clear code,
                and collaborating to ship features.
              </p>

              <div className="mt-4 d-flex gap-3 flex-wrap">
                <Link
                  to="/portfolio/projects"
                  className="btn btn-outline-primary rounded-pill px-4 py-2"
                >
                  View Projects
                </Link>
                <Link
                  to="/portfolio/contact"
                  className="btn btn-primary rounded-pill px-4 py-2"
                >
                  Contact Me
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="col-md-5 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="position-relative shadow rounded-circle p-2"
              style={{
                background: isDark
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.03)",
                width: "200px",
                height: "200px",
                margin: "0 auto",
                flexShrink: 0,
              }}
            >
              <img
                src={process.env.PUBLIC_URL + "/pp.jpeg"}
                alt="Profile"
                className="rounded-circle w-100 h-100"
                style={{
                  objectFit: "cover",
                  border: "4px solid rgba(0,0,0,0.06)",
                }}
              />
            </motion.div>
          </div>
        </div>
      </SectionBox>
    </section>
  );
}
