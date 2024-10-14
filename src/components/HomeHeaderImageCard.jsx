import { Link } from 'react-router-dom';
import { API_URL } from '../api/serverRequest';


const HomeHeaderImageCard = ({ product, userRole, onAdminClick }) => {
  return (
    <Link to={userRole === "admin" ? "#" : `/productDetail/${product.id}`} onClick={userRole === "admin" ? () => onAdminClick(product) : null}>
      <img
        src={`${API_URL}assets/img/${product.path}`}
        alt={product.name}
        loading="lazy"
      />
    </Link>
  );
};

export default HomeHeaderImageCard;
