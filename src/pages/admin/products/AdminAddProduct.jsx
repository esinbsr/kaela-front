import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  getProduct
} from "../../../actions/productAction";
import { getProductCategories } from "../../../actions/categoryAction";
import { getSection } from "../../../actions/sectionAction";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const AdminAddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productSection, setProductSection] = useState("");
  const [productImage, setProductImage] = useState(null);

  const fileInputRef = useRef(null);

  const dispatch = useDispatch();

  const categories = useSelector((state) => state.category.category);
  const section = useSelector((state) => state.section.section);

  const message = useSelector((state) => state.product.message);
  const error = useSelector((state) => state.product.error);

  useEffect(() => {
    dispatch(getProductCategories());
    dispatch(getSection());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0) {
      setProductCategory(categories[0].id);
    }
    if (section.length > 0) {
      setProductSection(section[0].id);
    }
  }, [categories, section]);

  useEffect(() => {
    if (message && !error) {
      toast.success(message);

      setProductName("");
      setProductDescription("");
      setProductCategory(categories[0].id || "");
      setProductSection(section[0].id || "");
      setProductImage(null);
      fileInputRef.current.value = "";

      dispatch(getProduct()); 
    } else if (error) {
      toast.error(error);
    }
  }, [message, error, dispatch, categories, section]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productDescription", productDescription);
    formData.append("productCategory", productCategory);
    formData.append("productSection", productSection);
    formData.append("productImage", productImage);

    dispatch(addProduct(formData));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <fieldset>
          <legend> Add a new product</legend>

          <div className="form__group">
            <label htmlFor="productName">Name of product</label>
            <input
              id="productName"
              type="text"
              name="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              aria-required="true"
            />
          </div>

          <div className="form__group">
            <label htmlFor="productDescription">Description</label>
            <textarea
              id="productDescription"
              name="productDescription"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              aria-required="true"
            ></textarea>
          </div>

          <div className="form__group">
            <label htmlFor="productCategory">Category</label>
            <select
              id="productCategory"
              name="productCategory"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              aria-required="true"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form__group">
            <label htmlFor="productSection">Section</label>
            <select
              id="productSection"
              name="productSection"
              value={productSection}
              onChange={(e) => setProductSection(e.target.value)}
              aria-required="true"
            >
              {section.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form__group">
            <label htmlFor="productImage">Image</label>
            <input
              type="file"
              id="productImage"
              name="productImage"
              ref={fileInputRef}
              onChange={(e) => setProductImage(e.target.files[0])}
              aria-required="true"
            />
          </div>

          <div className="form__button">
            <button type="submit">Create</button>
          </div>
        </fieldset>
      </form>

      <ToastContainer />
    </>
  );
};

export default AdminAddProduct;
