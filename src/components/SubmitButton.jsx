import React from "react";
import Button from "@mui/material/Button";
import { alpha, styled } from "@mui/material/styles";
function SubmitButton(props) {
  return (
    <Button
      type="submit"
      variant="contained"
      disabled={props.loading}
      sx={{
        height: "50px",
        width: "100%",
        margin: "30px 0px",
        textAlign: "center",
        borderRadius: "25px",
        backgroundColor: "green",
        "&:hover": {
          backgroundColor: "darkgreen",
        },
      }}
    >
      {props.value}
    </Button>
  );
}

export default SubmitButton;
