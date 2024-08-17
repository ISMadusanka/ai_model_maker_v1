import React, { Component } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Stepper,
  Step,
  StepLabel
} from "@mui/material";
import MultiStepProgressBar from "./MultiStepProgressBar";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import api from "../../../../services/api/api";

class MasterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 1,
      name: "",
      modelId: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, modelId } = this.state;

    if (!name || !modelId) {
      console.error("Name and modelId are required.");
      return;
    }

    try {
      const response = await api.post("/addproject", { name, modelId });
      console.log("Project added successfully:", response.data);
      window.location.href = "/projects/allprojects";
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error in request setup:", error.message);
      }
    }
  };

  _next() {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 3 ? 3 : currentStep + 1;
    this.setState({
      currentStep: currentStep
    });
  }

  _prev() {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep
    });
  }

  render() {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Card variant="outlined" sx={{ p: 2 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Create an Account
          </Typography>
          <Stepper activeStep={this.state.currentStep - 1} alternativeLabel>
            <Step><StepLabel /></Step>
            <Step><StepLabel /></Step>
            <Step><StepLabel /></Step>
          </Stepper>
          <CardContent>
            <form onSubmit={this.handleSubmit}>
              <Step1
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                name={this.state.name}
              />
              <Step2
                _next={this._next}
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                modelId={this.state.modelId}
              />
              <Step3
                state={this.state}
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                password={this.state.password}
              />
              <div>
                {this.state.currentStep > 1 && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={this._prev}
                    sx={{ mt: 2, mr: 2 }}
                  >
                    Previous
                  </Button>
                )}
                {this.state.currentStep < 3 && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this._next}
                    sx={{ mt: 2 }}
                  >
                    Next
                  </Button>
                )}
                {this.state.currentStep === 3 && (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ mt: 2 }}
                  >
                    Submit
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </Container>
    );
  }
}

export default MasterForm;
