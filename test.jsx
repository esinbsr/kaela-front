// images 
import { useImages } from '../../context/ImageContext';
import { Link } from 'react-router-dom';


const ImageGallery = ({ start, end, applyStyles = true }) => {


    return (
        <div className={applyStyles ? 'home' : ''}>
            {images.length > 0 ? (
                images.slice(start, end).map((image, index) => (
                    <Link to={`/adminModifyProduct/${image.id}`} key={image.id} className={applyStyles && index === 1 ? 'large-image' : ''}>
                        <img
                            src={`http://localhost/travail-perso/kaela-couture/assets/img/${image.path}`}
                            alt={image.name}
                        />
                    </Link>
                ))
            ) : (
                <p>{errorMessage ? errorMessage : "Loading images..."}</p>
            )}
        </div>
    );
};

export default ImageGallery;






// description


import { useEffect, useState } from 'react';
import axios from 'axios';

const Description = () => {
    const [description, setDescription] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchDescription();
    }, []);

    const fetchDescription = async () => {
        try {
            const response = await axios.get(
                "http://localhost/travail-perso/kaela-couture/adminInformation"
            );
            if (response.data.success && response.data.information.length > 0) {
                setDescription(response.data.information[0].description);
            } else {
                setErrorMessage("Failed to load description");
            }
        } catch (error) {
            console.error("Error fetching description:", error);
            setErrorMessage("Error fetching description");
        }
    };

    return (
        <div>
            {description ? (
                <p>{description}</p>
            ) : (
                <p>{errorMessage ? errorMessage : "Loading description..."}</p>
            )}
        </div>
    );
};

export default Description;
