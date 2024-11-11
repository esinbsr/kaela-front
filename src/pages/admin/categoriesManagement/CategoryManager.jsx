import { useEffect } from "react";
import AdminNavigation from "../AdminNavigation";
import AddCategory from "./AddCategory";
import DisplayCategory from "./DisplayCategory";
import "../../../assets/styles/components/_table-admin.scss";
import "../../../assets/styles/components/_form-admin.scss";

// This component manages categories by rendering a navigation bar and two child components: one for adding a category and another for displaying existing categories
const CategoryManager = () => {
  // UseEffect hook to scroll to the top of the page when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="navigation-and-content">
      <AdminNavigation />
      <div className="content-wrapper">
        <AddCategory />
        <DisplayCategory />
      </div>
    </div>
  );
};

export default CategoryManager;
