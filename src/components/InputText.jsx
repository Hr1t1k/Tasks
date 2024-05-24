import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

var val = "";
function InputText(props) {
  const [error,setError]=useState(false);
  const [showPassword, setShowPassword] = useState(props.type!=="password");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleChange(event) {
    props.setText(event.target.value);
    props.setError(false);
    setError(false);
  }

  const handleInvalid = (event) => {
    event.preventDefault();
    props.setError(true);
    console.log("The input is invalid!");
    if(event.target.value==="") {
      setError(true);
    }
    else props.setError(true);
    
  };
  val = props.text;
  return (
    <TextField
      name={props.name}
      error={props.error || error}
      label={props.name}
      InputProps={{
        onInvalid: handleInvalid,
      }}
      required
      onChange={handleChange}
      helperText={(error || props.error)?`Please enter correct ${props.name}`: " "}
      value={props.text}
      type={showPassword ? 'text' : 'password'}
      {...props.type==="password" && {InputProps:{
            endAdornment:(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
      }}
      }
      sx={{ width: "100%", margin: "auto",  marginTop:"20px"}}
    />
  );
}

export default InputText;
