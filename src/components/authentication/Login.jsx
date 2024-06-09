import React, { useState, useEffect, useLayoutEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputText from "../InputText";
import SubmitButton from "../SubmitButton";
import auth from "../../config/firebase-config";
import { getRedirectResult, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../Toast";

function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    if (password.trim() === "") {
      setPasswordError(true);
    }
    if (email.trim() === "") {
      setEmailError(true);
    }

    if (email != "" && password != "") {
      setLoginError("");
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoginError(errorMessage);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {loginError != "" && <Toast error={loginError} />}
        <FormControl sx={{ width: "100%" }}>
          <InputText
            name="Email"
            error={emailError}
            setError={setEmailError}
            text={email}
            errorMessage={"This field is required"}
            setText={setEmail}
          />
          <InputText
            name="Password"
            error={passwordError}
            setError={setPasswordError}
            text={password}
            setText={setPassword}
            errorMessage={"This field is required"}
            type="password"
          />
        </FormControl>
        <FormControl
          sx={{
            display: "inline-grid",
            width: "100%",
            gridTemplate: "1fr /1fr 1fr",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            to="/reset-password"
            style={{
              width: "fit-content",
              display: "inline-flex",
              color: "black",
            }}
          >
            Forgot Password?
          </Link>
          <SubmitButton value="Login" loading={loading} />
        </FormControl>
      </form>
    </>
  );
}

export default Login;
