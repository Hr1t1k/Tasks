import React from "react";
import Paper from "@mui/material/Paper";
import Google from "../buttons/Google";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
    <Paper sx={{ width: "450px", textAlign: "center" ,padding:"0px 0px 30px 0px" , margin:"auto"}}>
      <h1 style={{fontSize:"48px"}}>Log in to Tasks</h1>
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
