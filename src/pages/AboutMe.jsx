import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import Modal from 'react-modal';  // Import Modal
import { API_URL } from "../api/serverRequest";
import { getInformation } from "../api/informationApi";
import { getProduct } from "../api/productApi";
import { getSocialNetwork } from "../api/socialNetworkApi";
import { AuthContext } from "../context/AuthProvider";
import '../assets/styles/pages/_about-me.scss';
import "../assets/styles/components/_modal-admin.scss";

Modal.setAppElement('#root');  // Set the app element for accessibility

const SECTIONS = {
  ABOUT_ME: 6,
};

const AboutMe = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { auth } = useContext(AuthContext);
  const userRole = auth.role;
  const navigate = useNavigate(); 

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [instagramLink, setInstagramLink] = useState("");

  // Fetch data with React Query
  const { data: informations, isLoading: infoLoading, error: infoError } = useQuery({
    queryKey: ['informations'],
    queryFn: getInformation,
  });

  const { data: products, isLoading: productLoading, error: productError } = useQuery({
    queryKey: ['products'],
    queryFn: getProduct,
  });

  const { data: socialNetworks, isLoading: socialNetworkLoading, error: socialNetworkError } = useQuery({
    queryKey: ['socialNetworks'],
    queryFn: getSocialNetwork,
  });

  // Filter products related to the "About Me" section
  const filteredProducts = products
    ? products.filter((product) => product.section_id === SECTIONS.ABOUT_ME)
    : [];

  // Get the first three information entries
  const threeInformations = informations ? informations.slice(1, 5) : [];

  // Handle click event for admin users
  const handleAdminClick = (product) => {
    const instagramUrl = socialNetworks.find(
      (network) => network.platform.toLowerCase() === "instagram"
    ).url;
    setInstagramLink(instagramUrl);
    setSelectedProduct(product);
    setModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
    setInstagramLink("");
  };

  // Function to navigate to the desired page from the modal
  const handleNavigate = (path) => {
    navigate(path);
    closeModal();
  };

  if (productLoading || socialNetworkLoading) {
    return <p role="status">Loading...</p>;
  }

  if (productError || socialNetworkError) {
    return <p role="alert">An error occurred</p>;
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
        <p id="modal-description">Choose an action to perform on the product.</p>
        <button onClick={() => handleNavigate(`/updateProduct/${selectedProduct?.id}`)}>
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
