import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import { API_URL } from "../api/serverRequest";
import { AuthContext } from '../context/AuthContext'; 
import { getInformation } from "../api/informationApi";
import { getProduct } from "../api/productApi";
import { getSocialNetwork } from "../api/socialNetworkApi";

// Define section IDs for filtering products
const SECTIONS = {
  ABOUT_ME: 6,
};

const AboutMe = () => {
  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  const { auth } = useContext(AuthContext);
  const userRole = auth.role;
  const navigate = useNavigate(); 

  const [modalVisible, setModalVisible] = useState(false); // State to control the visibility of the modal
  const [selectedProduct, setSelectedProduct] = useState(null); // State to track the selected product for the modal
  const [instagramLink, setInstagramLink] = useState(""); // State to store the Instagram link

  // Fetch data with React Query
  const { data: informations , isLoading: infoLoading } = 
  useQuery({
   queryKey:['informations'],
  queryFn: getInformation
});

  const { data: products, isLoading: productLoading } = 
  useQuery({
    queryKey:['products'],
    queryFn: getProduct
  });

  const { data: socialNetworks , isLoading: socialNetworkLoading } = 
  useQuery({
    queryKey:['socialNetworks'],
    queryFn: getSocialNetwork
  });

  // Filter products related to the "About Me" section
  const filteredProducts = products
    ? products.filter((product) => product.section_id === SECTIONS.ABOUT_ME)
    : [];

  // Get the first three information entries
  const threeInformations = informations
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

  if (infoLoading || productLoading || socialNetworkLoading) {
    return <p>Loading data...</p>;
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
      <div className="about-me__header">
        {threeInformations ? (
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
          {filteredProducts && socialNetworks.length > 0 ? (
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
                handleNavigate(`/updateProduct/${selectedProduct.id}`)
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
