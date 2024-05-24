import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Google from "./Google/Google";
import { Outlet, useNavigate } from "react-router-dom";
import auth from "../../config/firebase-config";
import {
  onAuthStateChanged,
  getRedirectResult,
  GoogleAuthProvider,
} from "firebase/auth";
import axios from "axios";
function Home() {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // getRedirectResult(auth).then((result) => {
    //   if (result) navigate("/");
    //   console.log("inside Redirect URL");
    //   console.log(result);
    //   console.log("AUTH", auth);
    // });
    // onAuthStateChanged(auth, (user) => {
    setLoaded(true);
    const email = localStorage.getItem("email");
    const uid = localStorage.getItem("uid");
    if (email) {
      axios
        .post(`${import.meta.env.VITE_DATABASE_URL}/addUser`, {
          username: email,
          id: uid,
        })
        .then(navigate("/"));
      return;
    }
    // });
  }, []);
  return (
    <>
      {loaded && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundImage: `linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)`,
          }}
        >
          <Paper
            sx={{
              width: "450px",
              textAlign: "center",
              padding: "0px 0px 30px 0px",
              margin: "auto",
              opacity: "1",
            }}
          >
            <h1 className="p-4" style={{ fontSize: "48px" }}>
              Log in to Tasks
            </h1>
            <div style={{ width: "78%", margin: "auto" }}>
              <Google />
              <hr style={{ marginTop: "40px" }}></hr>
              <Outlet />
            </div>
          </Paper>
        </div>
      )}
    </>
  );
}
export default Home;
