import React from "react";
import { Stepper, Step, StepLabel } from "@mui/material";

const MultiStepProgressBar = (props) => {
  return (
    <Stepper activeStep={props.currentStep - 1} alternativeLabel>
      <Step><StepLabel /></Step>
      <Step><StepLabel /></Step>
      <Step><StepLabel /></Step>
    </Stepper>
  );
};

export default MultiStepProgressBar;
