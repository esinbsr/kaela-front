import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../actions/productAction";
import { API_URL } from "../actions/serverRequest";

const EveningLatestImageList = ({ start, end, additionalClass, section }) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getProduct()).then(() => setLoading(false));
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;

    const filteredProducts =
    products.length > 0 ?
    products
    .filter((product) => product.section_id === section)
    .slice(start, end) : [];

    return (
        <div className={`${additionalClass || ''}`}>

            {filteredProducts.length > 0 ? (
                
                filteredProducts.map((product, index) => {
                    const isTopImage = index === 0 || index === 2;
                    const topImage = `${isTopImage ? 'top-image' : ''}`;

                    return (
                        <div key={product.id}>
                            <img src={`${API_URL}assets/img/${product.path}`} alt={product.name} className={`${topImage}`}/>
                        </div>
                    );
                })
            ) : (
                <p>No products found for this section.</p>
            )}
        </div>
    );
};

export default EveningLatestImageList;
