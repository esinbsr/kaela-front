import { useState, useContext } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import HomeHeaderImageCard from './HomeHeaderImageCard';
import { AuthContext } from '../context/AuthContext';
import { getProduct } from '../api/productApi';

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
        queryFn:  getProduct
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

    if (isLoading) return "Loading...";
    if (error) return "An error occurred: " + error.message;

    return (
        <div className={`${additionalClass || ''}`}>
            {filteredProducts ? (
                filteredProducts.map((product) => (
                    <HomeHeaderImageCard
                        key={product.id}
                        product={product}
                        userRole={userRole}
                        onAdminClick={handleAdminClick}
                    />
                ))
            ) : (
                <p>Aucun produit trouvé pour l&apos;en-tête d&apos;accueil.</p>
            )}

            {modalVisible && (
                <div className="modal">
                    <div className="modal__content">
                        <h2>Que souhaitez-vous faire ?</h2>
                        <button onClick={() => handleNavigate(`/productDetail/${selectedProduct.id}`)}>
                            Voir les détails du produit
                        </button>
                        <button onClick={() => handleNavigate(`/UpdateProduct/${selectedProduct.id}`)}>
                            Modifier l&apos;image du produit
                        </button>
                        <button onClick={closeModal}>Annuler</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomeImageList;
