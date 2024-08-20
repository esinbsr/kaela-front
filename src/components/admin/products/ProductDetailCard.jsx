import { API_URL } from "../../../actions/serverRequest";

const ProductDetailCard = ({ productDetail }) => {
  return (
    <div className="detail-product">
      <div className="detail-product__description">
        <p>{productDetail.name}</p>
        <p>{productDetail.description}</p>
      </div>
      <div className="detail-product__image">
        <img src={`${API_URL}assets/img/${productDetail.path}`} alt={productDetail.name} loading="lazy" />
      </div>
    </div>
  );
};

export default ProductDetailCard;
