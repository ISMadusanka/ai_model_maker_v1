import React from "react";
import { FormGroup, Label, Input, Row, Container, Col } from "reactstrap";

import { Link } from "react-router-dom";
import AIModelItem from "./AIModelItem";

const Step2 = props => {
  if (props.currentStep !== 2) {
    return null;
  }

  const models = [
    {   
      id: 1,
      name: "StudentReg",
      description: "studentreg-2d9e9",
      icon: 'i'
    },
    {   
      id: 2,
      name: "Ambasewana",
      description: "ambasewana-a6fa5",
      icon: 'i'
    }
   
  ];

  return (
    <>
      <h1>Choose a model</h1>
      <FormGroup>
        <Input
          type="text"
          name="modelId"
          // id="modelId"
          // placeholder="Search models"
          // value={props.modelId} // Prop: The username input data
          // onChange={props.handleChange} // Prop: Puts data into the state
        />
      </FormGroup>

      <Container className="mt-5">

      <Row>
      {models.map((model) => (
          <Col md={4} className="mb-4" key={model.id}>
            
            <AIModelItem
              handleChange={props.handleChange}
              _next={props._next}
              modelId={model.id}
              name={model.name}
              description={model.description}
              icon={model.icon}
            />
           
          </Col>
        ))}
      </Row>

      </Container>

    </>
  );
};

export default Step2;
