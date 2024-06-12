import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const Step1 = props => {
  if (props.currentStep !== 1) {
    return null;
  }

  

  return (
    <>
      <h1>Let's start with a name for </h1>
      <h1>your project </h1>
      <FormGroup>
        
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your project name"
          value={props.name} // Prop: The email input data
          onChange={props.handleChange} // Prop: Puts data into the state
        />
      </FormGroup>

      

    </>
  );
};

export default Step1;
