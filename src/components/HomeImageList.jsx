import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../actions/productAction';
import { API_URL } from '../actions/serverRequest';
import { Link, useNavigate } from 'react-router-dom';
import { isEmpty } from './utils/isEmpty';

const SECTIONS = {
    HOME_HEADER: 2, // Constant pour l'ID de la section du header de la page d'accueil
};

const HomeImageList = ({ start, end, additionalClass }) => {
    const dispatch = useDispatch(); // Hook pour dispatcher les actions Redux
    const products = useSelector((state) => state.product.products); // Sélection des produits depuis le store Redux
    const error = useSelector((state) => state.product.error); // Sélection de l'état d'erreur depuis le store Redux
    const userRole = useSelector((state) => state.user.role); // Sélection du rôle de l'utilisateur depuis le store Redux

    const navigate = useNavigate(); // Hook pour naviguer entre les routes
    const [modalVisible, setModalVisible] = useState(false); // État pour la visibilité de la modale
    const [selectedProduct, setSelectedProduct] = useState(null); // Produit sélectionné pour la modale

    useEffect(() => {
        dispatch(getProduct()); // Dispatcher l'action pour récupérer les produits
    }, [dispatch]);

    if (error) {
        return <p>Error loading products: {error}</p>; // Afficher un message d'erreur en cas de problème
    }

    if (isEmpty(products)) {
        return <p>Loading...</p>; // Afficher un message de chargement si les produits ne sont pas encore disponibles
    }

    // Filtrer les produits par ID de section et les découper selon les indices de début et de fin
    const filteredProducts = 
        products.length > 0 ? 
        products.filter((product) => product.section_id === SECTIONS.HOME_HEADER).slice(start, end) : [];

    // Fonction pour gérer le clic pour les admins
    const handleAdminClick = (product) => {
        setSelectedProduct(product);
        setModalVisible(true); // Affiche la modale
    };

    // Fonction pour fermer la modale
    const closeModal = () => {
        setModalVisible(false);
        setSelectedProduct(null);
    };

    // Fonction pour naviguer vers la page souhaitée depuis la modale
    const handleNavigate = (path) => {
        navigate(path);
        closeModal();
    };

    return (
        <div className={`${additionalClass || ''}`}>
            {!isEmpty(filteredProducts) ? (
                filteredProducts.map((product, index) => {
                    const isLargeImage = index === 1; // Rendre la deuxième image plus grande
                    return (
                        <div key={product.id} className={isLargeImage ? "large-image" : ""}>
                            {userRole === "admin" ? (
                                <div onClick={() => handleAdminClick(product)}>
                                    <img
                                        src={`${API_URL}assets/img/${product.path}`}
                                        alt={product.name}
                                        loading="lazy" // Ajoute le lazy loading pour une meilleure performance
                                    />
                                </div>
                            ) : (
                                <Link to={`/productDetail/${product.id}`}>
                                    <img
                                        src={`${API_URL}assets/img/${product.path}`}
                                        alt={product.name}
                                        loading="lazy"
                                    />
                                </Link>
                            )}
                        </div>
                    );
                })
            ) : (
                <p>No products found for the home header.</p> // Afficher un message si aucun produit n'est trouvé
            )}

            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
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
