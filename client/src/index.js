import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/rdebnath1234.github.io/portfolio">
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </BrowserRouter>
);
