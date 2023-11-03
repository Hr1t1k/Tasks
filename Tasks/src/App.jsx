import React, { useState } from "react";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
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
          errorElement:<div>Oops! Something unexpected happened, <Link to="/">Click here to go back to home page.</Link></div>,
          children:[
            {
              path:"task/:taskId",
              element:<TaskItems/>,
              errorElement:<div>Oops! Something unexpected happened, <Link to="/">Click here to go back to home page.</Link></div>,
            }
          ]
        },
        {
          path:"/getStarted",
          element:<LoginHome />,
          errorElement:<div>Oops! Something unexpected happened, <Link to="/">Click here to go back to home page.</Link></div>,
          children:[
            {
              path:"/getStarted",
              element:<Email />,
              errorElement:<div>Oops! Something unexpected happened, <Link to="/">Click here to go back to home page.</Link></div>,
            },
            {
              path:"/getStarted/login",
              element:<Login />,
              errorElement:<div>Oops! Something unexpected happened, <Link to="/">Click here to go back to home page.</Link></div>,
            },
            {
              path:"/getStarted/register",
              element:<Register />,
              errorElement:<div>Oops! Something unexpected happened, <Link to="/">Click here to go back to home page.</Link></div>,
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