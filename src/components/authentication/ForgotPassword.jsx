import { FormControl, Paper } from "@mui/material";
import React, { useState } from "react";
import InputText from "../InputText";
import Toats from "../Toast";
import SubmitButton from "../SubmitButton";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import auth from "../../config/firebase-config";
const ForgotPassword = () => {
  const getParameterByName = (param) => {
    const location = useLocation();
    return new URLSearchParams(location.search).get(param);
  };
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [password1Error, setPassword1Error] = useState(false);
  const [password2Error, setPassword2Error] = useState(false);
  async function changePassword(e) {
    e.preventDefault();
    if (password1.trim() != password2.trim()) {
      setPassword2Error(true);
      return;
    }
    verifyPasswordResetCode(auth, actionCode)
      .then((email) => {
        const accountEmail = email;
        confirmPasswordReset(auth, actionCode, password1)
          .then((resp) => {
            signInWithEmailAndPassword(auth, accountEmail, password1).then(
              () => {
                navigate("/");
              }
            );
          })
          .catch((error) => {
            throw error;
          });
      })
      .catch((error) => {
        navigate("/reset-password");
      });
  }

  const mode = getParameterByName("mode");
  const actionCode = getParameterByName("oobCode");
  async function handleSubmit(event) {
    event.preventDefault();
    const auth = getAuth();
    var actionCodeSettings = {
      url: window.location.origin,
    };
    sendPasswordResetEmail(auth, email, actionCodeSettings)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setSignupError(errorMessage);
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
          <div style={{ width: "78%", margin: "auto" }}>
            <h2 style={{ marginBottom: "30px", marginTop: "30px" }}>
              Reset your password
            </h2>
            {mode === "resetPassword" ? (
              <>
                <p>Please enter your new password below.</p>
                <form onSubmit={changePassword}>
                  {signupError != "" && <Toats error={signupError} />}
                  <FormControl sx={{ width: "100%" }}>
                    <InputText
                      name="New Password"
                      error={password1Error}
                      setError={setPassword1Error}
                      text={password1}
                      errorMessage={
                        "Please enter your email in correct format."
                      }
                      setText={setPassword1}
                    />
                    <InputText
                      name="Verify new password"
                      error={password2Error}
                      setError={setPassword2Error}
                      text={password2}
                      errorMessage={"Password do not match."}
                      setText={setPassword2}
                    />
                  </FormControl>
                  <SubmitButton value="Send Link" loading={false} />
                </form>
              </>
            ) : (
              <>
                <p>
                  Enter your email address , and we'll send you a link to get
                  back into your account.
                </p>
                {/* <p>Enter your details</p> */}
                <form onSubmit={handleSubmit}>
                  {signupError != "" && <Toats error={signupError} />}
                  <FormControl sx={{ width: "100%" }}>
                    <InputText
                      name="Email"
                      error={emailError}
                      setError={setEmailError}
                      text={email}
                      errorMessage={
                        "Please enter your email in correct format."
                      }
                      setText={setEmail}
                    />
                  </FormControl>
                  <SubmitButton value="Send Link" loading={false} />
                </form>
              </>
            )}
          </div>
        </Paper>
      </div>
    </>
  );
};

export default ForgotPassword;
