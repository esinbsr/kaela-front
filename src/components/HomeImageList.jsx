import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../actions/productAction';
import { API_URL } from '../actions/serverRequest';
import { Link } from 'react-router-dom';

const SECTIONS = {
    HOME_HEADER: 2,
};

const HomeImageList = ({ start, end, additionalClass }) => {

    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
    const error = useSelector((state) => state.product.error);

    useEffect(() => {
        dispatch(getProduct()); //envoie une action au reducer
    }, [dispatch]);

    if (error) {
        return <p>Error loading products: {error}</p>;
    }

    if (!products) {
        return <p>Loading...</p>;
    }

    const filteredProducts = 
    products.length > 0 ? 
    products
    .filter((product) => product.section_id === SECTIONS.HOME_HEADER)
    .slice(start, end) : [];

    return (
        <div className={`${additionalClass || ''}`}>
            {filteredProducts.length > 0 ? (
                filteredProducts
                .map((product, index) => {
                    const isLargeImage = index === 1;
                    return (
                        <div key={product.id} className={isLargeImage ? "large-image" : ""}>
                            <Link to={`/productDetail/${product.id}`}>
                            <img
                                src={`${API_URL}assets/img/${product.path}`}
                                alt={product.name}
                            />
                            </Link>
                        </div>
                    );
                })
            ) : (
                <p>No products found for the home header.</p>
            )}
        </div>
    );
};

export default HomeImageList;
