import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../actions/productAction';
import Navigation from '../components/Navigation';

const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    return (
        <div>
            <Navigation />
            <h1>KAELA COUTURE</h1>
            <div className="product-list">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} className="product-item">
                            <img
                                src={`http://localhost:8888/travail-perso/kaela-couture/assets/img/${product.path}`}
                                alt={product.name}
                        
                            />
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
};

export default Home;
