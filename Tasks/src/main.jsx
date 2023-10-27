import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import LoginHome from "./components/authentication/LoginHome.jsx";
import Email from "./components/authentication/Email.jsx";
import Login from "./components/authentication/Login.jsx";
import Register from "./components/authentication/Register.jsx";
// Import our custom CSS
import './scss/styles.scss'


// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path:"/getStarted",
    element:<LoginHome />,
    children:[
      {
        path:"/getStarted",
        element:<Email />,
      },
      {
        path:"/getStarted/login",
        element:<Login />,
      },
      {
        path:"/getStarted/register",
        element:<Register />,
      }
    ]
  },
]);
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
