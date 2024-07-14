// components/AdminModifyProduct.jsx
import { useState, useEffect } from "react";
import Navigation from "../../../components/Navigation";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, updateProduct, getProductCategories } from "../../../actions/productAction";
import { isEmpty } from "../../../components/Utils";

const AdminModifyProduct = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const productById = useSelector((state) => state.product.productById);
    const categories = useSelector((state) => state.product.categories);
    const responseMessage = useSelector((state) => state.product.message);
    const errorMessage = useSelector((state) => state.product.error);

    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productImage, setProductImage] = useState(null);

    useEffect(() => {
        if (productId) {
            dispatch(getProductById(productId));
        }
        dispatch(getProductCategories());
    }, [dispatch, productId]);

    useEffect(() => {
        if (productById) {
            setProductName(productById.name);
            setProductDescription(productById.description);
            setProductCategory(productById.categorie_id);
        }
    }, [productById]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("productId", productId);
        formData.append("productName", productName);
        formData.append("productDescription", productDescription);
        formData.append("productCategory", productCategory);
        formData.append("productImage", productImage);

        dispatch(updateProduct(formData));
    };

    return (
        <div>
            <Navigation />
            <h2>Modify a product</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="productName">Name of product:</label>
                <input
                    id="productName"
                    type="text"
                    name="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />

                <label htmlFor="productDescription">Description:</label>
                <textarea
                    id="productDescription"
                    name="productDescription"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                ></textarea>

                <label htmlFor="productCategory">Category:</label>
                <select
                    id="productCategory"
                    name="productCategory"
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                >
                    {!isEmpty(categories) ? (
                        categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))
                    ) : (
                        <option value="">Loading categories...</option>
                    )}
                </select>

                <label htmlFor="productImage">Image:</label>
                <input
                    type="file"
                    id="productImage"
                    name="productImage"
                    onChange={(e) => setProductImage(e.target.files[0])}
                />

                <button type="submit">Modify product</button>
            </form>

            {responseMessage && <p>{responseMessage}</p>}
            {errorMessage && <p> {errorMessage}</p>}
        </div>
    );
};

export default AdminModifyProduct;
