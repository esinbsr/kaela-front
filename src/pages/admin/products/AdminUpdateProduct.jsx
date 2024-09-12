import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../../../actions/productAction";
import AdminNavigation from "../AdminNavigation";
import { API_URL } from "../../../actions/serverRequest";
import Message from "../../../components/utils/Message";
import { getProductCategories } from "../../../actions/categoryAction";
import { getSection } from "../../../actions/sectionAction";

const AdminUpdateProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productSection, setProductSection] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");

  const { productId } = useParams();
  const dispatch = useDispatch();

  const productById = useSelector((state) => state.product.productById);
  const categories = useSelector((state) => state.category.category);
  const section = useSelector((state) => state.section.section);

  const message = useSelector((state) => state.product.message);
  const error = useSelector((state) => state.product.error);

  useEffect(() => {
    if (productId) {
      dispatch(getProductById(productId));
    }
    dispatch(getProductCategories());
    dispatch(getSection());
    window.scrollTo(0, 0);
  }, [dispatch, productId]);

  useEffect(() => {
    if (productById) {
      setProductName(productById.name ?? "" );
      setProductDescription(productById.description ?? "");
      setProductCategory(productById.categorie_id ?? "");
      setProductSection(productById.section_id ?? "");
      setCurrentImage(productById.path ?? "");
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
    if (productImage) {
      formData.append("productImage", productImage);
    }

    dispatch(updateProduct(formData));
  };

  return (
    <div className="admin-container">
      <AdminNavigation />
      <div className="admin-container__content">
        <form onSubmit={handleSubmit} className="form">
          <fieldset>
            <legend>Update Product</legend>

            <div className="form__group">
              <label htmlFor="productName">Name of product:</label>
              <input
                id="productName"
                type="text"
                name="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            <div className="form__group">
              <label htmlFor="productDescription">Description:</label>
              <textarea
                id="productDescription"
                name="productDescription"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="form__group">
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
            </div>

            <div className="form__group">
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
            </div>

            <div className="form__group">
              <label htmlFor="productImage">Current image:</label>
              <div className="form__image-upload">
                {currentImage && (
                  <img
                    src={`${API_URL}assets/img/${currentImage}`}
                    alt={`Image of ${productById.name}`}
                  />
                )}
                <input
                  type="file"
                  id="productImage"
                  name="productImage"
                  onChange={(e) => setProductImage(e.target.files[0])}
                />
              </div>
            </div>

            <div className="form__button">
              <button type="submit">Update</button>
            </div>
          </fieldset>
        </form>

        {message && <Message message={message} type="success" />}
        {error && <Message message={error} type="error" />}
      </div>
    </div>
  );
};

export default AdminUpdateProduct;
