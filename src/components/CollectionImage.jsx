import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../actions/productAction";
import { Link } from "react-router-dom";
import { getProductCategories } from "../actions/categoryAction";
import { API_URL } from "../actions/serverRequest";

const CollectionImage = ({ start, end, additionalClass }) => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.product.products);
  const categories = useSelector((state) => state.category.category);

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getProductCategories());
  }, [dispatch]);

  return (
    <div className={`${additionalClass || ''}`}>
      {products && products.length > 0 ? (
        products
        .slice(start, end)
        .map((product, index) => {
       
          let categoryName = 'No category name';

          const category = categories.find(cat => cat.id === product.categorie_id);
          if (category) {
            categoryName = category.name;
          }

          const buttonText = index === 0 ? "Discover" : index === 1 ? "Explore" : "";
          const linkPath = index === 0 ? "/latestCollection" : index === 1 ? "/eveningDresses" : "";
          const displayName = index === 0 ? "Latest Collection" : index === 1 ? "Evening Dresses" : categoryName;

          return (
            <div key={product.id} className="product-info">
              <img src={`${API_URL}assets/img/${product.path}`} alt={product.name} />
              <h3>{displayName}</h3>
              <Link to={linkPath}>{buttonText}</Link>
            </div>
          );
        })
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default CollectionImage;
