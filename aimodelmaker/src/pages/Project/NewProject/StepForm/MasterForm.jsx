import React, { Component } from "react";
import {
  Form,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardFooter
} from "reactstrap";

import MultiStepProgressBar from "./MultiStepProgressBar";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import api from '../../../../services/api/api';

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

  handleSubmit = event => {
    event.preventDefault();
    const { name, modelId, password } = this.state;
    alert(`Your registration detail: \n 
      Name: ${name} \n 
      modelId: ${modelId} \n
      Password: ${password}`);

      api.post('/addproject', {
        name,
        modelId
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
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

  get previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <Button color="secondary float-left" onClick={this._prev}>
          Previous
        </Button>
      );
    }
    return null;
  }

  get nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep < 3) {
      return (
        <Button color="primary float-right" onClick={this._next}>
          Next
        </Button>
      );
    }
    return null;
  }

  get submitButton() {
    let currentStep = this.state.currentStep;
    if (currentStep === 3) {
      return <Button color="primary float-right">Submit</Button>;
    }
    return null;
  }

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Card>
            <CardHeader>Create an Account</CardHeader>
            <CardBody>
              <CardTitle>
                <MultiStepProgressBar currentStep={this.state.currentStep} />
              </CardTitle>
              <CardText />
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
                state = {this.state}
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                password={this.state.password}
              />
            </CardBody>
            <CardFooter>
              {this.previousButton}
              {this.nextButton}
              {this.submitButton}
            </CardFooter>
          </Card>
        </Form>
      </>
    );
  }
}

export default MasterForm;
