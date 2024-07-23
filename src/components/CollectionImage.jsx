import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../actions/productAction";
import { Link } from "react-router-dom";
import { getProductCategories } from "../actions/categoryAction";
import { API_URL } from "../actions/serverRequest";

const SECTIONS = {
    COLLECTION: 3,
};

const linkConfig = [
    { title: "Latest Collection", linkPath: "/latestCollection", buttonText: "Discover" },
    { title: "Evening Dresses", linkPath: "/eveningDresses", buttonText: "Explore" }
];

const CollectionImage = ({ start, end, additionalClass }) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
    const categories = useSelector((state) => state.category.category);
    const productError = useSelector((state) => state.product.error);
    const categoryError = useSelector((state) => state.category.error);

    useEffect(() => {
        dispatch(getProduct());
        dispatch(getProductCategories());
    }, [dispatch]);

    if (productError) {
        return <p>Error loading products: {productError}</p>;
    }

    if (categoryError) {
        return <p>Error loading categories: {categoryError}</p>;
    }

    if (!products || !categories) {
        return <p>Loading...</p>;
    }

    const filteredProducts = products.length > 0
        ? products.filter((product) => product.section_id === SECTIONS.COLLECTION).slice(start, end)
        : [];

    return (
        <div className={`${additionalClass || ''}`}>
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => {
                    const category = categories.find(cat => cat.id === product.categorie_id);
                    const categoryName = category ? category.name : 'No category name';

                    const { title, linkPath, buttonText } = linkConfig[index] || { title: categoryName, linkPath: "", buttonText: "" };

                    return (
                        <div key={product.id} className="product-info">
                            <img src={`${API_URL}assets/img/${product.path}`} alt={product.name} />
                            <h3>{title}</h3>
                            <Link to={linkPath}>{buttonText}</Link>
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
