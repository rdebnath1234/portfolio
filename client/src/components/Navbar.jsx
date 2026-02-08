import React, { useContext, useEffect, useMemo, useState } from "react";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const { isDark, setIsDark } = useContext(DarkModeContext);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  const links = useMemo(
    () => [
      { href: "#home", label: "Home" },
      { href: "#about", label: "About" },
      { href: "#skills", label: "Skills" },
      { href: "#experience", label: "Experience" },
      { href: "#projects", label: "Projects" },
      { href: "#open-source", label: "Open Source" },
      { href: "#contact", label: "Contact" }
    ],
    []
  );

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section[data-section]"));
    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id) setActive(id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`site-nav ${isDark ? "nav-dark" : "nav-light"}`}
    >
      <div className="container nav-inner">
        <a href="#home" className="logo">
          Riya Debnath
        </a>

        <nav className="nav-links d-none d-md-flex">
          {links.map((l) => {
            const id = l.href.replace("#", "");
            return (
              <a
                key={l.href}
                href={l.href}
                className={`nav-link ${active === id ? "active" : ""}`}
              >
                {l.label}
              </a>
            );
          })}
          <button
            type="button"
            className="theme-toggle"
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle dark mode"
          >
            {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
        </nav>

        <div className="d-flex d-md-none align-items-center gap-2">
          <button
            type="button"
            className="theme-toggle"
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle dark mode"
          >
            {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      <div className={`mobile-panel ${open ? "open" : ""}`}>
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="mobile-link"
            onClick={() => setOpen(false)}
          >
            {l.label}
          </a>
        ))}
      </div>
    </header>
  );
}
