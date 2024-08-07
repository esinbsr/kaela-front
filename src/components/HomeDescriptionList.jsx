import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInformation } from '../actions/informationAction';
import { Link } from 'react-router-dom';
import { isEmpty } from './utils/isEmpty';

const HomeDescriptionList = () => {
    const dispatch = useDispatch(); // Hook to dispatch Redux actions
    const description = useSelector((state) => state.information.information); // Selects the information from the Redux store
    const error = useSelector((state) => state.information.error); // Selects the error state from the Redux store

    useEffect(() => {
        dispatch(getInformation()); // Dispatch action to fetch information
    }, [dispatch]);

    return (
        <div className='home__description'>
            {error ? (
                // Displays an error message if there is an error fetching the information
                <p role="alert" aria-live="assertive">Error loading description: {error}</p>
            ) : !isEmpty(description) ? (
                // If the description is not empty, display the first item
                description.slice(0, 1).map((desc) => (
                    <div key={desc.id}>
                        <p id="description">{desc.description}</p>
                           {/* Adds aria-labelledby for better accessibility : */}
                        <Link to="/aboutMe" aria-labelledby="description">About me</Link> 
                     
                    </div>
                ))
            ) : (
                // Displays a message if no description is found
                <p role="alert" aria-live="assertive">Description not found.</p>
            )}
        </div>
    );
};

export default HomeDescriptionList;
