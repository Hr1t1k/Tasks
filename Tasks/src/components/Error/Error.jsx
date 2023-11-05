import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Error from "./Error.module.css"
export default ()=> {
  const navigate=useNavigate();
  return (
    <div className="d-flex flex-column flex-wrap align-items-center justify-content-center text-center" style={{height:"80vh"}}>
        <h1 >Something unexpected happened,</h1>
        <button className={`${Error.button} `} onClick={()=>navigate("/")}>Go back to homepage.</button>
    </div>
  );
}