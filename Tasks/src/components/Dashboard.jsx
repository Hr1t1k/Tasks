import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";
import auth from "../config/firebase-config";
import {onAuthStateChanged } from "firebase/auth";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header.jsx"
import TaskItems from "./TaskItems";
import Lists from "./Lists";
import axios from "axios";

// import "../../src/index.css";	
export default ()=> {
	const [greeting, setGreeting] = useState("Morning");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [lists,setLists]=useState([{}]);
	const navigate = useNavigate();
	useEffect(()=>{
		onAuthStateChanged(auth,(user) => {
			if (user) {
			axios.post("http://localhost:4000/",{username:user.uid}).then((response) => {
                    setLists(response.data);
               		navigate("/task/main");
               });
			} else {
			navigate("/getStarted");
			}
		});
	},[navigate])
	return (
		<>
			<Header/>
			<h1>Good {greeting} </h1>
			<>
			<Lists lists={lists} setLists={setLists}/>
			</>
			<Outlet />
		</>
	);
}
