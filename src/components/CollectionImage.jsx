import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../actions/productAction";
import { Link } from "react-router-dom";
import { getProductCategories } from "../actions/categoryAction";
import { isEmpty } from "./utils/isEmpty";
import { API_URL } from "../actions/serverRequest";

// Constants for section and category information
const SECTIONS = {
  COLLECTION: 3, // Section ID for the collection section
};

const CATEGORY_SLUGS = {
  LATEST_COLLECTION: "latest-collection",
  EVENING_DRESSES: "evening-dresses",
};

// Corresponding links for each category
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
  const dispatch = useDispatch(); // Initialize Redux's dispatch function
  const products = useSelector((state) => state.product.products); // Fetch products from the Redux store
  const categories = useSelector((state) => state.category.category); // Fetch categories from the Redux store
  const error = useSelector((state) => state.product.error); // Fetch any errors related to product fetching
  const userRole = useSelector((state) => state.user.role); // Fetch the user's role

  // Fetch products and categories when the component mounts
  useEffect(() => {
    dispatch(getProduct());
    dispatch(getProductCategories());
  }, [dispatch]);

  // Filter products by the collection section and slice based on start/end props
  const filteredProducts = !isEmpty(products)
    ? products
        .filter((product) => product.section_id === SECTIONS.COLLECTION)
        .slice(start, end)
    : [];

  return (
    <div className={`${additionalClass || ""}`}>
      {error ? (
        <p role="alert" aria-live="assertive">
          Error loading products: {error}
        </p>
      ) : !isEmpty(filteredProducts) ? (
        filteredProducts.map((product) => {
          // Find the corresponding category for each product
          const category = categories.find(
            (cat) => cat.id === product.categorie_id
          );
          const description = category
            ? category.description
            : "No category description"; // Fallback if no category is found
          const title = category ? category.name : "Default Title"; // Fallback title
          const slug = category ? category.slug : "";
          const linkPath = CATEGORY_LINKS[slug] || "";
          const ariaLabel = `Explore ${CATEGORY_NAMES[slug] || "this collection"}`;

          return (
            <div key={product.id}>
              {userRole === "admin" ? (
                // If the user is an admin, make the image clickable and link to update page
                <Link to={`/adminUpdateProduct/${product.id}`}>
                  <img
                    src={`${API_URL}assets/img/${product.path}`}
                    alt={product.name}
                  />
                </Link>
              ) : (
                // If not admin, just display the image
                <img
                  src={`${API_URL}assets/img/${product.path}`}
                  alt={product.name}
                />
              )}

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
        <p role="alert" aria-live="assertive">
          No products found for the collection.
        </p>
      )}
    </div>
  );
};

export default CollectionImage;
