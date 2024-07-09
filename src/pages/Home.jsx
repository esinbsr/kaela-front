import { useEffect, useState } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';

const Home = () => {
    const [images, setImages] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [timestamp, setTimestamp] = useState(Date.now());

    useEffect(() => {
        fetchImages();
        const interval = setInterval(() => {
            setTimestamp(Date.now());
        }, 5000); 

        return () => clearInterval(interval); 
    }, []);

    const fetchImages = async () => {
        try {
            const response = await axios.get(
                "http://localhost/travail-perso/kaela-couture/productDisplay"
            );
            if (response.data.success) {
                setImages(response.data.products);
            } else {
                setErrorMessage("Failed to load images");
            }
        } catch (error) {
            console.error("Error fetching images:", error);
            setErrorMessage("Error fetching images");
        }
    };

    return (
        <div>
            <Navigation />
            <h1>KAELA COUTURE</h1>
            <div className="home">
                {images.length > 0 ? (
                    images
                    .slice(0,3)
                    .map((image, index) => (
                        <div key={image.id} className={`image-item ${index === 1 ? 'large-image' : ''}`}>
                            <div>
                                <img
                                    src={`http://localhost/travail-perso/kaela-couture/assets/img/${image.path}?t=${timestamp}`}
                                    alt={image.name}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>{errorMessage ? errorMessage : "Loading images..."}</p>
                )}
            </div>
        </div>
    );
};

export default Home;
