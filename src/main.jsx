import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./scss/styles.scss";
import * as bootstrap from "bootstrap";
import "./index.css";
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
