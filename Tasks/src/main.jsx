import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx"
// Import our custom CSS
import './scss/styles.scss'


// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <App/>
  </StrictMode>,
);
