import React, { useState } from "react";
import auth from "../config/firebase-config.js";
import {onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import LoginHome from "./authentication/LoginHome.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default ()=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    //const navigate = useNavigate();
  
    onAuthStateChanged(auth,(user) => {
      if (user) {
        setIsLoggedIn(true);
        console.log(user);
      } else {
        setIsLoggedIn(false);
        //navigate("/");
        console.log(user);
      }
    });
    return (<>
        <BrowserRouter >
<Routes>
  <Route exact path="/" element={<Dashboard />}></Route>
  <Route path="/getStarted" element={<LoginHome />}></Route>
</Routes>
</BrowserRouter>
    </>
    );
    
}
