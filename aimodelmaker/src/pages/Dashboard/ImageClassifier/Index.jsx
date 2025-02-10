import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Row, InputGroup, FormControl, Modal, Spinner } from 'react-bootstrap';
import ClassCard from './ClassCard';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Index.css';
import { dataGatherLoop, initializeModel, loadImageClassifierModel, loadModelFromLocalStorage, saveModelToLocalStorage, trainImageClassifier } from '../../../services/freemodels/ImageClassifier';
import ImageClassifierPredict from '../../../components/ui/ImageClassifierPredict';
import { useNavigation, useParams } from 'react-router-dom';
import LoadingBar from '../../../components/ui/LoadingBar';
import { useDashboard } from '../../../context/DashboardProvider';

//loader
var mobilenet = null;
export async function ImageClassifierPageLoader(){
  return await loadImageClassifierModel();
  
}

export default function ImageClassifierPage() {
  const navigation = useNavigation();
  const [classes, setClasses] = useState([
    { id: 1, name: "Class 1", datacount: "0", images: [] },
    { id: 2, name: "Class 2", datacount: "0", images: [] },
  ]);
  const [newClassName, setNewClassName] = useState('');
  const [showPredictModal, setShowPredictModal] = useState(false);
  const [showLoadingBarModal, setShowLoadingBarModal] = useState(false); // State to control loading bar modal visibility
  const [isLoading, setIsLoading] = useState(true); // State to manage loading indicator
  const nodeRef = useRef(null);
  const [trainProgress, setTrainProgress] = useState(0);
  const { dashboardProps, setDashboardProps } = useDashboard();
  // const { projectID } = dashboardProps;
  // console.log(projectID);
  let projectID = sessionStorage.getItem("projectID")||null;
  useEffect(() => {
    async function loadModel() {
      mobilenet = await loadImageClassifierModel();
      setIsLoading(false);
    }
    loadModel();
  }, []);

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
    setShowLoadingBarModal(true); // Show the loading bar modal
    for (const classItem of classes) {
      await dataGatherLoop(mobilenet,classItem.images, classItem.name, classItem.id - 1);
    }
    initializeModel();
    trainImageClassifier({projectId:projectID,modelName:"model name", setProgress: (progress) => {
      setTrainProgress(progress);
      if (progress >= 9) {
        setShowLoadingBarModal(false); // Hide the loading bar modal when progress reaches 9
      }
    }});

    saveModelToLocalStorage( );
  }

  function handleUpdateImages(classId, images) {
    setClasses(classes.map((classItem) =>
      classItem.id === classId ? { ...classItem, images, datacount: images.length.toString() } : classItem
    ));
  }

 async function hc(){
    await loadModelFromLocalStorage();
  }

  return (
    <div>
      {isLoading ? (
        <div className="loading-container">
          <Spinner animation="border" role="status">
            <span className="sr-only"></span>
          </Spinner>
        </div>
      ) : (
        <>
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
          <Button
  variant="primary"
  onClick={handleTrainClick}
  style={{ marginRight: "10px", minWidth: "120px", height: "40px" }}
>
  Train Model
</Button>

<Button
  variant="primary"
  onClick={() => setShowPredictModal(true)}
  style={{ marginRight: "10px", minWidth: "120px", height: "40px" }}
>
  Predict
</Button>

<Button
  onClick={hc}
  style={{ minWidth: "120px", height: "40px" }}
>
  Load
</Button>


          <Modal show={showPredictModal} onHide={() => setShowPredictModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Predict</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ImageClassifierPredict mobnet={mobilenet} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowPredictModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showLoadingBarModal} centered>
            <Modal.Header>
              <Modal.Title>Training Model</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <LoadingBar progress={(trainProgress + 1) / 10} />
            </Modal.Body>
          </Modal>
        </>
      )}
    </div>
  );
}
