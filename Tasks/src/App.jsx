import React, { useState } from "react";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import LoginHome from "./components/authentication/LoginHome.jsx";
import Email from "./components/authentication/Email.jsx";
import Login from "./components/authentication/Login.jsx";
import Register from "./components/authentication/Register.jsx";
import TaskItems from "./components/TaskItems.jsx";
import {ListProvider} from "./context/ListContext.js";
import Error from "./components/Error/Error.jsx";
export default ()=>{
    const router = createBrowserRouter([
        {
          path: "/",
          element: <Dashboard />,
          errorElement:<Error />,
          children:[
            {
              path:"task/:taskId",
              element:<TaskItems/>,
              errorElement:<Error />,
            }
          ]
        },
        {
          path:"/getStarted",
          element:<LoginHome />,
          errorElement:<Error />,
          children:[
            {
              path:"/getStarted",
              element:<Email />,
              errorElement:<Error />,
            },
            {
              path:"/getStarted/login",
              element:<Login />,
              errorElement:<Error />,
            },
            {
              path:"/getStarted/register",
              element:<Register />,
              errorElement:<Error />,
            }
          ]
        },
      ]);

    const [lists,setLists]=useState(null);
    return (
        <ListProvider value={{lists,setLists}}>
          <RouterProvider router={router} />
        </ListProvider>
    )
}