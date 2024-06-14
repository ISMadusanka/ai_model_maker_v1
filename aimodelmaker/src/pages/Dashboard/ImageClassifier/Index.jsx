import React, { useRef, useState } from 'react';
import { Button, Col, Container, Row, InputGroup, FormControl, Modal } from 'react-bootstrap';
import ClassCard from './ClassCard';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Index.css';
import { dataGatherLoop, initializeModel, trainImageClassifier } from '../../../services/freemodels/ImageClassifier';
import ImageClassifierPredict from '../../../components/ui/ImageClassifierPredict';

export default function ImageClassifierPage() {
  const [classes, setClasses] = useState([
    { id: 1, name: "Class 1", datacount: "0", images: [] },
    { id: 2, name: "Class 2", datacount: "0", images: [] },
  ]);
  const [newClassName, setNewClassName] = useState('');
  const [showPredictModal, setShowPredictModal] = useState(false); // State to control modal visibility
  const nodeRef = useRef(null);

  function handleAddClassClick() {
    if (newClassName.trim() !== '') {
      setClasses([...classes, {
        id: classes.length + 1,
        name: newClassName,
        datacount: "0",
        images: []
      }]);
      setNewClassName(''); // Clear the input field
    } else {
      alert('Please enter a valid class name.');
    }
  }

  function handleDeleteClassClick(id) {
    setClasses(classes.filter((classItem) => classItem.id !== id));
  }

  async function handleTrainClick() {
    console.log(classes);
    for (const classItem of classes) {
      await dataGatherLoop(classItem.images, classItem.name, classItem.id - 1);
    }
    initializeModel();
    trainImageClassifier();
  }

  function handleUpdateImages(classId, images) {
    setClasses(classes.map((classItem) =>
      classItem.id === classId ? { ...classItem, images, datacount: images.length.toString() } : classItem
    ));
  }

  return (
    <div>
      <InputGroup className="mb-3">
        <FormControl
          type="text"
          value={newClassName}
          onChange={(e) => setNewClassName(e.target.value)}
          placeholder="Enter Class Name"
        />
        <Button variant="primary" onClick={handleAddClassClick}>
          Add New Class (Category)
        </Button>
      </InputGroup>

      <Container className="mt-5">
        <Row>
          <TransitionGroup component={null}>
            {classes.map((classItem) => {
              return (
                <CSSTransition
                  key={classItem.id}
                  timeout={500}
                  classNames="fade"
                  nodeRef={nodeRef}
                >
                  <Col md={4} className="mb-4" ref={nodeRef}>
                    <ClassCard
                      classes={classes}
                      setClasses={setClasses}
                      handleDeleteClassClick={handleDeleteClassClick}
                      id={classItem.id}
                      name={classItem.name}
                      datacount={classItem.datacount}
                      images={classItem.images}
                      handleUpdateImages={handleUpdateImages}
                    />
                  </Col>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </Row>
      </Container>
      <Button variant="primary" onClick={handleTrainClick}>
        Train Model
      </Button>
        
      <Button variant="primary" onClick={() => setShowPredictModal(true)}>Predict</Button>

      <Modal show={showPredictModal} onHide={() => setShowPredictModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Predict</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ImageClassifierPredict />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPredictModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
