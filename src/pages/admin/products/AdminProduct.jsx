import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../actions/productAction";
import AdminProductCard from "../../../components/admin/products/AdminProductCard";
import { isEmpty } from "../../../components/Utils";

const AdminProduct = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <div>
      <h1>List of products</h1>
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
            {!isEmpty(products) ? (
              products.map((product) => 
                !isEmpty(product) && (
                  <AdminProductCard 
                      key={product.id} 
                      product={product} />
                )
              )
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
