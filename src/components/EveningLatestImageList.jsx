import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../actions/productAction";
import { API_URL } from "../actions/serverRequest";
import { Link } from "react-router-dom";
import { isEmpty } from './utils/isEmpty'; // Utility function to check if an array is empty

const EveningLatestImageList = ({ start, end, additionalClass, section }) => {
    const dispatch = useDispatch(); // Hook to dispatch Redux actions
    const products = useSelector((state) => state.product.products); // Selector to access products from the Redux store
    const [loading, setLoading] = useState(true); // Local state to manage loading

    useEffect(() => {
        // Dispatch action to get products and update loading state
        dispatch(getProduct()).then(() => setLoading(false));
    }, [dispatch]);

    // Display a loading message while the products are being loaded
    if (loading) return <p>Loading...</p>;

    // Filter products by section and slice according to the start and end parameters
    const filteredProducts = !isEmpty(products)
    ? products
        .filter((product) => product.section_id === section)
        .slice(start, end)
    : [];

    return (
        <div className={`${additionalClass || ''}`}>
            {filteredProducts.length > 0 ? (
                // Map the filtered products to display them
                filteredProducts.map((product, index) => {
                    const isTopImage = index === 0 || index === 2; // Identify the images in these indexes to add style to them later
                    const topImage = `${isTopImage ? 'top-image' : ''}`; // Conditional CSS class

                    return (
                        <div key={product.id}>
                            {/* Link to the product detail page */}
                             <Link to={`/productDetail/${product.id}`}>
                                <img src={`${API_URL}assets/img/${product.path}`} alt={product.name} className={`${topImage}`} />
                             </Link>
                        </div>
                    );
                })
            ) : (
                // Message displayed if no products are found
                <p role="alert" aria-live="assertive">No products found for this section.</p>
            )}
        </div>
    );
};

export default EveningLatestImageList;
