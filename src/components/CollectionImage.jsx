import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, getProductCategories } from "../actions/productAction";
import { API_URL } from "../actions/informationAction";
import { Link } from "react-router-dom";

const CollectionImage = ({ start, end, additionalClass }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const categories = useSelector((state) => state.product.categories);

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getProductCategories());
  }, [dispatch]);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  return (
    <div className={`${additionalClass || ''}`}>
      {products && products.length > 0 ? (
        products.slice(start, end).map((product, index) => {
          const category = categories[index];
          const buttonText = index === 0 ? "Discover" : index === 1 ? "Explore" : "";
          const linkPath = index === 0 ? "/latestCollection" : index === 1 ? "/eveningDresses" : "/";

          return (
            <div key={product.id} className="product-item">
              <img src={`${API_URL}assets/img/${product.path}`} alt={product.name} />
              <p>{category ? category.name : 'No category name'}</p>
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
