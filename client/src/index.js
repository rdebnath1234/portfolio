import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </BrowserRouter>
);
