import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../../actions/productAction';
import { API_URL } from '../../../actions/informationAction';

const HomeImageList = ({ start, end, additionalClass }) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    return (
        <div className={`${additionalClass || ''}`}>
            {products && products.length > 0 ? (
                products
                .slice(start, end)
                .map((product, index) => {
                    const globalIndex = start + index;
                    const isLargeImage = globalIndex === 1; 
                    const showDescription = globalIndex >= 3 && globalIndex <= 4 ; 
                    const buttonText = globalIndex === 3 ? "Discover" : globalIndex === 4 ? "Explore" : ""; 
                    const title = globalIndex === 3 ? "Latest collection" : globalIndex === 4 ?  "Evening dresses" : "";
                    const p = globalIndex === 3 ? "Explore the newest trends with our latest arrivals." : globalIndex === 4 ? "Distinguish yourself with our sensational evening gowns." : "";
    
                    return (
                        <div key={product.id} className={isLargeImage ? "large-image" : ""}>
                            <img
                                src={`${API_URL}assets/img/${product.path}`}
                                alt={product.name}
                            />
                            {showDescription && (
                                <div className="product-info">
                                    <h3>{title}</h3>
                                    <p>{p}</p>
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

export default HomeImageList;