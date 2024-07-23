import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../actions/productAction";
import { Link } from "react-router-dom";
import { getProductCategories } from "../actions/categoryAction";
import { API_URL } from "../actions/serverRequest";

const SECTIONS = {
    COLLECTION: 3,
};

const CATEGORY_SLUGS = {
    LATEST_COLLECTION: "latest-collection",
    EVENING_DRESSES: "evening-dresses"
};

const CATEGORY_LINKS = {
    [CATEGORY_SLUGS.LATEST_COLLECTION]: "/latestCollection",
    [CATEGORY_SLUGS.EVENING_DRESSES]: "/eveningDresses"
};

const CollectionImage = ({ start, end, additionalClass }) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
    const categories = useSelector((state) => state.category.category);

    useEffect(() => {
        dispatch(getProduct());
        dispatch(getProductCategories());
    }, [dispatch]);

    const filteredProducts = 
    products.length > 0 ? 
    products
        .filter((product) => product.section_id === SECTIONS.COLLECTION)
        .slice(start, end)
        : [];

    return (
        <div className={`${additionalClass || ''}`}>
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                    const category = categories.find(cat => cat.id === product.categorie_id);
                    const description = category ? category.description : 'No category description';
                    
                    const title = category ? category.name : 'Default Title';
                    const slug = category ? category.slug : '';
                    const linkPath = CATEGORY_LINKS[slug] || "";

                    return (
                        <div key={product.id} className="product-info">
                            <img src={`${API_URL}assets/img/${product.path}`} alt={product.name} />
                            <h3>{title}</h3>
                            <p>{description}</p>
                            <Link to={linkPath}>Explore</Link>
                        </div>
                    );
                })
            ) : (
                <p>No products found for the collection.</p>
            )}
        </div>
    );
};

export default CollectionImage;
