import React from "react";
import { Grid, Typography } from "@mui/material";
import AIModelItem from "./AIModelItem";

const Step2 = (props) => {
  if (props.currentStep !== 2) {
    return null;
  }

  const models = [
    { id: 1, name: "StudentReg", description: "studentreg-2d9e9", icon: "📚" },
    { id: 2, name: "Ambasewana", description: "ambasewana-a6fa5", icon: "🎓" }
  ];

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Choose a model
      </Typography>
      <Grid container spacing={2}>
        {models.map((model) => (
          <Grid item xs={12} sm={6} key={model.id}>
            <AIModelItem
              handleChange={props.handleChange}
              _next={props._next}
              modelId={model.id}
              name={model.name}
              description={model.description}
              icon={model.icon}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Step2;
