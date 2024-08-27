import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { getSocialNetwork } from "../../actions/socialNetworkAction";
import {
  faFacebookSquare,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

// Component that renders social media icons with corresponding links
const SocialNetworkIcon = () => {
  const dispatch = useDispatch(); // Hook to get the dispatch function from Redux
  
  // useEffect hook to dispatch the action to fetch social networks when the component mounts
  useEffect(() => {
    dispatch(getSocialNetwork()); // Fetch social network data when the component is first rendered
  }, [dispatch]);

  // Retrieves social network data from the Redux store
  const socialNetworks = useSelector((state) => state.socialNetwork.socialNetwork) || [];
  // Retrieves additional information (like phone number) from the Redux store
  const information = useSelector((state) => state.information.information);

  // Function to get the appropriate link for each social network based on its name
  const getSocialNetworkLink = (name) => {
    // Special case for WhatsApp: constructs a URL using a phone number if available
    if (name.toLowerCase() === "whatsapp") {
      const phoneNumber =
        information && information[0] ? information[0].mobile : null; // Gets the phone number from the information array
      if (phoneNumber) {
        const formattedPhoneNumber = phoneNumber.replace(/\D/g, ""); // Removes non-numeric characters from the phone number
        return `https://wa.me/${formattedPhoneNumber}`; // Returns the WhatsApp link with the phone number
      }
      return "#"; // If no phone number is available, returns a placeholder link
    }

    // Finds the URL of the social network based on its name from the socialNetworks array
    const network = socialNetworks.find(
      (network) => network.platform.toLowerCase() === name.toLowerCase()
    );
    return network ? network.url : "#"; // Returns the URL or a placeholder if not found
  };

  // JSX for rendering the social media icons with their respective links
  return (
    <div className="social-icons">
      <Link
        to={getSocialNetworkLink("facebook")} 
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faFacebookSquare} /> 
      </Link>
      <Link
        to={getSocialNetworkLink("instagram")} 
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faInstagram} /> 
      </Link>
      <a
        href={getSocialNetworkLink("whatsapp")} 
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faWhatsapp} /> 
      </a>
    </div>
  );
};

export default SocialNetworkIcon; 
