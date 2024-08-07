import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../actions/productAction";
import { Link } from "react-router-dom";
import { getProductCategories } from "../actions/categoryAction";
import { isEmpty } from "./utils/isEmpty";
import { API_URL } from "../actions/serverRequest";

// Section IDs for filtering products
const SECTIONS = {
  COLLECTION: 3,
};

// Slugs for product categories
const CATEGORY_SLUGS = {
  LATEST_COLLECTION: "latest-collection",
  EVENING_DRESSES: "evening-dresses",
};

// Links corresponding to the category slugs
const CATEGORY_LINKS = {
  [CATEGORY_SLUGS.LATEST_COLLECTION]: "/latestCollection",
  [CATEGORY_SLUGS.EVENING_DRESSES]: "/eveningDresses",
};

// Readable names for the categories
const CATEGORY_NAMES = {
  [CATEGORY_SLUGS.LATEST_COLLECTION]: "the latest collection",
  [CATEGORY_SLUGS.EVENING_DRESSES]: "evening dresses",
};

// Component to display collection images
const CollectionImage = ({ start, end, additionalClass }) => {
  const dispatch = useDispatch(); // Hook to dispatch Redux actions
  const products = useSelector((state) => state.product.products); // Selects the products from the Redux store
  const categories = useSelector((state) => state.category.category); // Selects the categories from the Redux store
  const error = useSelector((state) => state.product.error); // Selects the error state from the Redux store

  // Fetch products and categories on component mount
  useEffect(() => {
    dispatch(getProduct());
    dispatch(getProductCategories());
  }, [dispatch]);

  // Filter products by section and slice the result
  const filteredProducts = !isEmpty(products)
    ? products
        .filter((product) => product.section_id === SECTIONS.COLLECTION)
        .slice(start, end)
    : [];

  return (
    <div className={`${additionalClass || ""}`}>
      {error ? (
        // Display error message if there is an error fetching the products
        <p role="alert" aria-live="assertive">
          Error loading products: {error}
        </p>
      ) : !isEmpty(filteredProducts) ? (
        // Display filtered products
        filteredProducts.map((product) => {
          // Find the category of the product
          const category = categories.find(
            (cat) => cat.id === product.categorie_id
          );
          const description = category
            ? category.description
            : "No category description";
          const title = category ? category.name : "Default Title";
          const slug = category ? category.slug : "";
          const linkPath = CATEGORY_LINKS[slug] || "";
          const ariaLabel = `Explore ${CATEGORY_NAMES[slug] || "this collection"}`;

          return (
            <div key={product.id}>
              {/* Display product image */}
              <img
                src={`${API_URL}assets/img/${product.path}`}
                alt={product.name}
              />

              {/* Display product title, description, and link */}
              <div className="home__collection-description">
                <h3>{title}</h3>
                <p>{description}</p>
                <Link to={linkPath} aria-label={ariaLabel}>
                  Explore
                </Link>
              </div>
            </div>
          );
        })
      ) : (
        // Display message if no products are found
        <p role="alert" aria-live="assertive">
          No products found for the collection.
        </p>
      )}
    </div>
  );
};

export default CollectionImage;
