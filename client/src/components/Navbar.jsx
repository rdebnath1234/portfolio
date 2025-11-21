import React, { useContext, useState, useEffect, useMemo } from "react";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { isDark, setIsDark } = useContext(DarkModeContext);
  const [open, setOpen] = useState(false);

  // Track active route
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  const links = useMemo(
    () => [
      { href: "/", label: "About" },
      { href: "/skills", label: "Skills" },
      { href: "/projects", label: "Projects" },
      { href: "/contact", label: "Contact" }
    ],
    []
  );

  const blurBgStyle = {
    background: isDark ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.25)",
    backdropFilter: "blur(12px)",
  };

  return (
    <header
      className="position-fixed top-0 w-100 shadow-lg"
      style={{
        zIndex: 999,
        backgroundColor: isDark ? "#3a0068" : "#8a2be2",
        transition: "0.4s ease",
      }}
    >
      <div className="container py-3 d-flex align-items-center justify-content-between">
        <Link
          to="/"
          className="fs-2 fw-bold text-decoration-none"
          style={{ color: "#fff", letterSpacing: "1px" }}
        >
          Riya
        </Link>

        {/* Desktop nav */}
        <nav className="d-none d-md-flex align-items-center gap-4 position-relative">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`nav-link fw-semibold px-2 ${
                active === l.href ? "active-link" : ""
              }`}
              style={{
                color: "#fff",
                cursor: "pointer",
                position: "relative",
              }}
            >
              {l.label}
            </Link>
          ))}

          <button
            className="btn p-2 rounded-circle shadow-sm ms-3"
            style={blurBgStyle}
            onClick={() => setIsDark(!isDark)}
          >
            {isDark ? (
              <FiSun size={20} style={{ color: "yellow" }} />
            ) : (
              <FiMoon size={20} style={{ color: "#333" }} />
            )}
          </button>
        </nav>

        {/* Mobile nav */}
        <div className="d-flex d-md-none align-items-center gap-3">
          <button
            className="btn p-2 rounded-circle shadow-sm"
            style={blurBgStyle}
            onClick={() => setIsDark(!isDark)}
          >
            {isDark ? (
              <FiSun size={20} style={{ color: "yellow" }} />
            ) : (
              <FiMoon size={20} style={{ color: "#333" }} />
            )}
          </button>

          <button
            className="btn p-2 rounded-circle shadow-sm"
            style={blurBgStyle}
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <FiX size={22} style={{ color: "#fff" }} />
            ) : (
              <FiMenu size={22} style={{ color: "#fff" }} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`d-md-none overflow-hidden`}
        style={{
          maxHeight: open ? "300px" : "0px",
          transition: "max-height 0.5s ease",
        }}
      >
        <div
          className="mx-3 mb-3 p-4 rounded-4 shadow-sm d-flex flex-column gap-3"
          style={blurBgStyle}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              onClick={() => setOpen(false)}
              className={`fw-semibold text-decoration-none ${
                active === l.href ? "text-primary" : ""
              }`}
              style={{
                color: isDark ? "#e0e0e0" : "#222",
                fontSize: "1.1rem",
                cursor: "pointer",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Sliding underline */}
      <style jsx>{`
        .nav-link::after {
          content: "";
          position: absolute;
          width: 0%;
          height: 2px;
          bottom: -4px;
          left: 0;
          background-color: #fff;
          transition: width 0.3s ease;
        }
        .nav-link.active-link::after {
          width: 100%;
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
    </header>
  );
}
