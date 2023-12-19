import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Link,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import {
  onAuthStateChanged,
  getRedirectResult,
  GoogleAuthProvider,
} from "firebase/auth";

import Dashboard from "./components/Dashboard.jsx";
import LoginHome from "./components/authentication/LoginHome.jsx";
import Email from "./components/authentication/Email.jsx";
import Login from "./components/authentication/Login.jsx";
import Register from "./components/authentication/Register.jsx";
import TaskItems from "./components/TaskItems.jsx";
import { ListProvider } from "./context/ListContext.js";
import Error from "./components/Error/Error.jsx";

import auth from "./config/firebase-config.js";
export default () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setLoaded(true);
    });
  }, []);
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

  const [lists, setLists] = useState(null);
  return (
    // <ListProvider value={{ lists, setLists }}>
    <>
      {loaded && <RouterProvider router={router} />}
      {!loaded && (
        <>
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: "100vh" }}
          >
            <div
              class="spinner-border"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </>
      )}
    </>
    // </ListProvider>
  );
};
