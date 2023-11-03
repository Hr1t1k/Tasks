import React from "react";
import auth from "../config/firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default ()=>{
    const navigate=useNavigate();
    function handleSignOut(){
        signOut(auth).then(()=>{
            localStorage.removeItem("uid");
            localStorage.removeItem("email");
            navigate("/");
        })
    }
    return (<>
        <header className=" text-bg-dark" >
            <div className="container-fluid col-12">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                    <a href="/" className="d-flex align-items-center  m-md-0 text-white text-decoration-none">
                        <h1 className="mt-2">Tasks.</h1>
                    </a>
                    <div className="dropdown text-end">
                        <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle m-10" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://source.unsplash.com/32x32/?person" alt="mdo" width="32" height="32" className="rounded-circle"/>
                        </a>
                        <ul className="dropdown-menu text-small">
                            <li><a className="dropdown-item" href="#">Settings</a></li>
                            <li><hr className="dropdown-divider"/></li>
                            <li><a className="dropdown-item" href="#" onClick={handleSignOut}>Sign out</a></li>
                        </ul>
                    </div>
                </div>
            </div>
  </header></>
    )
}