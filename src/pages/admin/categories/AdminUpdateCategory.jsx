import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCategoryById, updateCategory } from "../../../actions/categoryAction";
import AdminNavigation from "../AdminNavigation";
import Message from "../../../components/utils/Message";

const AdminUpdateCategory = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();

  const categoryById = useSelector((state) => state.category.categoryById);

  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryPageTitle, setCategoryPageTitle] = useState("");
  const [categoryPageDescription, setCategoryPageDescription] = useState("");

  const message = useSelector((state) => state.category.message);
  const error = useSelector((state) => state.category.error);

  useEffect(() => {
    if (categoryId) {
      dispatch(getCategoryById(categoryId));
    } 
    window.scrollTo(0, 0);
  }, [dispatch, categoryId]);

  useEffect(() => {
    if (categoryById) {
      setCategoryName(categoryById.name);
      setCategoryDescription(categoryById.description);
      setCategoryPageTitle(categoryById.page_title);
      setCategoryPageDescription(categoryById.page_description);
    }
  }, [categoryById]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      id: categoryId,
      name: categoryName,
      description: categoryDescription,
      page_title: categoryPageTitle ,
      page_description: categoryPageDescription
    };

    dispatch(updateCategory(formData));
  };

  return (
    <div className="admin-container">
      <AdminNavigation />
      <div className="admin-container__content">

          <form onSubmit={handleSubmit} className="form">
            <fieldset>
              <legend>Update Category</legend>
  
              <div className="form__group">
                <label htmlFor="categoryName">Name of category:</label>
                <input
                  id="categoryName"
                  type="text"
                  name="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
  
              <div className="form__group">
                <label htmlFor="categoryDescription">Description:</label>
                <textarea
                  id="categoryDescription"
                  name="categoryDescription"
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                ></textarea>
              </div>
  
              <div className="form__group">
                <label htmlFor="categoryPageTitle">Page title:</label>
                <input
                  id="categoryPageTitle"
                  type="text"
                  name="categoryPageTitle"
                  value={categoryPageTitle}
                  onChange={(e) => setCategoryPageTitle(e.target.value)}
                />
              </div>
  
              <div className="form__group">
                <label htmlFor="categoryPageDescription">Page description:</label>
                <textarea
                  id="categoryPageDescription"
                  name="categoryPageDescription"
                  value={categoryPageDescription}
                  onChange={(e) => setCategoryPageDescription(e.target.value)}
                ></textarea>
              </div>
  
              <div className="form__button">
                <button type="submit">Update</button>
              </div>
            </fieldset>
          </form>
          {message && <Message message={message} type="success" />}
          {error && <Message message={error} type="error" />}
        </div>
      </div>
  );
  
  
};

export default AdminUpdateCategory;
