import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api/serverRequest";
import { AuthContext } from "../context/AuthContext";
import { getProduct } from "../api/productApi";
import { useQuery } from "react-query";

const EveningLatestImageList = ({ start, end, additionalClass, section }) => {

    const navigate = useNavigate();

    // Accessing the authentication context to determine the user's role
    const { auth } = useContext(AuthContext);
    const userRole = auth.role; 

    // Fetching products from the server 
    const { isLoading, error, data : products } = useQuery({
        queryKey: ["products"], // Unique query key to cache this query
        queryFn: getProduct, // The function used to fetch product data
    });

    // State to manage modal visibility and the selected product for admins
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Filtering products based on the 'section' prop and slicing the result between 'start' and 'end' indexes
    const filteredProducts = products
        ? products
            .filter((product) => product.section_id === section) 
            .slice(start, end) 
        : [];

    // Function handling the click on a product image
    const handleClick = (product) => {
        if (userRole === "admin") {
            // If the user is an admin, open a modal with product management options
            setSelectedProduct(product);
            setModalVisible(true); // Open the modal
        } else {
            // For non-admins, navigate to the product detail page
            navigate(`/productDetail/${product.id}`);
        }
    };

    // Function to close the modal
    const closeModal = () => {
        setModalVisible(false);
        setSelectedProduct(null); 
    };

    // Helper function to navigate to a given path and close the modal
    const handleNavigate = (path) => {
        navigate(path); 
        closeModal(); 
    };

    // Return loading or error messages if necessary
    if (isLoading) return "Loading..."; 
    if (error) return "An error occurred: " + error.message;

    return (
        <section className={additionalClass}>
            {/* Render the product images if any filtered products are available */}
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => {
                    // Apply a specific class to the first and third images (visual positioning)
                    const topImageClass = index === 0 || index === 2 ? "top-image" : "";

                    return (
                        <div key={product.id} className="evening-latest__item">
                            <img
                                src={`${API_URL}assets/img/${product.path}`} 
                                alt={`Product ${product.name}`} 
                                className={topImageClass} 
                                loading="lazy"
                                onClick={() => handleClick(product)}
                            />
                        </div>
                    );
                })
            ) : (
                // Display a message if no products were found for the section
                <p role="alert" aria-live="assertive">
                    No products found for this section.
                </p>
            )}

            {/* Modal displayed only for admin users */}
            {modalVisible && (
                <div className="modal">
                    <div className="modal__content">
                        <h2>What do you want to do?</h2>
                        {/* Admin options for viewing or editing the selected product */}
                        <button
                            onClick={() =>
                                handleNavigate(`/productDetail/${selectedProduct.id}`)
                            }
                        >
                            View Product Details
                        </button>
                        <button
                            onClick={() =>
                                handleNavigate(`/updateProduct/${selectedProduct.id}`)
                            }
                        >
                            Edit Product Image
                        </button>
                        <button onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default EveningLatestImageList;
