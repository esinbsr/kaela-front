import axios from "axios";
import { useState, useEffect } from "react";
import Navigation from "../../components/Navigation";
import { useParams } from "react-router-dom";

const AdminModifyProduct = () => {
  const { productId } = useParams();

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost/travail-perso/kaela-couture/getProduct/${productId}`
      );
      console.log(response);

      if (response.data.success) {
        const product = response.data.product;
        setProductName(product.name);
        setProductDescription(product.description);
        setProductCategory(product.categorie_id);
      } else {
        setResponseMessage("Failed to fetch product");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setResponseMessage("Error fetching product");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost/travail-perso/kaela-couture/getCategorie"
      );

      if (response.data.success) {
        setCategories(response.data.categories);
      } else {
        setResponseMessage("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setResponseMessage("Error fetching categories");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("productName", productName);
    formData.append("productDescription", productDescription);
    formData.append("productCategory", productCategory);
    formData.append("productImage", productImage);

    try {
      const response = await axios.post(
        `http://localhost/travail-perso/kaela-couture/updateProduct`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Backend response:", response.data);
      const message = response.data.message || "No message returned";
      setResponseMessage(message);
    } catch (error) {
      console.error("Error submitting form:", error);
      setResponseMessage("Error submitting form");
    }
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
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
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

        <button type="submit">Modify product</button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default AdminModifyProduct;
