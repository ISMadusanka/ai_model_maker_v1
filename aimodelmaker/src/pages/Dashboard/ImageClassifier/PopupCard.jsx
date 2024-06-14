import React, { useState, useRef } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Webcam from 'react-webcam';
import './Index.css';

export default function PopupCard({ id, name, images, handleClose, handleCaptureImages }) {
  const webcamRef = useRef(null);
  const captureIntervalRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);

  function handleStartCapture() {
    setIsCapturing(true);
    captureIntervalRef.current = setInterval(() => {
      captureImage();
    }, 200); // 2 images per second
  }

  function handleStopCapture() {
    setIsCapturing(false);
    clearInterval(captureIntervalRef.current);
  }

  function captureImage() {
    const imageSrc = webcamRef.current.getScreenshot();
    handleCaptureImages(imageSrc);
  }

  return (
    <Modal show onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Take Images for {name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="webcam-container">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcam-preview"
          />
        </div>
        <div className="d-flex justify-content-center mt-3">
          <Button onMouseDown={handleStartCapture} onMouseUp={handleStopCapture}>
            Hold to Capture
          </Button>
        </div>
        <p>Total Images: {images.length}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
