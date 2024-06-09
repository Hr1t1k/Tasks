import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputText from "../InputText";
import SubmitButton from "../SubmitButton";
import { Link } from "react-router-dom";
import auth from "../../config/firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";
import Google from "./Google/Google";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";
import Toats from "../Toast";

function Register() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [signupError, setSignupError] = useState("");
  const navigate = useNavigate();
  function validateData() {
    let isValid = true;
    if (!isEmail(email, { domain_specific_validation: true })) {
      setEmailError(true);
      isValid = false;
    }
    if (!isStrongPassword(password)) {
      setPasswordError(true);
      isValid = false;
    }
    if (name.trim() === "") {
      setNameError(true);
      isValid = false;
    }
    return isValid;
  }
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const passwordCheck = validateData();

    if (passwordCheck === false) {
      console.log("should exit function");
      setLoading(false);
      return;
    }
    console.log("function not exited");
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name,
        }).catch((error) => {
          throw error;
        });
        navigate("/");
      })
      .catch((error) => {
        setSignupError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundImage: `linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)`,
        }}
      >
        <Paper
          sx={{
            width: "430px",
            textAlign: "center",
            padding: "0px 0px 30px 0px",
            margin: "auto",
            opacity: "1",
          }}
        >
          <h1 className="p-4" style={{ fontSize: "48px" }}>
            Tasks
          </h1>
          <div style={{ width: "78%", margin: "auto" }}>
            <Google />
            <hr style={{ marginTop: "40px" }}></hr>
            {/* <p>Enter your details</p> */}
            <form onSubmit={handleSubmit}>
              {signupError != "" && <Toats error={signupError} />}
              <FormControl sx={{ width: "100%" }}>
                <InputText
                  name="Name"
                  error={nameError}
                  setError={setNameError}
                  text={name}
                  setText={setName}
                  errorMessage={"Please enter your name."}
                  type="text"
                />

                <InputText
                  name="Email"
                  error={emailError}
                  setError={setEmailError}
                  text={email}
                  errorMessage={"Please enter your email in correct format."}
                  setText={setEmail}
                />
                <InputText
                  name="Password"
                  error={passwordError}
                  setError={setPasswordError}
                  text={password}
                  setText={setPassword}
                  errorMessage={
                    <>
                      <p>
                        Must be at least 8 characters long <br />
                        Must contain at least one uppercase letter (A-Z) <br />
                        Must contain at least one lowercase letter (a-z) <br />
                        Must contain at least one number (0-9) <br />
                        Must contain at least one special character
                      </p>
                    </>
                  }
                  type="password"
                />
              </FormControl>
              <FormControl
                sx={{
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <SubmitButton value="Register" loading={loading} />
              </FormControl>
            </form>
            <p style={{ color: "grey" }}>
              Already have an account?{" "}
              <Link style={{ color: "black" }} to="/login">
                Log in here
              </Link>
              .
            </p>
          </div>
        </Paper>
      </div>
    </>
  );
}

export default Register;
