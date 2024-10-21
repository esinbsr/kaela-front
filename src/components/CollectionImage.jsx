

import { Link } from "react-router-dom";
import { API_URL } from "../api/serverRequest";
import { getProduct } from "../api/productApi";
import { getProductCategories } from "../api/categoryApi";
import { useQuery } from "react-query";

const SECTIONS = {
  COLLECTION: 3, 
};

const CATEGORY_SLUGS = {
  LATEST_COLLECTION: "latest-collection",
  EVENING_DRESSES: "evening-dresses",
};

const CATEGORY_LINKS = {
  [CATEGORY_SLUGS.LATEST_COLLECTION]: "/latestCollection",
  [CATEGORY_SLUGS.EVENING_DRESSES]: "/eveningDresses",
};

// Component to display collection images
const CollectionImage = ({ start, end, additionalClass }) => {

  const {  productLoading, productError, data : products } = useQuery({
    queryKey: ["products"],  
    queryFn: getProduct,   
  });

  const {  isLoading : categoryLoading, error : categoryError, data : categories} = useQuery({
    queryKey: ['categories'],  
    queryFn: getProductCategories, 
  });

  if (productLoading ||categoryLoading ) return <p role="status"> Loading...</p>;
  if (productError || categoryError) return <p role="alert"> An error occurred</p>;

  const filteredProducts = products  ?
   products
        .filter((product) => product.section_id === SECTIONS.COLLECTION)
        .slice(start, end)
    : [];

  return (
    <section className={`${additionalClass || ""}`}>
      {filteredProducts &&
        filteredProducts.map((product) => {
          const category = categories.find(
            (cat) => cat.id === product.categorie_id
          );
          const description = category ? category.description : "No category description";
          const title = category ? category.name : "Default Title";
          const slug = category ? category.slug : "";
          const linkPath = CATEGORY_LINKS[slug] || "";

          return (
            <article key={product.id} className="collection-item">
   
                  <img
                    src={`${API_URL}assets/img/${product.path}`}
                    alt={`Image of ${product.name}`}
                    loading="lazy" 
                  />
             
                <div className="home__collection-description">
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <Link to={linkPath}>
                    Explore
                  </Link>
                </div>
            </article>
          );
        })
        }
    </section>
  );
};

export default CollectionImage;
