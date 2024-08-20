import { useSelector } from "react-redux";
import AdminProductCard from "../../../components/admin/products/AdminProductCard";
import AdminAddProduct from "./AdminAddProduct";
import { isEmpty } from "../../../components/utils/isEmpty";
import AdminNavigation from "../AdminNavigation";

const AdminProduct = () => {
  const products = useSelector((state) => state.product.products);

  return (
    <div className="admin-container">
      <AdminNavigation />
      <div className="admin-container__content">
        <h1>Products</h1>
        <AdminAddProduct />
        <div className="table-container">
          <table className="table">
            <caption>List of products</caption>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Categorie</th>
                <th>Section</th>
                <th className="action-header" colSpan={2}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {!isEmpty(products) ? (
                products
                  .slice()
                  .sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                  )
                  .map(
                    (product) =>
                      !isEmpty(product) && (
                        <AdminProductCard key={product.id} product={product} />
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
      </div>
    </div>
  );
};

export default AdminProduct;
