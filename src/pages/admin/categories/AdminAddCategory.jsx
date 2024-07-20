import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../../actions/categoryAction";

const AdminAddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryPageTitle, setCategoryPageTitle] = useState("");
  const [categoryPageDescription, setCategoryPageDescription] = useState("");

  const responseMessage = useSelector((state) => state.category.message);
  const error = useSelector((state) => state.category.error);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      categoryName,
      categoryDescription,
      categoryPageTitle,
      categoryPageDescription,
    };

    dispatch(addCategory(formData));

  };

  useEffect(() => {
    if (responseMessage && !error) {
      setCategoryName("");
      setCategoryDescription("");
      setCategoryPageTitle("");
      setCategoryPageDescription("");
    }
  }, [responseMessage, error]);

  return (
    <div>
      {/* <h1>Add a category</h1> */}
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

        <button type="submit">Create category</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default AdminAddCategory;
