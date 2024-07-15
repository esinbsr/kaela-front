import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../../actions/productAction';
import { API_URL } from '../../../actions/informationAction';

const ProductImageList = ({ start, end, additionalClass }) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    return (
        <div className={`home__img ${additionalClass || ''}`}>
            {products && products.length > 0 ? (
                products.slice(start, end).map((product, index) => {
                    const globalIndex = start + index;
                    const isLargeImage = globalIndex === 1; // Vérifie si c'est la deuxième image globale
                    const showDescription = globalIndex >= 3; // Afficher pour la 4ème et 5ème image (indices 3 et 4)
                    const buttonText = globalIndex === 3 ? "Discover" : "Explore";

                    return (
                        <div key={product.id} className={isLargeImage ? "large-image" : ""}>
                            <img
                                src={`${API_URL}assets/img/${product.path}`}
                                alt={product.name}
                            />
                            {showDescription && (
                                <div className="product-info">
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                    <a href="#">{buttonText}</a>
                                </div>
                            )}
                        </div>
                    );
                })
            ) : (
                <p>Product not found.</p>
            )}
        </div>
    );
};

export default ProductImageList;
