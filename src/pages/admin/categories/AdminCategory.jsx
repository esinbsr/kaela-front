import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductCategories } from "../../../actions/categoryAction";
import AdminCategoryCard from "../../../components/admin/categories/AdminCategoryCard";
import AdminAddCategory from "./AdminAddCategory";
import { isEmpty } from "../../../components/utils/isEmpty";
import AdminNavigation from "../AdminNavigation";

const AdminCategory = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.category);

  useEffect(() => {
    dispatch(getProductCategories());
  }, [dispatch]);

  return (
    <div className="admin-container">
      <AdminNavigation />
      <div className="admin-container__content">
        <h1>Categories</h1>
        <AdminAddCategory />
        <div className="table">
          <h3>List of categories</h3>
          <div className="table__container">
            <table className="table__content">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Page Title</th>
                  <th>Page Description</th>
                  <th className="action-header" colSpan={2}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {!isEmpty(categories) ? (
                  categories.map(
                    (category) =>
                      !isEmpty(category) && (
                        <AdminCategoryCard
                          key={category.id}
                          category={category}
                        />
                      )
                )
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    There are no categories
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategory;
