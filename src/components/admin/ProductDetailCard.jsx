import { API_URL } from "../../api/serverRequest";

// This component displays the details of a selected product
const ProductDetailCard = ({ productDetail }) => {
  return (
    <>
      <h1>Product Details</h1>
      <article className="product-detail">

      <div className="product-detail__description">
        
        <div className="product-detail__header">
        <h2>{productDetail.name}</h2>
        <p className="description">{productDetail.description}</p>
        </div>

    <div className="product-detail__body">
        <p><span className="bold">Color :</span> Lorem</p>
        <p><span className="bold">Size :</span> Lorem</p>
        <p><span className="bold">Material :</span> Lorem</p>
        <p><span className="bold">Price :</span> Lorem</p>
        </div>

      </div>

      <div className="product-detail__image">
        <img
          src={`${API_URL}assets/img/${productDetail.path}`}
          alt={`Image of ${productDetail.name}`}
          loading="lazy"
        />
      </div>
      </article>
    </>
  );
};

export default ProductDetailCard;
