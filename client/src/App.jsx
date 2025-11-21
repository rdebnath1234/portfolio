import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

// Simple glass divider between sections
function Divider() {
  return (
    <div
      style={{
        width: "100%",
        height: "2px",
        background: "linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)",
        margin: "60px 0",
        backdropFilter: "blur(3px)",
      }}
    ></div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />

      <main className="pt-20">

        {/* Homepage */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Divider />
                <Skills />
                <Divider />
                <Projects />
                <Divider />
                <Contact />
              </>
            }
          />

          {/* Single pages */}
          <Route
            path="/about"
            element={
              <>
                <Hero />
              </>
            }
          />

          <Route
            path="/skills"
            element={
              <>
                <Skills />
              </>
            }
          />

          <Route
            path="/projects"
            element={
              <>
                <Projects />
              </>
            }
          />

          <Route
            path="/contact"
            element={
              <>
                <Contact />
              </>
            }
          />

          {/* Redirect unknown pages to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
