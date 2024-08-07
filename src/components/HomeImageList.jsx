import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../actions/productAction';
import { API_URL } from '../actions/serverRequest';
import { Link } from 'react-router-dom';
import { isEmpty } from './utils/isEmpty';

const SECTIONS = {
    HOME_HEADER: 2, // Constant for the home header section ID
};

const HomeImageList = ({ start, end, additionalClass }) => {
    const dispatch = useDispatch(); // Hook to dispatch Redux actions
    const products = useSelector((state) => state.product.products); // Select products from the Redux store
    const error = useSelector((state) => state.product.error); // Select error state from the Redux store

    useEffect(() => {
        dispatch(getProduct()); // Dispatch action to fetch products
    }, [dispatch]);

    if (error) {
        return <p>Error loading products: {error}</p>; // Display error message if there is an error
    }

    if (isEmpty(products)) {
        return <p>Loading...</p>; // Display loading message if products are not available yet
    }

    // Filter products by section ID and slice them according to start and end indices
    const filteredProducts = 
        products.length > 0 ? 
        products.filter((product) => product.section_id === SECTIONS.HOME_HEADER).slice(start, end) : [];

    return (
        <div className={`${additionalClass || ''}`}>
            {!isEmpty(filteredProducts) ? (
                filteredProducts.map((product, index) => {
                    const isLargeImage = index === 1; // Make the second image larger
                    return (
                        <div key={product.id} className={isLargeImage ? "large-image" : ""}>
                            <Link to={`/productDetail/${product.id}`}>
                                <img
                                    src={`${API_URL}assets/img/${product.path}`}
                                    alt={product.name}
                                    loading="lazy" // Adds lazy loading for better performance
                                />
                            </Link>
                        </div>
                    );
                })
            ) : (
                <p>No products found for the home header.</p> // Display message if no products are found
            )}
        </div>
    );
};

export default HomeImageList;
