import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  resetCategoryMessages,
} from "../../../actions/categoryAction";
import Message from "../../../components/utils/Message";

const AdminAddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryPageTitle, setCategoryPageTitle] = useState("");
  const [categoryPageDescription, setCategoryPageDescription] = useState("");

  const message = useSelector((state) => state.category.message);
  const error = useSelector((state) => state.category.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetCategoryMessages());
  }, [dispatch]);

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
    if (message && !error) {
      setCategoryName("");
      setCategoryDescription("");
      setCategoryPageTitle("");
      setCategoryPageDescription("");
    }
  }, [message, error]);

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <fieldset>
          <legend>Category Details</legend>
          <div className="form__group">
            <label htmlFor="categoryName">Name of category:</label>
            <input
              id="categoryName"
              type="text"
              name="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              aria-required="true"
            />
          </div>

          <div className="form__group">
            <label htmlFor="categoryDescription">Description:</label>
            <textarea
              id="categoryDescription"
              name="categoryDescription"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              aria-required="true"
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
              aria-required="true"
            />
          </div>

          <div className="form__group">
            <label htmlFor="categoryPageDescription">Page description:</label>
            <textarea
              id="categoryPageDescription"
              name="categoryPageDescription"
              value={categoryPageDescription}
              onChange={(e) => setCategoryPageDescription(e.target.value)}
              aria-required="true"
            ></textarea>
          </div>

          <div className="form__button">
          <button type="submit">Create</button>
          </div>

        </fieldset>
      </form>

      {message && <Message message={message} type="success" />}
      {error && <Message message={error} type="error" />}
    </>
  );
};

export default AdminAddCategory;
