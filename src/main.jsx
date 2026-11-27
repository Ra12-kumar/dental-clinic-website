import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles.css";

const root = document.getElementById("root");
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Reuse the prerendered HTML when it belongs to this page (much less work on phones).
const route = root.dataset.route;
if (route === "/404" || route === (window.location.pathname.replace(/\/+$/, "") || "/")) hydrateRoot(root, app);
else createRoot(root).render(app);
