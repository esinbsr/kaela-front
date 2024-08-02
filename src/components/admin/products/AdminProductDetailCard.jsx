import { API_URL } from "../../../actions/serverRequest";

const AdminProductDetailCard = ({ product }) => {
  return (
    <div className="detail-product">
      <div className="detail-product__description">
        <p>{product.name}</p>
        <p>{product.description}</p>
      </div>
      <div className="detail-product__image">
        <img src={`${API_URL}assets/img/${product.path}`} alt={product.name} />
      </div>
    </div>
  );
};

export default AdminProductDetailCard;
