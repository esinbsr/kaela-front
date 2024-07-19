import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../actions/productAction';
import { API_URL } from '../actions/serverRequest';

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
                    return (
                        <div key={product.id} className={isLargeImage ? "large-image" : ""}>
                            <img
                                src={`${API_URL}assets/img/${product.path}`}
                                alt={product.name}
                            />
                        </div>
                    );
                })
            ) : (
                <p>Product not found.</p>
            )
            }
        </div>
    );
};

export default HomeImageList;