import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../actions/productAction";
import { API_URL } from "../actions/informationAction";
import { Link } from "react-router-dom";
import { getProductCategories } from "../actions/categoryAction";

const CollectionImage = ({ start, end, additionalClass }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const categories = useSelector((state) => state.category.categorie);

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getProductCategories());
  }, [dispatch]);

  return (
    <div className={`${additionalClass || ''}`}>
      {products && products.length > 0 ? (
        products.slice(start, end).map((product, index) => {
       
          let categoryName = 'No category name';
          if (index === 0) {
            categoryName = 'Latest Collection';
          } else if (index === 1) {
            categoryName = 'Evening Dresses';
          } else {
            const category = categories.find(cat => cat.id === product.categorie_id);
            if (category) {
              categoryName = category.name;
            }
          }

          const buttonText = index === 0 ? "Discover" : index === 1 ? "Explore" : "";
          const linkPath = index === 0 ? "/latestCollection" : index === 1 ? "/eveningDresses" : "";

          return (
            <div key={product.id} className="product-info">
              <img src={`${API_URL}assets/img/${product.path}`} alt={product.name} />
              <h3>{categoryName}</h3>
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
