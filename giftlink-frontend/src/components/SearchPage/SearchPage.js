import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { urlConfig } from '../../config';

function SearchPage() {
    // Task 1: Define state variables for the search query, age range, and search results.
    const categories = ['Living', 'Bedroom', 'Bathroom', 'Kitchen', 'Office'];
    const conditions = ['New', 'Like New', 'Older'];

    const [searchQuery, setSearchQuery] = useState('');
    const [ageRange, setAgeRange] = useState([0, 100]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCondition, setSelectedCondition] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        // fetch all products
        const fetchProducts = async () => {
            try {
                let url = `${urlConfig.backendUrl}/api/gifts`
                console.log(url)
                const response = await fetch(url);
                if (!response.ok) {
                    //something went wrong
                    throw new Error(`HTTP error; ${response.status}`)
                }
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.log('Fetch error: ' + error.message);
            }
        };

        fetchProducts();
    }, []);


    // Task 2. Fetch search results from the API based on user inputs.

    const navigate = useNavigate();

    const fetchFilteredResults = async () => {
        try {
            let url = `${urlConfig.backendUrl}/api/gifts?query=${searchQuery}&minAge=${ageRange[0]}&maxAge=${ageRange[1]}&category=${selectedCategory}&condition=${selectedCondition}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error; ${response.status}`);
            }
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.log('Fetch error: ' + error.message);
        }
    };

    const goToDetailsPage = (productId) => {
        // Task 6. Enable navigation to the details page of a selected gift.
        navigate(`/gift-details/${productId}`);
    };

    const handleSearch = () => {
        // Trigger the search based on user inputs
        fetchFilteredResults();
    };

    const handleCategoryChange = (event) => {
        // Update the selected category
        setSelectedCategory(event.target.value);
    };

    const handleConditionChange = (event) => {
        // Update the selected condition
        setSelectedCondition(event.target.value);
    };

    const handleAgeRangeChange = (event) => {
        // Update the age range
        const [minAge, maxAge] = event.target.value.split('-').map(Number);
        setAgeRange([minAge, maxAge]);
    };

    const handleSearchQueryChange = (event) => {
        // Update the search query
        setSearchQuery(event.target.value);
    };



    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="filter-section mb-3 p-3 border rounded">
                        <h5>Filters</h5>
                        <div className="d-flex flex-column">
                            {/* Task 3: Dynamically generate category and condition dropdown options. */}
                            <label htmlFor="category">Category:</label>
                            <select
                                id="category"
                                className="form-select mb-2"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                            >
                                <option value="">All Categories</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>

                            <label htmlFor="condition">Condition:</label>
                            <select
                                id="condition"
                                className="form-select mb-2"
                                value={selectedCondition}
                                onChange={handleConditionChange}
                            >
                                <option value="">All Conditions</option>
                                {conditions.map((condition, index) => (
                                    <option key={index} value={condition}>
                                        {condition}
                                    </option>
                                ))}
                            </select>

                            {/* Task 4: Implement an age range slider and display the selected value. */}
                            <label htmlFor="ageRange">Age Range:</label>
                            <input
                                id="ageRange"
                                type="range"
                                className="form-range"
                                min="0"
                                max="100"
                                step="1"
                                value={ageRange[1]}
                                onChange={(event) =>
                                    handleAgeRangeChange({
                                        target: { value: `0-${event.target.value}` },
                                    })
                                }
                            />
                            <div className="text-muted">
                                Selected Age Range: {ageRange[0]} - {ageRange[1]}
                            </div>
                        </div>
                    </div>

                    {/* Task 7: Add text input field for search criteria */}
                    <div className="mb-3">
                        <label htmlFor="searchQuery" className="form-label">
                            Search:
                        </label>
                        <input
                            id="searchQuery"
                            type="text"
                            className="form-control"
                            value={searchQuery}
                            onChange={handleSearchQueryChange}
                        />
                    </div>

                    {/* Task 8: Implement search button with onClick event to trigger search */}
                    <button
                        className="btn btn-primary w-100 mb-3"
                        onClick={handleSearch}
                    >
                        Search
                    </button>

                    {/* Task 5: Display search results and handle empty results with a message */}
                    <div className="results-section">
                        {searchResults.length > 0 ? (
                            <ul className="list-group">
                                {searchResults.map((result) => (
                                    <li
                                        key={result.id}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                        onClick={() => goToDetailsPage(result.id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {result.name}
                                        <span className="badge bg-secondary">
                                            {result.category}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center text-muted">
                                No results found. Try adjusting your filters.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
