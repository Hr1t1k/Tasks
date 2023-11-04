import React,{useEffect} from "react";
import Paper from "@mui/material/Paper";
import Google from "../buttons/Google";
import { Outlet, useNavigate } from "react-router-dom";
import auth from "../../config/firebase-config"
import { onAuthStateChanged, getRedirectResult, GoogleAuthProvider } from "firebase/auth";
import axios from "axios";
function Home() {
  const navigate=useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("uid")){
      axios.post("https://tasksdatabase.onrender.com/addUser",{username:localStorage.getItem("email"),id:localStorage.getItem("uid")}).then(navigate("/"))
      return ;
    }else{
     const  user=auth.currentUser;
     onAuthStateChanged(auth,(user)=>{
      if (user) {
        localStorage.setItem("uid",user.uid);
        localStorage.setItem("email",user.email);
				axios.post("https://tasksdatabase.onrender.com/addUser",{username:user.email,id:user.uid}).then(navigate("/"))
        return 
      }
     })
			
    }	
  
  },[navigate,auth])
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: `linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)`
      }}
    >
    <Paper sx={{ width: "450px", textAlign: "center" ,padding:"0px 0px 30px 0px" , margin:"auto",opacity:"1"}}>
      <h1 className="p-4" style={{fontSize:"48px"}}>Log in to Tasks</h1>
      <div style={{width:"78%" ,margin:"auto"}}>  
      <Google />
      <hr style={{marginTop:"40px"}}></hr>
      <Outlet />
      </div>
    </Paper>
    </div>
  );
}
export default Home;
