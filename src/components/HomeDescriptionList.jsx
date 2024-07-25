import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInformation } from '../actions/informationAction';
import { Link } from 'react-router-dom';

const HomeDescriptionList = () => {
    const dispatch = useDispatch();
    const description = useSelector((state) => state.information.information);

    useEffect(() => {
        dispatch(getInformation());
    }, [dispatch]);

    return (
        <div className='home__description'>
            {
            description && description.length > 0 ? (
                description.slice(0, 1)
                .map((desc) => (
                    <div key={desc.id}>
                    <p>{desc.description}</p>
                    <Link to="/aboutMe">About me</Link>
                    </div>
                    
                ))
            ) : (
                <p>Description not found.</p>
            )}
        </div>
    );
};

export default HomeDescriptionList;
