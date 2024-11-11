import { useEffect } from "react";
import AdminNavigation from "../AdminNavigation";
import AddProduct from "./AddProduct";
import DisplayProduct from "./DisplayProduct";
import "../../../assets/styles/components/_table-admin.scss";
import "../../../assets/styles/components/_form-admin.scss";

// This component manages products by rendering a navigation bar and two child components: one for adding a product and another for displaying existing products
const ProductManager = () => {
  // UseEffect hook to scroll to the top of the page when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="navigation-and-content">
      <AdminNavigation />
      <div className="content-wrapper">
        <AddProduct />
        <DisplayProduct />
      </div>
    </div>
  );
};

export default ProductManager;
