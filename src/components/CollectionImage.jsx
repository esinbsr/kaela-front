import { Link } from "react-router-dom";
import { API_URL } from "../api/serverRequest";
import { getProduct } from "../api/productApi";
import { useQuery } from "react-query";
import "../assets/styles/components/_collection.scss";

const SECTIONS = {
  COLLECTION: 3, // Identifier for the "Collection" section
};

const CATEGORY_LINKS = {
  "latest-collection": "/latestCollection",
  "evening-dresses": "/eveningDresses",
};

// Component to display collection images
const CollectionImage = ({ start, end, additionalClass }) => {
  const {
    isLoading: productLoading,
    error: productError,
    data: products,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProduct, // Fetches product data including categories and sections
  });

  if (productLoading) return <p role="status">Loading...</p>;
  if (productError) return <p role="alert">An error occurred</p>;

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
          const title = product.categorie || "Default Title";
          const description =
            product.categorie_description || "No category description";
          const slug = product.slug || "";
          const linkPath = CATEGORY_LINKS[slug] || "";

          return (
            <article key={product.id} className="collection-item">
              <img
                src={`${API_URL}assets/img/${product.path}`}
                alt={`Image of ${product.name}`}
              />
              <div className="home__collection-description">
                <h3>{title}</h3>
                <p>{description}</p>
                <Link to={linkPath}>Explore</Link>
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
