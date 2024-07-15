import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../actions/productAction";
import { API_URL } from "../../../actions/informationAction";

const EveningDressesImageList = ({ start, end }) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    return (
        <div>
            {products && products.length > 0 ? (
                products.slice(start, end).map((product) => {
                    return (
                        <div key={product.id}>
                            <img src={`${API_URL}assets/img/${product.path}`} alt={product.name} />
                        </div>
                    );
                })
            ) : (
                <p>Aucun produit trouvé.</p>
            )}
        </div>
    );
};

export default EveningDressesImageList;
