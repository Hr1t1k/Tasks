import React from "react";
import Button from "@mui/material/Button";
import { alpha, styled } from "@mui/material/styles";
function SubmitButton(props) {
  return (
    <Button
      type="submit"
      variant="contained"
      sx={{
        height: "50px",
        width: "100%",
        margin: "30px 0px",
        textAlign: "center",
      }}
    >
      {props.value}
    </Button>
  );
}

export default SubmitButton;
