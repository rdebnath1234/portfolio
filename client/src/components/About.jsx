import React from "react";
import SectionBox from "../components/SectionBox";

export default function About() {
  return (
    <section id="about-section">
      <SectionBox>
        <h2 className="fw-bold mb-4" style={{ fontSize: "2rem" }}>
          About Me
        </h2>
        <p className="fs-5">
          I am a passionate Full Stack Developer with 5+ years of experience in
          building scalable, user-friendly web applications using React, Node.js,
          MongoDB, and modern frontend tools. I focus on clean UI, optimized APIs,
          and meaningful user experiences.
        </p>
      </SectionBox>
    </section>
  );
}
