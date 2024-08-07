import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../actions/productAction";
import AdminProductCard from "../../../components/admin/products/AdminProductCard";
import { isEmpty } from "../../../components/Utils";
import AdminAddProduct from "./AdminAddProduct";
import Breadcrumb from "../../../components/utils/Breadcrumb";


const AdminProduct = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <div>
      <Breadcrumb />
      <h1>Products</h1>
      <AdminAddProduct/>
      
      <div className="table-container">
        <table className="table">
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
              .slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((product) => 
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
     
    </div>
  );
};

export default AdminProduct;
