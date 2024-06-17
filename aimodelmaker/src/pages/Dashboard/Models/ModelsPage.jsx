import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlay } from '@fortawesome/free-solid-svg-icons';
import './ModelsPage.css'; // Assuming you create a CSS file for styles

export default function ModelsPage() {

    const models = [
        {
            name: 'Model 1',
            description: 'This is a model'
        },
        {
            name: 'Model 2',
            description: 'This is a model'
        },
        {
            name: 'Model 3',
            description: 'This is a model'
        }
    ];

    if (models.length === 0) {
        return (
            <div>No models found</div>
        )
    }

    function handlePlayClick() {
        
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
                            <button className="icon-button" onClick={handlePlayClick()}>
                                <FontAwesomeIcon icon={faPlay} />
                            </button>
                            <button className="icon-button">
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
