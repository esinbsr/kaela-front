// HomeImageList.js
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../actions/productAction';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from './utils/isEmpty';
import HomeHeaderImageCard from './HomeHeaderImageCard';

const SECTIONS = {
    HOME_HEADER: 2, // Constant pour l'ID de la section du header de la page d'accueil
};

const HomeImageList = ({ start, end, additionalClass }) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
    const userRole = useSelector((state) => state.user.role);

    const navigate = useNavigate();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    if (isEmpty(products)) {
        return <p>Loading products...</p>;
    }

    const filteredProducts = products
        .filter((product) => product.section_id === SECTIONS.HOME_HEADER)
        .slice(start, end);

    const handleAdminClick = (product) => {
        setSelectedProduct(product);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedProduct(null);
    };

    const handleNavigate = (path) => {
        navigate(path);
        closeModal();
    };

    return (
        <div className={`${additionalClass || ''}`}>
            {!isEmpty(filteredProducts) ? (
                filteredProducts.map((product, index) => (
                    <HomeHeaderImageCard
                        key={product.id}
                        product={product}
                        isLargeImage={index === 1}
                        userRole={userRole}
                        onAdminClick={handleAdminClick}
                    />
                ))
            ) : (
                <p>No products found for the home header.</p>
            )}

            {modalVisible && (
                <div className="modal">
                    <div className="modal__content">
                        <h2>What do you want to do?</h2>
                        <button onClick={() => handleNavigate(`/productDetail/${selectedProduct.id}`)}>
                            View Product Details
                        </button>
                        <button onClick={() => handleNavigate(`/adminUpdateProduct/${selectedProduct.id}`)}>
                            Edit Product Image
                        </button>
                        <button onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomeImageList;
