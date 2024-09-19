// Card.js
import { Link } from 'react-router-dom';
import { API_URL } from '../actions/serverRequest';

const HomeHeaderImageCard = ({ product, isLargeImage, userRole, onAdminClick }) => {
  return (
    <>
      {userRole === "admin" ? (
        <img className={isLargeImage ? "large-image" : ""}
          onClick={() => onAdminClick(product)}
          src={`${API_URL}assets/img/${product.path}`}
          alt={product.name}
          loading="lazy" // Ajoute le lazy loading pour une meilleure performance
        />
      ) : (
        <Link to={`/productDetail/${product.id}`}>
          <img
            src={`${API_URL}assets/img/${product.path}`}
            alt={product.name}
            loading="lazy"
          />
        </Link>
      )}
    </>
  );
};

export default HomeHeaderImageCard;
