import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputText from "../InputText";
import SubmitButton from "../SubmitButton";
import { useLocation } from "react-router-dom";
import axios from "axios";
import auth from "../../config/firebase-config";
import {signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  

  async function handleSubmit(event) {
    event.preventDefault();
    if (password === "") {
      setError(true);
    } else {      
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate("/");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        setError(true);
      });
    }

    
  }

  const location = useLocation();

  // Set the email state variable to the email prop from the location state when the user navigates back to the password component.
  useEffect(() => {
    if (location?.state?.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  if (email === null) {
    return ;
  } else {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <p>Welcome {email}</p>
          <FormControl sx={{ width: "100%" }}>
            <InputText
              name="Password"
              error={error}
              setError={setError}
              text={password}
              setText={setPassword}
              type="password"
            />
          </FormControl>
          <FormControl sx={{display: "inline-grid",width:"100%", gridTemplate:"1fr /1fr 1fr" ,justifyContent:"space-between",alignItems:"center"}}>
            <a href="/" style={{width:"fit-content" ,display:"inline-flex"}}>Forgot Password?</a>
            <SubmitButton value="Login"  />
          </FormControl>
        </form>
      </>
    );
  }
}

export default Login;
