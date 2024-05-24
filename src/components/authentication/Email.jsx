import React, { useState, useEffect } from "react";
import InputText from "../InputText";
import SubmitButton from "../SubmitButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Email() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (email === "") {
      setError(true);
      return;
    } else {
      await axios
        .post(`${import.meta.env.VITE_DATABASE_URL}/getUserWithEmail`, {
          username: email,
        })
        .then((response) => {
          console.log(response.data);
          const name = response.data.name;
          navigate("/getStarted/login", { state: { email, name } });
        })
        .catch((error) => {
          console.log(error);
          console.log("NONO");
          navigate("/getStarted/register", { state: { email } });
          return;
        });
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit} style={{ margin: "auto" }}>
        <InputText
          name="Email"
          error={error}
          setError={setError}
          text={email}
          setText={setEmail}
        />
        <SubmitButton value="Get Started" />
      </form>
    </>
  );
}

export default Email;
