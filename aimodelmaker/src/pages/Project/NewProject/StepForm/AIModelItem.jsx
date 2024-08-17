import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

function AIModelItem({ modelId, name, description, icon, _next, handleChange }) {
  const handleSelect = (e) => {
    e.preventDefault(); 
    handleChange({ target: { name: "modelId", value: modelId } }); 
    _next();
  };

  return (
    <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2">{icon}</Typography>
      </CardContent>
      <Button variant="contained" color="primary" onClick={handleSelect} sx={{ m: 2 }}>
        Select
      </Button>
    </Card>
  );
}

export default AIModelItem;
