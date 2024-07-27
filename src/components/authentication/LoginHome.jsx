import React from "react";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import Google from "./Google/Google";
import Login from "./Login";
function Home() {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",

          backgroundImage: `linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)`,
          overflow: "auto",
        }}
      >
        <Paper
          sx={{
            width: "430px",
            textAlign: "center",
            padding: "0px 0px 20px 0px",
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
            <Login />
            <p style={{ color: "grey" }}>
              Don't have an account?{" "}
              <Link style={{ color: "black" }} to="/register">
                Sign up for Tasks
              </Link>
              .
            </p>
          </div>
        </Paper>
      </div>
    </>
  );
}
export default Home;
