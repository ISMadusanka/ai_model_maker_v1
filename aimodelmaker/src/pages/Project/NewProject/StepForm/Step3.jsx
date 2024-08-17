import React from "react";
import { Typography } from "@mui/material";

const Step3 = (props) => {
  if (props.currentStep !== 3) {
    return null;
  }
  const { name, modelId } = props.state;

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Review Your Details
      </Typography>
      <Typography variant="body1">
        <strong>Project Name:</strong> {name}
      </Typography>
      <Typography variant="body1">
        <strong>Model ID:</strong> {modelId}
      </Typography>
    </>
  );
};

export default Step3;
