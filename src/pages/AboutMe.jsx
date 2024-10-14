import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInformation } from "../actions/informationAction";
import { getProduct } from "../actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import { isEmpty } from "../components/utils/isEmpty";
import { getSocialNetwork } from "../actions/socialNetworkAction";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import { API_URL } from "../api/serverRequest";



// Define section IDs for filtering products
const SECTIONS = {
  ABOUT_ME: 6,
};

const AboutMe = () => {
  // Retrieve data from Redux store or default to empty array if not available
  const informations =
    useSelector((state) => state.information.information) || [];
  const products = useSelector((state) => state.product.products) || [];
  const socialNetworks =
    useSelector((state) => state.socialNetwork.socialNetwork) || [];
  const userRole = useSelector((state) => state.user.role); // Get the role of the current user

  const dispatch = useDispatch(); // Initialize dispatch to trigger actions
  const navigate = useNavigate(); // Hook for navigation between routes

  const [modalVisible, setModalVisible] = useState(false); // State to control the visibility of the modal
  const [selectedProduct, setSelectedProduct] = useState(null); // State to track the selected product for the modal
  const [instagramLink, setInstagramLink] = useState(""); // State to store the Instagram link

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    dispatch(getInformation()); // Fetch information data
    dispatch(getProduct()); // Fetch product data
    dispatch(getSocialNetwork()); // Fetch social network data
    window.scrollTo(0, 0);
  }, [dispatch]);

  // Filter products related to the "About Me" section
  const filteredProducts = !isEmpty(products)
    ? products.filter((product) => product.section_id === SECTIONS.ABOUT_ME)
    : [];

  // Get the first three information entries
  const threeInformations = !isEmpty(informations)
    ? informations.slice(1, 4)
    : [];

  // Handle click event for admin users
  const handleAdminClick = (product) => {
    const instagramUrl = socialNetworks.find(
      (network) => network.platform.toLowerCase() === "instagram"
    ).url;
    setInstagramLink(instagramUrl); // Set the Instagram link
    setSelectedProduct(product); // Set the selected product
    setModalVisible(true); // Show the modal
  };

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false); // Hide the modal
    setSelectedProduct(null); // Reset the selected product
    setInstagramLink(""); // Reset the Instagram link
  };

  // Function to navigate to the desired page from the modal
  const handleNavigate = (path) => {
    navigate(path); // Navigate to the specified path
    closeModal(); // Close the modal after navigation
  };

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
      <div className="about-me__header">
        {!isEmpty(threeInformations) ? (
          threeInformations.map((info) => (
            <p key={info.id}>{info.description}</p>
          ))
        ) : (
          <p role="alert" aria-live="assertive">
            Loading descriptions...
          </p>
        )}
      </div>

      <div className="about-me__footer">
        <h2>Subscribe to my Instagram</h2>
        <div className="about-me__footer-container">
          {!isEmpty(filteredProducts) && socialNetworks.length > 0 ? (
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
            <p role="alert" aria-live="assertive">
              Loading images...
            </p>
          )}
        </div>
      </div>

      {modalVisible && ( // Display the modal if modalVisible is true
        <div className="modal">
          <div className="modal__content">
            <h2>What do you want to do?</h2>
            <button
              onClick={() =>
                handleNavigate(`/adminUpdateProduct/${selectedProduct.id}`)
              }
            >
              Edit Image
            </button>
            <button onClick={() => window.open(instagramLink, "_blank")}>
              Go to Instagram
            </button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default AboutMe;
