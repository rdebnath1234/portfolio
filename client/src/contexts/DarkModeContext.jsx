import React, { createContext, useState, useEffect } from "react";

// Create context
export const DarkModeContext = createContext();

// Provider component
export const DarkModeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  // Persist theme in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("isDark");
    if (savedTheme !== null) {
      setIsDark(savedTheme === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isDark", isDark);
    // Add dark class to <body> for Tailwind or CSS
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <DarkModeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </DarkModeContext.Provider>
  );
};
