import { useState, useContext } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { getProduct } from '../api/productApi';
import { API_URL } from '../api/serverRequest';

const SECTIONS = {
    HOME_HEADER: 2,
};

const HomeImageList = ({ start, end, additionalClass }) => {
    
    const { auth } = useContext(AuthContext); 
    const userRole = auth.role;
    const navigate = useNavigate();
    
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const { data, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: getProduct
    });

    const productList = data?.length > 0 ? data : [];

    const filteredProducts = productList
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

    if (isLoading) return <p role="status"> Loading...</p>;
    if (error) return <p role="alert">An error occurred: {error.message}</p>;

    return (
        <section className={`${additionalClass || ''}`}>
            {filteredProducts.length &&
                filteredProducts.map((product) => (
                    <Link
                        key={product.id}
                        to={userRole === "admin" ? "#" : `/productDetail/${product.id}`}
                        onClick={userRole === "admin" ? () => handleAdminClick(product) : null}
                    >
                        <img
                            src={`${API_URL}assets/img/${product.path}`}
                            alt={product.name}
                            loading="lazy"
                        />
                    </Link>
                ))
                }

            {modalVisible && selectedProduct && (
                      <div
                      className="modal"
                      role="dialog"
                      aria-labelledby="modal-title"
                      aria-describedby="modal-description"
                      aria-modal="true"
                    >
                <div className="modal">
                    <div className="modal__content">
                        <h2 id="modal-title">What do you want to do?</h2>
                        <p id="modal-description">Choose an action to perform on the product.</p>
                        <button onClick={() => handleNavigate(`/productDetail/${selectedProduct.id}`)}>
                        View product details
                        </button>
                        <button onClick={() => handleNavigate(`/UpdateProduct/${selectedProduct.id}`)}>
                        Modify the product image
                        </button>
                        <button onClick={closeModal}>Cancel</button>
                    </div>
                </div>
                </div>
            )}
        </section>
    );
};

export default HomeImageList;
