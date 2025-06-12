import { Link } from "react-router-dom";
import { API_URL } from "../api/serverRequest";
import { getProduct } from "../api/productApi";
import { getProductCategories } from "../api/categoryApi";
import { useQuery } from "react-query";
import "../assets/styles/components/_collection.scss";

const SECTIONS = {
  COLLECTION: 3, // Identifier for the "Collection" section
};

const CATEGORY_SLUGS = {
  LATEST_COLLECTION: "latest-collection",
  EVENING_DRESSES: "evening-dresses",
};

const CATEGORY_LINKS = {
  [CATEGORY_SLUGS.LATEST_COLLECTION]: "/latestCollection", // Link to "Latest Collection"
  [CATEGORY_SLUGS.EVENING_DRESSES]: "/eveningDresses", // Link to "Evening Dresses"
};

// Component to display collection images
const CollectionImage = ({ start, end, additionalClass }) => {
  const {
    isLoading: productLoading,
    error: productError,
    data: products,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProduct, // Fetches product data
  });

  const {
    isLoading: categoryLoading,
    error: categoryError,
    data: categories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getProductCategories, // Fetches category data
  });

  if (productLoading || categoryLoading)
    return <p role="status"> Loading...</p>; // Show loading state
  if (productError || categoryError)
    return <p role="alert"> An error occurred</p>; // Show error state

  // Filter products by "Collection" section and apply pagination
  const filteredProducts = products
    ? products
        .filter((product) => product.section_id === SECTIONS.COLLECTION)
        .slice(start, end)
    : [];

  return (
    <section className={`${additionalClass || ""}`}>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => {
          // Find category for each product
          const category = categories.find(
            (category) => category.id === product.categorie_id
          );
          const description = category
            ? category.description
            : "No category description"; // Default if category missing
          const title = category ? category.name : "Default Title"; // Default title
          const slug = category ? category.slug : "";
          const linkPath = CATEGORY_LINKS[slug] || ""; // Category link if defined

          return (
            <article key={product.id} className="collection-item">
              <img
                src={`${API_URL}assets/img/${product.path}`} // Product image path
                alt={`Image of ${product.name}`} // Alt text for accessibility
              />
              <div className="home__collection-description">
                <h3>{title}</h3>
                <p>{description}</p>
                <Link to={linkPath}>Explore</Link> {/* Link to category page */}
              </div>
            </article>
          );
        })
      ) : (
        <p>No products available.</p> // Message if no products found
      )}
    </section>
  );
};

export default CollectionImage;