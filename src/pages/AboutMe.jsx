import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInformation } from "../actions/informationAction";
import { API_URL } from "../actions/serverRequest";
import { getProduct } from "../actions/productAction";
import { Link } from "react-router-dom";
import { getSocialNetwork } from "../actions/socialNetworkAction";
import { isEmpty } from "../components/utils/isEmpty";
import SocialNetworkIcon from '../components/utils/SocialNetworkIcon';

// Define section IDs for filtering products
const SECTIONS = {
  ABOUT_ME: 6,
};

const AboutMe = () => {
  // Select data from Redux store or fallback to empty array if not available
  const informations = useSelector((state) => state.information.information) || [];
  const products = useSelector((state) => state.product.products) || [];
  const socialNetworks = useSelector((state) => state.socialNetwork.socialNetwork) || [];

  // Initialize dispatch to trigger actions
  const dispatch = useDispatch();

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    dispatch(getInformation()); // Fetch information data
    dispatch(getProduct()); // Fetch product data
    dispatch(getSocialNetwork()); // Fetch social network data
  }, [dispatch]);

  // Filter products related to the "About Me" section
  const filteredProducts = !isEmpty(products) ? products.filter((product) => product.section_id === SECTIONS.ABOUT_ME) : [];
  
  // Slice the first three information entries
  const threeInformations = !isEmpty(informations) ? informations.slice(1, 4) : [];

  // Find Instagram link from social networks
  const instagram = !isEmpty(socialNetworks) && socialNetworks.find((network) => network.platform.toLowerCase() === 'instagram');

  // Function to validate if a URL is correct
  const isValidUrl = (url) => {
    try {
      new URL(url); // Try to create a new URL object
      return true; // Return true if successful
    } catch (error) {
      return false; // Return false if an error occurs
    }
  };

  // Generate Instagram login URL with redirection to the profile page
  const generateInstagramLoginUrl = (profileUrl) => {
    const loginUrl = 'https://www.instagram.com/accounts/login/'; // Instagram login URL
    const redirectUrl = encodeURIComponent(profileUrl); // Encode profile URL for redirection
    return `${loginUrl}?next=${redirectUrl}`; // Combine login URL and redirection URL
  };

  return (
    <div className="about-me">
      <SocialNetworkIcon/>
      <h1>About Me</h1>

      <div className="about-me__header">
        <div className="about-me__description">
          <h2>Who am I?</h2>
          {!isEmpty(threeInformations) ? (
            threeInformations.map((info) => (
              <div key={info.id}>
                <p>{info.description}</p>
              </div>
            ))
          ) : (
            <p role="alert" aria-live="assertive">Loading descriptions...</p> // Accessibility: Loading message
          )}
        </div>

        <div className="about-me__image">
          {!isEmpty(filteredProducts) ? (
            <img
              src={`${API_URL}assets/img/${filteredProducts[0].path}`}
              alt={filteredProducts[0].name}
            />
          ) : (
            <p role="alert" aria-live="assertive">Loading image...</p> // Accessibility: Loading message
          )}
        </div>
      </div>

      <div className="about-me__footer">
        <h2>Subscribe to my Instagram</h2>
        <div className="about-me__footer-container">
          {!isEmpty(filteredProducts) && instagram && isValidUrl(instagram.url) ? (
            filteredProducts.slice(1, 9).map((product) => (
              <div className="about-me__footer-image" key={product.id}>
                <Link to={generateInstagramLoginUrl(instagram.url)} target="_blank" rel="noopener noreferrer">
                  <img
                    src={`${API_URL}assets/img/${product.path}`}
                    alt={product.name}
                  />
                </Link>
              </div>
            ))
          ) : (
            <p role="alert" aria-live="assertive">Loading drawing images...</p> // Accessibility: Loading message
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
