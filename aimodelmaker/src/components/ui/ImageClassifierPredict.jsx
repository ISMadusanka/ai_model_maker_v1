import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import { predictLoop } from '../../services/freemodels/ImageClassifier';
import { ProgressBar } from 'react-bootstrap';

export default function ImageClassifierPredict({ MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH, mobilenet, model, CLASS_NAMES }) {
  const webcamRef = useRef(null);
  const [predict, setPredict] = useState(false);
  const [showCard, setShowCard] = useState(true);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    if (webcamRef.current && predict) {
      const interval = setInterval(() => {
        predictLoop(webcamRef.current.video, setPredictions);
      }, 250); // Call predictLoop every 250 milisecond

      return () => clearInterval(interval);
    }
  }, [webcamRef, predict, MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH, mobilenet, model, CLASS_NAMES]);

  const handleStartPredict = () => {
    setPredict(true);
    setShowCard(true); // Show the card when prediction starts
  };

  const handleStopPredict = () => {
    setPredict(false);
    setShowCard(false); // Hide the card when prediction stops
  };

  return (
    <div>
      {showCard && (
        <div className="card">
          <div className="card-body">
            {predictions.map((prediction, index) => (
              <div key={index}>
                <p>{prediction.className}</p>
                <ProgressBar now={prediction.value * 100} label={`${Math.floor(prediction.value * 100)}%`} />
              </div>
            ))}
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="webcam-preview"
            />
            <div className="d-flex justify-content-center mt-3">
              <button onClick={handleStartPredict}>Start Prediction</button>
              <button onClick={handleStopPredict}>Stop Prediction</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
