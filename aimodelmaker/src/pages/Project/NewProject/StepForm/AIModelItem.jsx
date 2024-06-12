import React from 'react';
import Card from 'react-bootstrap/Card';
import './MultiStepProgressBar.css'; // Import the CSS file
import { Button } from 'reactstrap';

function AIModelItem({modelId, name, description, icon,_next, handleChange}) {

    const handleSelect = (e) => {
        e.preventDefault(); // Prevent form submission
        handleChange({ target: { name: 'modelId', value: modelId } }); // Call the handleChange function
        _next(); // Call the _next function
      };

  return (
    <Card className="card">
      <Card.Body>
        <Card.Title className="card-title">{name}</Card.Title>
        <Card.Text className="card-text">
          {description}
        </Card.Text>
        <div className="card-icon">
          {icon}
        </div>

        
      </Card.Body>

      <Button color="primary float-right" onClick={handleSelect}>
          Select
        </Button>
    </Card>
  );
}

export default AIModelItem;
