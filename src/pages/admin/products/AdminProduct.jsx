import { useDispatch, useSelector } from "react-redux";
import AdminAddProduct from "./AdminAddProduct";
import { isEmpty } from "../../../components/utils/isEmpty";
import AdminNavigation from "../AdminNavigation";
import { useEffect, useState } from "react";
import { getProduct, deleteProduct } from "../../../actions/productAction";
import ModalAdmin from "../../../components/utils/ModalAdmin";
import ProductCard from "../../../components/admin/ProductCard"


const AdminProduct = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  const [modalShow, setModalShow] = useState(false);  // State to control the visibility of the modal
  const [selectedProduct, setSelectedProduct] = useState(null);  // State to track the selected product for deletion

  useEffect(() => {
    if(isEmpty(products)) {
      dispatch(getProduct());  // Fetch products when the component mounts
    }
    }, [dispatch, products]);

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setModalShow(true);
  };

  // Confirm deletion of the selected product
  const confirmDelete = () => {
    if (selectedProduct) {
      dispatch(deleteProduct(selectedProduct.id)); 
    }
    setModalShow(false);  // Close the modal
    setSelectedProduct(null);  // Reset selected product
  };

  // Cancel deletion and close the modal
  const cancelDelete = () => {
    setModalShow(false);
    setSelectedProduct(null);
  };

  return (
    <div className="admin-container">
      <AdminNavigation />
      <main className="admin-container__content">
        <h1>Products</h1>
        <AdminAddProduct />
        <section className="table">
          <h2>List of products</h2>
          <div className="table__container">
            <table className="table__content">
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Category</th>
                  <th scope="col">Section</th>
                  <th scope="col" className="action-header" colSpan={2}>
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
                          <ProductCard
                            key={product.id}
                            product={product}
                            onDelete={() => handleDelete(product)} 
                          />
                        )
                    )
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }} role="alert">
                      There are no products
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {modalShow && (
        <ModalAdmin
          contentSuffix={`product: ${selectedProduct?.name}`}  // Pass product name to the modal for display
          onConfirm={confirmDelete}  // Pass confirm handler to the modal
          onCancel={cancelDelete}  // Pass cancel handler to the modal
        />
      )}
    </div>
  );
};

export default AdminProduct;
