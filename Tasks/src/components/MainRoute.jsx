import React, { useState,useEffect } from "react";
import auth from "../config/firebase-config.js";
import {onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import LoginHome from "./authentication/LoginHome.jsx";

import { Outlet } from "react-router-dom";

export default ()=>{
  const navigate = useNavigate();
  useEffect(()=>{		
		onAuthStateChanged(auth,(user) => {
			if (user) {  console.log("logged in ")
			} else {
			navigate("/getStarted");
			}
		});
	},[auth])
    return (
      <>
      <Outlet/>    
      </>
    )

}
