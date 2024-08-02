import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlay } from '@fortawesome/free-solid-svg-icons';
import './ModelsPage.css'; // Assuming you create a CSS file for styles
import api from '../../../services/api/api';
import { useDashboard } from '../../../context/DashboardProvider';

export default function ModelsPage() {
    const { dashboardProps } = useDashboard();
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/getallmodels')
            .then(response => {
                setModels(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (models.length === 0) {
        return <div>No models found</div>;
    }

    function handlePlayClick(model) {
        console.log(`Play model: ${model.name}`);
    }

    function handleDeleteClick(model) {
        console.log(`Delete model: ${model.name}`);
    }

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
        </div>
    );
}
