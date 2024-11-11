import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import Modal from "react-modal"; // Import Modal
import { API_URL } from "../api/serverRequest";
import { getInformation } from "../api/informationApi";
import { getProduct } from "../api/productApi";
import { getSocialNetwork } from "../api/socialNetworkApi";
import { AuthContext } from "../context/AuthProvider";
import "../assets/styles/pages/_about-me.scss";
import "../assets/styles/components/_modal-admin.scss";

// Set the root element for accessibility with Modal
Modal.setAppElement("#root");
// Define constants for section IDs
const SECTIONS = {
  ABOUT_ME: 6,
};

const AboutMe = () => {
  // Scroll to top when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get auth data from context (e.g., user role)
  const { auth } = useContext(AuthContext);
  const userRole = auth.role;

  // Initialize navigate for routing
  const navigate = useNavigate();

  // State variables to control modal visibility and selected product
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [instagramLink, setInstagramLink] = useState("");

  // Fetch data using react-query for information, products, and social networks
  const {
    data: informations,
    isLoading: infoLoading,
    error: infoError,
  } = useQuery({
    queryKey: ["informations"],
    queryFn: getInformation,
  });

  const {
    data: products,
    isLoading: productLoading,
    error: productError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProduct,
  });

  const {
    data: socialNetworks,
    isLoading: socialNetworkLoading,
    error: socialNetworkError,
  } = useQuery({
    queryKey: ["socialNetworks"],
    queryFn: getSocialNetwork,
  });

  // Filter the products that belong to the "About Me" section
  const filteredProducts = products
    ? products.filter((product) => product.section_id === SECTIONS.ABOUT_ME)
    : [];

  // Get the first three information entries
  const threeInformations = informations ? informations.slice(1, 5) : [];

  // Handle the click event for admin users to open the modal
  const handleAdminClick = (product) => {
    // Find the Instagram URL from the social network data
    const instagramUrl = socialNetworks.find(
      (network) => network.platform.toLowerCase() === "instagram"
    ).url;
    setInstagramLink(instagramUrl); // Set the Instagram link
    setSelectedProduct(product); // Set the selected product
    setModalVisible(true); // Show the modal
  };

  // Close the modal and reset state
  const closeModal = () => {
    setModalVisible(false); // Hide modal
    setSelectedProduct(null); // Clear selected product
    setInstagramLink(""); // Clear Instagram link
  };

  // Navigate to the specific page when an action is selected in the modal
  const handleNavigate = (path) => {
    navigate(path); // Navigate to the provided path
    closeModal(); // Close the modal
  };

  // Loading and error handling states
  if (productLoading || socialNetworkLoading) {
    return <p role="status">Loading...</p>; // Show loading state
  }

  if (productError || socialNetworkError) {
    return <p role="alert">An error occurred</p>; // Show error state
  }

  return (
    <div className="about-me">
      <Helmet>
        <title>About Kaela Couture | Our Vision & Story </title>
        <meta
          name="description"
          content="Learn more about Kaela Couture, a luxury fashion brand dedicated to timeless elegance and craftsmanship. Discover the vision behind our unique women's collections."
        />
      </Helmet>

      <h1>About Me</h1>

      <h2>Who am I?</h2>

      <section className="about-me__header">
        {infoLoading && <span role="status">Loading...</span>}
        {infoError && <span role="alert">An error occurred</span>}
        {threeInformations &&
          threeInformations.map((info) => (
            <p key={info.id}>{info.description}</p>
          ))}
      </section>

      <section className="about-me__footer">
        <h2>Subscribe to my Instagram</h2>
        <div className="about-me__footer-container">
          {filteredProducts.length > 0 && socialNetworks?.length > 0 ? (
            filteredProducts.slice(1, 9).map((product) => (
              <div className="about-me__footer-image" key={product.id}>
                {userRole === "admin" ? (
                  <div onClick={() => handleAdminClick(product)}>
                    <img
                      src={`${API_URL}assets/img/${product.path}`}
                      alt={product.name}
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <Link
                    to={
                      socialNetworks.find(
                        (network) =>
                          network.platform.toLowerCase() === "instagram"
                      ).url
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`${API_URL}assets/img/${product.path}`}
                      alt={product.name}
                      loading="lazy"
                    />
                  </Link>
                )}
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </section>

      <Modal
        isOpen={modalVisible}
        onRequestClose={closeModal}
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
            handleNavigate(`/updateProduct/${selectedProduct?.id}`)
          }
        >
          Edit Image
        </button>
        <button onClick={() => window.open(instagramLink, "_blank")}>
          Go to Instagram
        </button>
        <button onClick={closeModal}>Cancel</button>
      </Modal>

      <Footer />
    </div>
  );
};

export default AboutMe;
