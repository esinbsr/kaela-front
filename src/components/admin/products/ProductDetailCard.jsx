import { API_URL } from "../../../actions/serverRequest";

// This component displays the details of clicked images
const ProductDetailCard = ({ productDetail }) => {
  return (
    <article className="detail-product">
      <div className="detail-product__description">
        <h2>{productDetail.name}</h2>
        <p>{productDetail.description}</p>
      </div>
      <div className="detail-product__image">
        <img 
          src={`${API_URL}assets/img/${productDetail.path}`} 
          alt={`Image of ${productDetail.name}`} 
          loading="lazy" 
        />
      </div>
    </article>
  );
};

export default ProductDetailCard;
