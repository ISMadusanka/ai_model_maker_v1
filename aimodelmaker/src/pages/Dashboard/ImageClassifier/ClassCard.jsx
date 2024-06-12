import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './Index.css';

export default function ClassCard({ id, name, datacount, handleDeleteClassClick }) {

  function handleDeleteClick() {
    handleDeleteClassClick(id);
  }

  return (
    <div>
      <Card className="card">
        <Card.Body>
          <Card.Title className="card-title">{name}</Card.Title>
          <Card.Text className="card-text">
            {datacount}
          </Card.Text>
        </Card.Body>
        <Button> Take Images for {name} </Button>
        <p>or</p>
        <Button> Upload Images for {name} </Button>
        <br />
        <Button onClick={handleDeleteClick}> Delete {name} </Button>
      </Card>
    </div>
  );
}
