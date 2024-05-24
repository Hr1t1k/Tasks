import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";

import Dashboard from "./components/Dashboard.jsx";
import LoginHome from "./components/authentication/LoginHome.jsx";
import Email from "./components/authentication/Email.jsx";
import Login from "./components/authentication/Login.jsx";
import Register from "./components/authentication/Register.jsx";
import TaskItems from "./components/TaskItems.jsx";
import Error from "./components/Error/Error.jsx";

import auth from "./config/firebase-config.js";

export default () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const startTime = new Date().getTime();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        localStorage.setItem("email", user.email);
        localStorage.setItem("user", user.uid);
      }

      setLoaded(true);
    });
    const router = createBrowserRouter([
      {
        path: "/getStarted",
        element: <LoginHome />,
        errorElement: <Error />,
        children: [
          {
            path: "/getStarted",
            element: <Email />,
            errorElement: <Error />,
          },
          {
            path: "/getStarted/login",
            element: <Login />,
            errorElement: <Error />,
          },
          {
            path: "/getStarted/register",
            element: <Register />,
            errorElement: <Error />,
          },
        ],
      },
      {
        path: "/",
        element: <Dashboard />,
        errorElement: <Error />,
        children: [
          {
            path: "task/:taskId",
            element: <TaskItems />,
            errorElement: <Error />,
          },
        ],
      },
    ]);
    setRouter(router);
  }, [loaded]);

  const [router, setRouter] = useState(null);

  return (
    <>
      {loaded && router && <RouterProvider router={router} />}
      {!loaded && (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "100vh" }}
        >
          <div
            className="spinner-border"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
};
