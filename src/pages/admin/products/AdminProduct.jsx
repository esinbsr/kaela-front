import { useEffect } from "react";
import Navigation from "../../../components/Navigation";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../actions/productAction";
import AdminProductCard from "../../../components/admin/products/AdminProductCard";

const AdminProduct = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

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
            {products.length > 0 ? (
              products.map((product) => (
                <AdminProductCard
                  key={product.id}
                  product={product}
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
    </div>
  );
};

export default AdminProduct;
