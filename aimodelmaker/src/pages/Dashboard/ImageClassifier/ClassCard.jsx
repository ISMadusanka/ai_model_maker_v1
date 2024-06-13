import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import PopupCard from './PopupCard';
import './Index.css';

export default function ClassCard({ id, name, datacount, handleDeleteClassClick, classes, setClasses }) {
  const [images, setImages] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  function handleDeleteClick() {
    handleDeleteClassClick(id);
  }

  function handleImageUpload(event) {
    const files = event.target.files;
    setImages([...images, ...Array.from(files)]);

    
  }

  function handleCaptureImages(imageSrc) {
    setImages((prevImages) => [...prevImages, imageSrc]);

    
  }

  function updateParentClasses() {
    setClasses(classes.map((classItem) => 
      classItem.id === id ? { ...classItem, images, datacount: images.length.toString() } : classItem
    ));
  }

  useEffect(() => {
    updateParentClasses();
  }, [images]);

  return (
    <div className="class-card">
      <Card className="card">
        <div className="card-header">
          <Card.Title className="card-title">
            {name} 
          </Card.Title>
          <Button className="delete-button" onClick={handleDeleteClick}>
            &times;
          </Button>
        </div>
        <Card.Body>
          <Card.Text className="card-text">
            {images.length} Image Samples
          </Card.Text>
          <div className="image-preview-container">
            {images.map((img, index) => (
              <img key={index} src={typeof img === 'string' ? img : URL.createObjectURL(img)} alt="preview" className="image-preview" />
            ))}
          </div>
          <div className="button-group">
            <Button variant="primary" onClick={() => setShowPopup(true)}>
              Webcam
            </Button>
            <Button variant="secondary" as="label">
              Upload
              <input type="file" multiple onChange={handleImageUpload} style={{ display: 'none' }} />
            </Button>
          </div>
        </Card.Body>
      </Card>
      {showPopup && (
        <PopupCard
          id={id}
          name={name}
          images={images}
          handleClose={() => setShowPopup(false)}
          handleCaptureImages={handleCaptureImages}
        />
      )}
    </div>
  );
}
