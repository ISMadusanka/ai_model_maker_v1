import React from "react";
import { TextField, Typography } from "@mui/material";

const Step1 = (props) => {
  if (props.currentStep !== 1) {
    return null;
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Let's start with a name for your project
      </Typography>
      <TextField
        label="Project Name"
        variant="outlined"
        fullWidth
        margin="normal"
        name="name"
        value={props.name}
        onChange={props.handleChange}
      />
    </>
  );
};

export default Step1;
