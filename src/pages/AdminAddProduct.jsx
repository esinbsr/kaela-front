import axios from "axios";
import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";

const AdminAddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost/travail-perso/kaela-couture/getCategorie"
        );

        if (response.data.success) {
          setCategories(response.data.categories);

          if (response.data.categories.length > 0) {
            setProductCategory(response.data.categories[0].id);
          }
        } else {
          setResponseMessage("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setResponseMessage("Error fetching categories");
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !productDescription || !productCategory || !productImage) {
      setResponseMessage("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productDescription", productDescription);
    formData.append("productCategory", productCategory);
    formData.append("productImage", productImage);

    try {
      const response = await axios.post(
        "http://localhost/travail-perso/kaela-couture/adminAddProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const message = response.data.message || "No message returned";
      setResponseMessage(message);

      setProductName("");
      setProductDescription("");
      setProductCategory(categories.length > 0 ? categories[0].id : ""); // Réinitialisez avec un ID valide
      setProductImage(null);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      setResponseMessage("Error submitting form");
    }
  };

  return (
    <div>
        <Navigation/>
      <h2>Add a product</h2>
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
        
        <button type="submit">Create product</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default AdminAddProduct;
