import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlay } from '@fortawesome/free-solid-svg-icons';
import './ModelsPage.css'; // Assuming you create a CSS file for styles
import api from '../../../services/api/api';
import { useDashboard } from '../../../context/DashboardProvider';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ImageClassifierPredict from '../../../components/ui/ImageClassifierPredict';
import * as tf from '@tensorflow/tfjs';
import { loadImageClassifierModel } from '../../../services/freemodels/ImageClassifier';

export default function ModelsPage() {
    const { dashboardProps } = useDashboard();
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modelLoading, setModelLoading] = useState(false); // State to manage loading bar
    const [selectedModel, setSelectedModel] = useState(null);
    const [loadedModel, setLoadedModel] = useState(null); // State to store the loaded model
    const [prediction, setPrediction] = useState(null);
    const [showPredictModal, setShowPredictModal] = useState(false);
    const [classLabels, setClassLabels] = useState([]); // State to store class labels

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await api.get('/getallmodels');
                setModels(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchModels();
    }, []);

    useEffect(() => {
        const loadAndPredict = async () => {
            if (selectedModel) {
                console.log(`Loading model: ${selectedModel.name}`);
                const model = await loadModel(selectedModel);
                setLoadedModel(model); // Set the loaded model in the state
               //setClassLabels (selectedModel.classLabels); // Set the class labels
                if (model) {
                    const result = await makePrediction(model);
                    setPrediction(result);
                }
            }
        };

        loadAndPredict();
    }, [selectedModel]);

    const loadModel = async (model) => {
        try {
            console.log(model);
            setModelLoading(true); // Set model loading to true
            await loadImageClassifierModel();
            const modelJsonString = model.file; // Assuming model.file is a JSON string
            setClassLabels(model.classLabels); // Set the class labels
            console.log(`Loading model JSON string: ${modelJsonString}`);
    
            const modelJson = JSON.parse(modelJsonString); // Parse the JSON string
    
            // Check if modelJson has the expected structure
            if (!modelJson || !modelJson.class_name || !modelJson.config) {
                throw new Error('Invalid model JSON structure');
            }
    
            const loadedModel = await tf.models.modelFromJSON(modelJson);
            console.log(`Model loaded: ${model.name}`);
            return loadedModel;
        } catch (error) {
            console.error(`Error loading model: ${model.name}`, error);
            return null;
        } finally {
            setModelLoading(false); // Set model loading to false
        }
    };

    const makePrediction = async (model) => {
        if (!model) {
            return 'Error: Model not loaded';
        }
        console.log(`Making prediction with model: ${model.name}`);
        const dummyPrediction = 'Prediction result'; // Replace with actual prediction logic
        return dummyPrediction;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (models.length === 0) {
        return <div>No models found</div>;
    }

    const handlePlayClick = async (model) => {
        setModelLoading(true); // Show loading bar when loading starts
        setSelectedModel(model);
        setShowPredictModal(true);
    };

    const handleDeleteClick = (model) => {
        console.log(`Delete model: ${model.name}`);
    };

    return (
        <div>
            <h1>All Models</h1>
            <div className="models-list">
                {models.map((model, index) => (
                    <div key={index} className="model-card">
                        <div className="model-details">
                            <h3>{model.name}</h3>
                            <p>{model.description}</p>
                        </div>
                        <div className="model-actions">
                            <button className="icon-button" onClick={() => handlePlayClick(model)}>
                                <FontAwesomeIcon icon={faPlay} />
                            </button>
                            <button className="icon-button" onClick={() => handleDeleteClick(model)}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {modelLoading && <div>Loading model...</div>}
            {selectedModel && (
                <Modal show={showPredictModal} onHide={() => setShowPredictModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Predict</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ImageClassifierPredict model={loadedModel} CLASS_NAMES={classLabels} /> {/* Pass the loaded model and class labels */}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowPredictModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}
