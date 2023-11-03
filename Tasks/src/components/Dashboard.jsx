import React, { useEffect, useState } from "react";
import auth from "../config/firebase-config";
import {onAuthStateChanged } from "firebase/auth";
import { Outlet, useNavigate,useLocation,useNavigation } from "react-router-dom";
import Header from "./Header.jsx"
import Lists from "./Lists";
import axios from "axios";
import dashboard from "../assets/Dashboard.module.css";
import useList from "../context/ListContext";
import { getAuth, getRedirectResult, GoogleAuthProvider } from "firebase/auth";

export default ()=> {
	 const {lists,setLists}=useList();
	const [name,setName]=useState();
	const navigate = useNavigate();
	const location =useLocation();
	const navigation = useNavigation();
	
	useEffect(()=>{		
		console.log("first");
		const uid=localStorage.getItem("uid");
		if(uid){
			axios.post("https://tasksdatabase.onrender.com/",{username:uid}).then((response) => {
                     setLists(response.data);
               		if(location.pathname==="/" &&response.data){
						navigate(`/task/${response.data[0]._id}`);
						
					}
               });
			return ;
		}else{
		onAuthStateChanged(auth,(user) => {
			if (user ) {
				setName(user.displayName);
				axios.post("https://tasksdatabase.onrender.com/",{username:user.uid}).then((response) => {
                    setLists(response.data);
					if(location.pathname==="/" &&response.data){
						navigate(`/task/${response.data[0]._id}`);
						
					}

               });
			} else {
			navigate("/getStarted");
			}
		});
	}
	},[auth])
	useEffect(()=>{
		console.log("second");
		const uid=localStorage.getItem("uid");
		if(uid){
			axios.post("https://tasksdatabase.onrender.com/",{username:uid}).then((response) => {
                     setLists(response.data);
					if(location.pathname==="/" &&response.data){
						console.log("Shit2");
						navigate(`/task/${response.data[0]._id}`);
					}
               });
			}
		else{
			navigate("/getStarted");
		}
	},[location.pathname==="/"?navigate:null])
	return (
		//<ListProvider value={{lists,setLists}}>
		  	<div  className={`container-fluid m-0 p-0 ${dashboard.main}` }  >
				<div className="col-12">
					<Header/>
				</div>
				<div className="container-fluid p-0 m-0">
					<div className="row h-100 m-0 p-0" >
						<div className={`  col-12  col-lg-3 col-md-3 ${dashboard.lists}`} >
							{ <Lists />}
						</div>
						<div className={`col-12 col-lg-9 col-md-9 ${navigation.state === "loading" ? "loading" : ""}`} style={{height:"calc(100vh - 53px)"}}>
							{/* <h1 className="col-8 " style={{marginTop:"15px"}}>Good {greeting} {name} </h1>	 */}
							<Outlet />
						</div>
					</div>
				</div>
			</div> 
		//</ListProvider>
	);
}
