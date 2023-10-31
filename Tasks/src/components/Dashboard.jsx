import React, { useEffect, useState } from "react";
import auth from "../config/firebase-config";
import {onAuthStateChanged } from "firebase/auth";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header.jsx"
import Lists from "./Lists";
import axios from "axios";

export default ()=> {
	const [greeting, setGreeting] = useState("Morning");
	const [lists,setLists]=useState([{}]);
	const [name,setName]=useState();
	const navigate = useNavigate();
	useEffect(()=>{
		onAuthStateChanged(auth,(user) => {
			if (user) {
				setName(user.displayName);
				console.log("main call to api",user.uid);
			axios.post("https://tasksdatabase.onrender.com/",{username:user.uid}).then((response) => {
                    setLists(response.data);
					console.log("lists returned",response.data);
               		//if(response.data)navigate(`/task/${response.data[0].id}`);
               });
			} else {
			navigate("/getStarted");
			}
		});
	},[navigate])
	return (
		<>
		  	<div  className="container-fluid m-0 p-0 " style={{height:"100vh"}} >
				<div className="col-12">
					<Header/>
				</div>
				<div className="container-fluid p-0 m-0">
					<div class="row h-100 m-0 p-0" >
						<div className="  col-12 col-md-2" style={{backgroundColor:"black"}}>
							<Lists lists={lists} setLists={setLists}/>
						</div>
						<div className="col-12 col-md-10" style={{height:"calc(100vh - 53px)"}}>
							<h1 className="col-8 " style={{marginTop:"25px"}}>Good {greeting} {name} </h1>	
							<Outlet />
						</div>
					</div>
				</div>
			</div> 
		</>
	);
}
