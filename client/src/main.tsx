import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/vendor/css/core.css";
import "./assets/vendor/css/theme-default.css";
import "./styles/App.css";
import "./assets/vendor/js/bootstrap.bundle.min.js";  
import $ from "jquery";

window.$ = $; // make $ available in the window object
window.jQuery = $; // make jQuery available in the window object to access it globally



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
