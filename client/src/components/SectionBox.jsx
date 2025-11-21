import React, { useContext } from "react";
import { DarkModeContext } from "../contexts/DarkModeContext";

export default function SectionBox({ children }) {
  const { isDark } = useContext(DarkModeContext);

  const style = {
    background: isDark ? "rgba(255,255,255,0.03)" : "#ffffff",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: isDark
      ? "0 4px 25px rgba(0,0,0,0.4)"
      : "0 4px 25px rgba(0,0,0,0.1)",
    border: isDark
      ? "1px solid rgba(255,255,255,0.1)"
      : "1px solid rgba(0,0,0,0.08)",
    transition: "0.3s ease-in-out",
  };

  return (
    <div className="container my-5">
      <div style={style}>
        {children}
      </div>
    </div>
  );
}
