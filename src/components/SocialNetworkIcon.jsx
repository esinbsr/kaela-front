import { useQuery } from "react-query";
import { getSocialNetwork } from "../api/socialNetworkApi";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import '../assets/styles/components/_icon-social-network.scss';


const SocialNetworkIcon = () => {
  // Fetch social networks from the server
  const { isLoading, error, data } = useQuery({
    queryKey: ["socialNetworks"],  // The unique query key to identify this query
    queryFn: getSocialNetwork,    // The function responsible for fetching the social networks
  });

  // If there is data and it contains social networks, use it, otherwise return an empty array
  const socialNetworks = data?.length > 0 ? data : [];

  if (isLoading) return "Loading...";
  if (error) return `An error occurred: ${error.message}`;

  // Function to get the correct icon based on the platform name
  const getIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return <FaInstagram  />;
      case "facebook":
        return <FaFacebook />;
      case "whatsapp":
        return <FaWhatsapp/>;
      default:
        return null;
    }
  };

  return (
    <div className="social-network-icons">
      {socialNetworks.length &&
        socialNetworks.map((network) => (
          <Link
            key={network.id}
            to={network.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-network-link"
          >
            {getIcon(network.platform)}
          </Link>
        ))
     }
    </div>
  );
};

export default SocialNetworkIcon;
