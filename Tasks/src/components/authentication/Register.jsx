import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputText from "../InputText";
import SubmitButton from "../SubmitButton";
import { useLocation } from "react-router-dom";
import axios from "axios";
import auth from "../../config/firebase-config"
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
      // Signed up 
      const user = userCredential.user;
     await updateProfile(user, {
          displayName: name
      }).catch((error) => {
          console.log(error);
      });
      await axios.post(
          "https://tasksdatabase.onrender.com/addUser",{username:email,id:user.uid},
      ).then((response) => {
          console.log("Reg");
          localStorage.setItem("uid",user.uid);
          localStorage.setItem("email",user.email);
          navigate("/");
      })
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    // ..
  });
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
              name="Name"
              error={false}
              setError={setError}
              text={name}
              setText={setName}
              type="text"
            />
          </FormControl>
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
          <FormControl sx={{display: "inline-grid",width:"100%", gridTemplate:"1fr / 1fr" ,justifyContent:"space-between",alignItems:"center"}}>
            {/* <a style={{width:"fit-content" ,display:"inline-flex"}}>Forgot Password?</a> */}
            <SubmitButton value="Register"  />
          </FormControl>
        </form>
      </>
    );
  }
}

export default Register;
