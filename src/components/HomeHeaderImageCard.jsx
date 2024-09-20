import { Link } from 'react-router-dom';
import { API_URL } from '../actions/serverRequest';

const HomeHeaderImageCard = ({ product, isLargeImage, userRole, onAdminClick }) => {
  return (
    <Link to={userRole === "admin" ? "#" : `/productDetail/${product.id}`} onClick={userRole === "admin" ? () => onAdminClick(product) : null}>
      <img
        className={isLargeImage ? "large-image" : ""}
        src={`${API_URL}assets/img/${product.path}`}
        alt={product.name}
        loading="lazy"
      />
    </Link>
  );
};

export default HomeHeaderImageCard;
