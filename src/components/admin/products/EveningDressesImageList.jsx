import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../actions/productAction";
import { API_URL } from "../../../actions/informationAction";

const EveningDressesImageList = ({ start, end, additionalClass }) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getProduct()).then(() => setLoading(false));
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className={`${additionalClass || ''}`}>
            {products && products.length > 0 ? (
                products.slice(start, end).map((product, index) => {
                    const isTopImage = index === 0 || index === 2;
                    const isTest = index === 0 || index === 1;
                    const classes = `${isTopImage ? 'top-image' : ''} ${isTest ? 'test' : ''}`;

                    return (
                        <div key={product.id} className={`${classes}`}>
                            <img src={`${API_URL}assets/img/${product.path}`} alt={product.name} />
                        </div>
                    );
                })
            ) : (
                <p>No products found.</p>
            )}
        </div>
    );
};

export default EveningDressesImageList;
