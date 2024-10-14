import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../actions/productAction";
import { Link } from "react-router-dom";
import { getProductCategories } from "../actions/categoryAction";
import { isEmpty } from "./utils/isEmpty";
import { API_URL } from "../api/serverRequest";


const SECTIONS = {
  COLLECTION: 3, // Section ID for the collection section
};

const CATEGORY_SLUGS = {
  LATEST_COLLECTION: "latest-collection",
  EVENING_DRESSES: "evening-dresses",
};

const CATEGORY_LINKS = {
  [CATEGORY_SLUGS.LATEST_COLLECTION]: "/latestCollection",
  [CATEGORY_SLUGS.EVENING_DRESSES]: "/eveningDresses",
};

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

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getProductCategories());
    window.scrollTo(0, 0);
  }, [dispatch]);

  const filteredProducts = !isEmpty(products)
    ? products
        .filter((product) => product.section_id === SECTIONS.COLLECTION)
        .slice(start, end)
    : [];

  return (
    <section className={`${additionalClass || ""}`}>
      {error ? (
        <p role="alert" aria-live="assertive">
          Loading products...
        </p>
      ) : !isEmpty(filteredProducts) ? (
        filteredProducts.map((product) => {
          const category = categories.find(
            (cat) => cat.id === product.categorie_id
          );
          const description = category ? category.description : "No category description";
          const title = category ? category.name : "Default Title";
          const slug = category ? category.slug : "";
          const linkPath = CATEGORY_LINKS[slug] || "";
          const ariaLabel = `Explore ${CATEGORY_NAMES[slug] || "this collection"}`;

          return (
            <article key={product.id} className="collection-item">
 
                {userRole === "admin" ? (
                  <Link to={`/adminUpdateProduct/${product.id}`}>
                    <img
                      src={`${API_URL}assets/img/${product.path}`}
                      alt={`Image of ${product.name}`}
                      loading="lazy" 
                    />
                  </Link>
                ) : (
                  <img
                    src={`${API_URL}assets/img/${product.path}`}
                    alt={`Image of ${product.name}`}
                    loading="lazy" 
                  />
                )}
                <div className="home__collection-description">
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <Link to={linkPath} aria-label={ariaLabel}>
                    Explore
                  </Link>
                </div>
            </article>
          );
        })
      ) : (
        <p role="alert" aria-live="assertive">
          No products found for the collection.
        </p>
      )}
    </section>
  );
};

export default CollectionImage;
