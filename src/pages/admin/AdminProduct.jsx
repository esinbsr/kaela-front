import { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "../../components/Navigation";
import AdminProductCard from "../../components/AdminProductCard";
import { Link } from "react-router-dom";

const AdminProduct = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [productServer, setProductServer] = useState([]);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        "http://localhost/travail-perso/kaela-couture/productDisplay"
      );
      if (response.data.success) {
        setProductServer(response.data.products);
        if (response.data.products.length === 0) {
          setResponseMessage("There are no products");
        }
      } else {
        setResponseMessage("Product loading failure");
      }
    } catch (error) {
      console.error("Error when loading products:", error);
      setResponseMessage("Error when loading products");
    }
  };

  const handleDelete = (productId) => {
    setProductServer(
      productServer.filter((product) => product.id !== productId)
    );
  };

  return (
    <div>
      <Navigation />
      <h2>List of products</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Categorie</th>
              <th className="action-header" colSpan={2}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {productServer.length > 0 ? (
              productServer.map((product) => (
                <AdminProductCard
                  key={product.id}
                  product={product}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  There are no products
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
        <Link to="/adminAddProduct">Add a new product</Link>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default AdminProduct;
