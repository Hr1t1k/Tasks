import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import LoginHome from "./components/authentication/LoginHome.jsx";
import Email from "./components/authentication/Email.jsx";
import Login from "./components/authentication/Login.jsx";
import Register from "./components/authentication/Register.jsx";
import TaskItems from "./components/TaskItems.jsx";
import {ListProvider} from "./context/ListContext.js";
export default ()=>{
    const router = createBrowserRouter([
        {
          path: "/",
          element: <Dashboard />,
          children:[
            {
              path:"task/:taskId",
              element:<TaskItems/>,
            }
          ]
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

    const [lists,setLists]=useState(null);
    return (
        <ListProvider value={{lists,setLists}}>
          <RouterProvider router={router} />
        </ListProvider>
    )
}