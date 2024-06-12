import React from 'react';
import Card from 'react-bootstrap/Card';
import './Index.css'; 

function ProjectItemCard({projectID, name, description, icon}) {
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
    </Card>
  );
}

export default ProjectItemCard;
