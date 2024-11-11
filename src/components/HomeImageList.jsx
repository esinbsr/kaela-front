import { useState, useContext } from "react";
import { useQuery } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { getProduct } from "../api/productApi";
import { API_URL } from "../api/serverRequest";
import Modal from "react-modal";
import "../assets/styles/components/_home-image.scss";
import "../assets/styles/components/_modal-admin.scss";

Modal.setAppElement("#root"); // Set the app element for accessibility

const SECTIONS = {
  HOME_HEADER: 2, // Identifier for "Home Header" section
};

const HomeImageList = ({ start, end, additionalClass }) => {
  const { auth } = useContext(AuthContext); // Get authentication context
  const userRole = auth.role; // Retrieve user role from context
  const navigate = useNavigate(); // Navigation hook for redirecting

  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [selectedProduct, setSelectedProduct] = useState(null); // Currently selected product for admin actions

  // Fetch product data
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProduct,
  });

  const productList = data?.length > 0 ? data : []; // List of all products

  // Filter products by section and apply pagination
  const filteredProducts = productList
    .filter((product) => product.section_id === SECTIONS.HOME_HEADER)
    .slice(start, end);

  // Display modal for admin actions on selected product
  const handleAdminClick = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  // Close modal and reset selected product
  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  // Navigate to a specified path and close modal
  const handleNavigate = (path) => {
    navigate(path);
    closeModal();
  };

  if (isLoading) return <p role="status"> Loading...</p>; // Loading state
  if (error) return <p role="alert">An error occurred: {error.message}</p>; // Error state

  return (
    <section className={`${additionalClass || ""}`}>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product, index) => (
          <Link
            key={product.id}
            to={userRole === "admin" ? "#" : `/productDetail/${product.id}`} // Set link based on user role
            onClick={
              userRole === "admin" ? () => handleAdminClick(product) : null // Admin click opens modal
            }
          >
            <img
              src={`${API_URL}assets/img/${product.path}`} // Product image path
              alt={product.name}
              className={index === 1 ? "middle-img" : ""} // Apply specific styling for middle image
            />
          </Link>
        ))
      ) : (
        <p>No products available.</p> // Message if no products found
      )}

      <Modal
        isOpen={modalVisible} // Show modal if `modalVisible` is true
        onRequestClose={closeModal} // Close modal on outside click or Esc
        className="modal__content"
        overlayClassName="modal"
        contentLabel="Admin Actions Modal"
      >
        <h2 id="modal-title">What do you want to do?</h2>
        <p id="modal-description">
          Choose an action to perform on the product.
        </p>
        <button
          onClick={() =>
            handleNavigate(`/productDetail/${selectedProduct?.id}`)
          }
        >
          View product details {/* Button to view product details */}
        </button>
        <button
          onClick={() =>
            handleNavigate(`/UpdateProduct/${selectedProduct?.id}`)
          }
        >
          Modify the product image {/* Button to update product */}
        </button>
        <button onClick={closeModal}>Cancel</button> {/* Close modal */}
      </Modal>
    </section>
  );
};

export default HomeImageList;
