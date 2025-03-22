import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {urlConfig} from '../../config';

function MainPage() {
    const [gifts, setGifts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Task 1: Write async fetch operation
        const fetchGifts = async () => {
            try {
                const response = await fetch(`${urlConfig.apiBaseUrl}/gifts`);
                if (response.ok) {
                    const data = await response.json();
                    setGifts(data);
                } else {
                    console.error('Failed to fetch gifts');
                }
            } catch (error) {
                console.error('Error fetching gifts:', error);
            }
        };

        fetchGifts();
    }, []);

    // Task 2: Navigate to details page
    const goToDetailsPage = (productId) => {
        navigate(`/details/${productId}`);
    };

    // Task 3: Format timestamp
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getConditionClass = (condition) => {
        return condition === "New" ? "list-group-item-success" : "list-group-item-warning";
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {gifts.map((gift) => (
                    <div key={gift.id} className="col-md-4 mb-4">
                        <div className="card product-card">
                            {/* Task 4: Display gift image or placeholder */}
                            <img
                                src={gift.imageUrl || 'https://via.placeholder.com/150'}
                                alt={gift.name}
                                className="card-img-top"
                            />

                            <div className="card-body">
                                <h5 className="card-title">{gift.name}</h5>
                                <p className="card-text">{gift.description}</p>

                                {/* Task 5: Display formatted date */}
                                <p className="card-text">
                                    <small className="text-muted">
                                        Added on: {formatDate(gift.timestamp)}
                                    </small>
                                </p>

                                <p className={`card-text ${getConditionClass(gift.condition)}`}>
                                    {gift.condition}
                                </p>

                                {/* Task 6: Display price */}
                                <p className="card-text">
                                    <strong>Price:</strong> ${gift.price.toFixed(2)}
                                </p>

                                <button onClick={() => goToDetailsPage(gift.id)} className="btn btn-primary">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MainPage;
