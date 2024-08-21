import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../../../actions/productAction";
import AdminNavigation from "../AdminNavigation";
import { API_URL } from "../../../actions/serverRequest";

const AdminUpdateProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productSection, setProductSection] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(""); // Ajoutez un état pour stocker l'image actuelle

  const { productId } = useParams();
  const dispatch = useDispatch();

  const productById = useSelector((state) => state.product.productById);
  const categories = useSelector((state) => state.category.category);
  const section = useSelector((state) => state.section.section);

  const responseMessage = useSelector((state) => state.product.message);
  const errorMessage = useSelector((state) => state.product.error);

  useEffect(() => {
    if (productId) {
      dispatch(getProductById(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (productById) {
      setProductName(productById.name);
      setProductDescription(productById.description);
      setProductCategory(productById.categorie_id);
      setProductSection(productById.section_id);
      setCurrentImage(productById.path); // Récupérez et stockez le chemin de l'image actuelle
    }
  }, [productById]);

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
    <div className="admin-container">
      <AdminNavigation />
      <div className="admin-container__content">
        <h1>Update product</h1>
        <div className="form">
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

            <label htmlFor="productImage">Current image:</label>
            {currentImage && (
              <div>
                <img
                  src={`${API_URL}assets/img/${currentImage}`}
                  alt="Current Product"
                  style={{ width: "150px", marginBottom: "10px" }}
                />
                <input
                  type="file"
                  id="productImage"
                  name="productImage"
                  onChange={(e) => setProductImage(e.target.files[0])}
                />
              </div>
            )}

            <button type="submit">Update</button>
          </form>
          {responseMessage && <p>{responseMessage}</p>}
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminUpdateProduct;
