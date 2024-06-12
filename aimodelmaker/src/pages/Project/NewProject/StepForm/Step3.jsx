import React from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";

const Step3 = props => {
  if (props.currentStep !== 3) {
    return null;
  }
  const { name, modelId } = props.state;

  return (
    <>
      {/* <FormGroup>
        <Label for="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your Password"
          value={props.password} // Prop: The username input data
          onChange={props.handleChange} // Prop: Puts data into the state
        />
      </FormGroup> */}

        <h1>{name}</h1>
        <h2>{modelId}</h2>

    </>
  );
};

export default Step3;
