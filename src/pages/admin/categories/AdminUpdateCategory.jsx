import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCategoryById, updateCategory } from "../../../actions/categoryAction";

const AdminUpdateCategory = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();

  const categoryById = useSelector((state) => state.category.categoryById);

  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryPageTitle, setCategoryPageTitle] = useState("");
  const [categoryPageDescription, setCategoryPageDescription] = useState("");

  const responseMessage = useSelector((state) => state.category.message);
  const error = useSelector((state) => state.category.error);

  useEffect(() => {
    if (categoryId) {
      dispatch(getCategoryById(categoryId));
    } else {
      console.log('Category ID is missing');
    }
  }, [dispatch, categoryId]);

  useEffect(() => {
    if (categoryById) {
      setCategoryName(categoryById.name || "");
      setCategoryDescription(categoryById.description || "");
      setCategoryPageTitle(categoryById.page_title || "");
      setCategoryPageDescription(categoryById.page_description || "");
    }
  }, [categoryById]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      id: categoryId,
      name: categoryName || categoryById.name,
      description: categoryDescription || categoryById.description,
      page_title: categoryPageTitle || categoryById.page_title,
      page_description: categoryPageDescription || categoryById.page_description
    };

    dispatch(updateCategory(formData));
  };

  return (
    <div>
      <h1>Update category</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="categoryName">Name of category:</label>
        <input
          id="categoryName"
          type="text"
          name="categoryName"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />

        <label htmlFor="categoryDescription">Description:</label>
        <textarea
          id="categoryDescription"
          name="categoryDescription"
          value={categoryDescription}
          onChange={(e) => setCategoryDescription(e.target.value)}
        ></textarea>

        <label htmlFor="categoryPageTitle">Page title:</label>
        <input
          id="categoryPageTitle"
          type="text"
          name="categoryPageTitle"
          value={categoryPageTitle}
          onChange={(e) => setCategoryPageTitle(e.target.value)}
        />

        <label htmlFor="categoryPageDescription">Page description:</label>
        <textarea
          id="categoryPageDescription"
          name="categoryPageDescription"
          value={categoryPageDescription}
          onChange={(e) => setCategoryPageDescription(e.target.value)}
        ></textarea>

        <button type="submit">Update category</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default AdminUpdateCategory;
