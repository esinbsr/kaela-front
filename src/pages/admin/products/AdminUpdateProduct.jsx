import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../../../actions/productAction";

const AdminUpdateProduct = () => {

    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productSection, setProductSection] = useState('');
    const [productImage, setProductImage] = useState(null);

    const { productId } = useParams();
    const dispatch = useDispatch();

    const productById = useSelector((state) => state.product.productById);
    const categories = useSelector((state) => state.category.category);
    const section = useSelector((state) => state.section.section);
    
    const responseMessage = useSelector((state) => state.product.message);
    const errorMessage = useSelector((state) => state.product.error);

    useEffect(() => {
        if (productId) { // si l'id du produit est définit, ca veut dire que il y a un ID de produit valide pour lequel je dois récupérer les détails
            dispatch(getProductById(productId)); // envoie une requête pour récupérer les détails du produit.
        }
    }, [dispatch, productId]); // puisque dispatch est utilisé à l'intérieur du hook, il doit être inclus dans le tableau des dépendances pour que React sache qu'il doit re-exécuter l'effet si dispatch change

    useEffect(() => {
        if (productById) { // productById contient les détails du produit récupéré à partir de l'état global via Redux
            setProductName(productById.name);
            setProductDescription(productById.description);
            setProductCategory(productById.categorie_id);
            setProductSection(productById.section_id);
        }
    }, [productById]); //l'effet ne s'exécutera que lorsque productById change

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("productId", productId);
        formData.append("productName", productName);
        formData.append("productDescription", productDescription);
        formData.append("productCategory", productCategory);
        formData.append("productSection", productSection);
        formData.append("productImage", productImage);

        dispatch(updateProduct(formData));
    };

    return (
        <div>
            <h1>Update Product</h1>
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
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>


                <label htmlFor="productSection">Section:</label>
                <select
                    id="productSection"
                    name="productSection"
                    value={productSection}
                    onChange={(e) => setProductSection(e.target.value)}
                >
                    {section.map((section) => (
                        <option key={section.id} value={section.id}>
                            {section.name}
                        </option>
                    ))}
                </select>

                <label htmlFor="productImage">Image:</label>
                <input
                    type="file"
                    id="productImage"
                    name="productImage"
                    onChange={(e) => setProductImage(e.target.files[0])}
                />

                <button type="submit">Modify</button>
            </form>

            {responseMessage && <p>{responseMessage}</p>}
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default AdminUpdateProduct;
