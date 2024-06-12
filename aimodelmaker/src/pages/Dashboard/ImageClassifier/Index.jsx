import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import ClassCard from './ClassCard';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Index.css';

export default function ImageClassifierPage() {

  const [classes, setClasses] = useState([
    { id: 1, name: "Class 1", datacount: "0" },
    { id: 2, name: "Class 2", datacount: "0" },
  ]);

  function handleAddClassClick() {
    setClasses([...classes, {
      id: classes.length + 1,
      name: `Class ${classes.length + 1}`,
      datacount: "0",
    }]);
  }

  function handleDeleteClassClick(id) {
    setClasses(classes.filter((classItem) => classItem.id !== id));
  }

  return (
    <div>
      <Button variant="primary" className="w-100 mb-3" onClick={handleAddClassClick}>
        Add New Class (Category)
      </Button>

      <Container className="mt-5">
        <Row>
          <TransitionGroup component={null}>
            {classes.map((classItem) => (
              <CSSTransition key={classItem.id} timeout={500} classNames="fade">
                <Col md={4} className="mb-4">
                  <ClassCard
                    handleDeleteClassClick={handleDeleteClassClick}
                    id={classItem.id}
                    name={classItem.name}
                    datacount={classItem.datacount}
                  />
                </Col>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </Row>
      </Container>
    </div>
  )
}
