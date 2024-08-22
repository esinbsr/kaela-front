import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// This component displays social network icons with dynamic links to specific pages
const SocialNetworkIcon = () => {
  const socialNetworks =
    useSelector((state) => state.socialNetwork.socialNetwork) || [];
  const information = useSelector((state) => state.information.information);

  //Function that generates a dynamic URL for a social network
  const getSocialNetworkLink = (name) => {
    if (name.toLowerCase() === "whatsapp") {
      const phoneNumber =
        information && information[0] ? information[0].mobile : null; //Checks whether the information and telephone number are available
      if (phoneNumber) {
        const formattedPhoneNumber = phoneNumber.replace(/\D/g, ""); //If yes, the phone number is formatted by deleting all non-numeric characters.
        return `https://wa.me/${formattedPhoneNumber}`; //The WhatsApp URL is then generated as follows
      }
      return "#"; //If the number is not available, the function returns an inactive link
    }

    //Determines the URL link to use for a given social network
    const network = socialNetworks.find(
      (network) => network.platform.toLowerCase() === name.toLowerCase()
    ); //converts character strings to lower case so that the comparison is case insensitive
    return network ? network.url : "#"; //If network is found, the url property of this object is returned. This is the URL that will be used for the social network link.
  };

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
