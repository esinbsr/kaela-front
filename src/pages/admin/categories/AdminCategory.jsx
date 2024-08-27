import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductCategories,
  deleteCategory,
} from "../../../actions/categoryAction";
import AdminCategoryCard from "../../../components/admin/categories/AdminCategoryCard";
import AdminAddCategory from "./AdminAddCategory";
import { isEmpty } from "../../../components/utils/isEmpty";
import AdminNavigation from "../AdminNavigation";
import ModalAdmin from "../../../components/utils/ModalAdmin";

const AdminCategory = () => {
  const dispatch = useDispatch(); // Initialize Redux dispatch function
  const categories = useSelector((state) => state.category.category); // Select categories from Redux store

  const [modalShow, setModalShow] = useState(false); // State to control the visibility of the modal
  const [selectedCategory, setSelectedCategory] = useState(null); // State to track the selected category for deletion

  // Fetch categories on component mount or when categories array changes
  useEffect(() => {
    if (isEmpty(categories)) {
      dispatch(getProductCategories()); // Dispatch action to fetch categories if they are not already loaded
    }
  }, [dispatch, categories]);

  // Handler to open the delete confirmation modal and set the category to be deleted
  const handleDelete = (category) => {
    setSelectedCategory(category);
    setModalShow(true);
  };

  // Confirm deletion of the selected category
  const confirmDelete = () => {
    if (selectedCategory && selectedCategory.id) {
      // Ensure selectedCategory is defined and has an id
      dispatch(deleteCategory(selectedCategory.id)); // Dispatch action to delete the category
    }
    setModalShow(false); // Close the modal
    setSelectedCategory(null); // Reset selected category
  };

  // Cancel deletion and close the modal
  const cancelDelete = () => {
    setModalShow(false);
    setSelectedCategory(null);
  };

  return (
    <div className="admin-container">
      <AdminNavigation />

      <main className="admin-container__content">
        <h1>Categories</h1>

        <AdminAddCategory />

        <section className="table">
          <h2>List of Categories</h2>

          <div className="table__container">
            <table className="table__content">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Page Title</th>
                  <th scope="col">Page Description</th>
                  <th scope="col" className="action-header" colSpan={2}>
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {!isEmpty(categories) ? (
                  // Map through categories and render a row for each
                  categories.map((category) => (
                    <AdminCategoryCard
                      key={category.id}
                      category={category}
                      onDelete={() => handleDelete(category)} // Pass delete handler as prop
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      style={{ textAlign: "center" }}
                      role="alert"
                    >
                      There are no categories
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      {modalShow && selectedCategory && (
        <ModalAdmin
          contentSuffix={`category: ${selectedCategory.name || "Unknown"}`} // Handle undefined names gracefully
          onConfirm={confirmDelete} // Pass confirm handler to the modal
          onCancel={cancelDelete} // Pass cancel handler to the modal
        />
      )}
    </div>
  );
};

export default AdminCategory;
