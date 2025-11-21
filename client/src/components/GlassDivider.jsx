import React, { useContext } from "react";
import { DarkModeContext } from "../contexts/DarkModeContext";

export default function GlassDivider() {
  const { isDark } = useContext(DarkModeContext);

  const style = {
    width: "100%",
    height: "45px",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    background: isDark
      ? "rgba(0,0,0,0.25)"       // Dark glass
      : "rgba(255,255,255,0.25)", // Light glass
    borderRadius: "22px",
    margin: "40px 0",
    border: isDark
      ? "1px solid rgba(255,255,255,0.15)"
      : "1px solid rgba(0,0,0,0.08)",
    boxShadow: isDark
      ? "0 4px 20px rgba(0,0,0,0.4)"
      : "0 4px 20px rgba(0,0,0,0.1)",
    transition: "0.3s ease-in-out",
  };

  return <div style={style}></div>;
}
