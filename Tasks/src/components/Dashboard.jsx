import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";
import auth from "../config/firebase-config";
import {onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Header from "./Header.jsx"
import { NavLink } from "react-router-dom";
import TaskItems from "./TaskItems";
import axios from "axios";

// import "../../src/index.css";	
export default ()=> {
	const [greeting, setGreeting] = useState("Morning");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [lists,setLists]=useState([{}]);
	const navigate = useNavigate();
	onAuthStateChanged(auth,(user) => {
		if (user) {
		setIsLoggedIn(true);
		axios.post(
            "http://localhost:4000/",{username:user.uid},
          ).then((response) => {
            setLists(response.data);
          }).catch((error) => {
            console.log(error);
          });
		} else {
		setIsLoggedIn(false);
		navigate("/getStarted");
		}
	});
	return (
		<>
			<Header/>
			<h1>Good {greeting} </h1>
			<div id="lists">
				<ul>
					<h3>My Lists +</h3>
					{lists.map((list)=>{
						return <li>
							<NavLink
                                to={`/dashboard/${list.id}`}
                                className={({isActive}) =>`block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`}
                            >
                                {list.name}
                            </NavLink>
						</li>
					})}
				</ul>          
			</div>
			<TaskItems />
		</>
	);
}
