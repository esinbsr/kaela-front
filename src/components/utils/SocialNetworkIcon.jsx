import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SocialNetworkIcon = () => {
  const socialNetworks = useSelector((state) => state.socialNetwork.socialNetwork) || [];

  const getSocialNetworkLink = (name) => {
    const network = socialNetworks.find((network) => network.platform.toLowerCase() === name.toLowerCase());
    return network ? network.url : '#';
  };

  return (
    <div className="social-icons">
      <Link href={getSocialNetworkLink('facebook')} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faFacebookSquare} />
      </Link>
      <Link href={getSocialNetworkLink('instagram')} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faInstagram} />
      </Link>
      <Link href={getSocialNetworkLink('whatsapp')} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faWhatsapp} />
      </Link>
    </div>
  );
};

export default SocialNetworkIcon;
