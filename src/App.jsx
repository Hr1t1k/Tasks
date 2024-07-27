import React, { useEffect, useLayoutEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";

const Dashboard = React.lazy(() => import("./components/Dashboard.jsx"));
const LoginHome = React.lazy(() =>
  import("./components/authentication/LoginHome.jsx")
);
const Register = React.lazy(() =>
  import("./components/authentication/Register.jsx")
);
const TaskItems = React.lazy(() => import("./components/TaskItems.jsx"));
const Error = React.lazy(() => import("./components/Error/Error.jsx"));
const Home = React.lazy(() => import("./components/Home.jsx"));
const ForgotPassword = React.lazy(() =>
  import("./components/authentication/ForgotPassword.jsx")
);
import auth from "./config/firebase-config.js";
// import Home from "./components/Home.jsx";
// import ForgotPassword from "./components/authentication/ForgotPassword.jsx";

export default () => {
  const [loaded, setLoaded] = useState(false);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
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
