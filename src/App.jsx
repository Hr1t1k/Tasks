import React, { useEffect, useLayoutEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";

import Dashboard from "./components/Dashboard.jsx";
import LoginHome from "./components/authentication/LoginHome.jsx";
import Register from "./components/authentication/Register.jsx";
import TaskItems from "./components/TaskItems.jsx";
import Error from "./components/Error/Error.jsx";

import auth from "./config/firebase-config.js";
import Home from "./components/Home.jsx";
import ForgotPassword from "./components/authentication/ForgotPassword.jsx";

export default () => {
  const [loaded, setLoaded] = useState(false);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/login",
          element: <LoginHome />,
          errorElement: <Error />,
        },
        {
          path: "/register",
          element: <Register />,
          errorElement: <Error />,
        },
        {
          path: "/reset-password",
          element: <ForgotPassword />,
          errorElement: <Error />,
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
            {
              path: "/",
              element: <TaskItems />,
              errorElement: <Error />,
            },
          ],
        },
      ],
    },
  ]);
  useEffect(() => {
    onAuthStateChanged(auth, () => {
      console.log(auth?.currentUser?.accessToken);
      setLoaded(true);
    });
  }, []);
  return (
    <>
      {loaded ? (
        <RouterProvider router={router} />
      ) : (
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
