import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../actions/productAction";

import { Link } from "react-router-dom";
import { isEmpty } from './utils/isEmpty';
import { API_URL } from "../api/serverRequest";

const EveningLatestImageList = ({ start, end, additionalClass = '', section }) => {
    const dispatch = useDispatch(); // Redux action dispatcher
    const products = useSelector((state) => state.product.products); // Access products from Redux store

    useEffect(() => {
        dispatch(getProduct()); // Fetch products on component mount
    }, [dispatch]);

    const filteredProducts = !isEmpty(products)
        ? products.filter((product) => product.section_id === section).slice(start, end)
        : [];

    return (
        <section className={additionalClass}>
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => {
                    const topImageClass = index === 0 || index === 2 ? 'top-image' : '';

                    return (
                        <div key={product.id} className="evening-latest__item">
                            <Link to={`/productDetail/${product.id}`}>
                                <img
                                    src={`${API_URL}assets/img/${product.path}`}
                                    alt={`Product ${product.name}`}
                                    className={topImageClass}
                                    loading="lazy" 
                                />
                            </Link>
                        </div>
                    );
                })
            ) : (
                <p role="alert" aria-live="assertive">No products found for this section.</p>
            )}
        </section>
    );
};

export default EveningLatestImageList;
