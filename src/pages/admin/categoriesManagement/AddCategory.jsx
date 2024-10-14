import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { addCategory } from "../../../api/categoryApi";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryPageTitle, setCategoryPageTitle] = useState("");
  const [categoryPageDescription, setCategoryPageDescription] = useState("");

  const queryClient = useQueryClient();

  // Mutation for adding a new category
  const mutation = useMutation({
    mutationFn: addCategory,
    onSuccess: (data) => {
       // If successful, invalidate the 'categories' query and reset the form
      if (data.success) {
        queryClient.invalidateQueries('categories'); 
        setCategoryName("");
        setCategoryDescription("");
        setCategoryPageTitle("");
        setCategoryPageDescription("");
        toast.success(data.message || "Category added successfully!");
      } else {
        toast.error(data.message || "An error has occurred.");
      }
    },
    // Handle server errors
    onError: (error) => {
      toast.error("Server error: " + error.message);
    }
  });

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      categoryName,
      categoryDescription,
      categoryPageTitle,
      categoryPageDescription,
    };
    
    // Trigger the mutation with form data
    mutation.mutate(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <fieldset>
          <legend>Add a new category</legend>
          <div className="form__group">
            <label htmlFor="categoryName">Category name</label> 
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
            <label htmlFor="categoryDescription">Description</label> 
            <textarea
              id="categoryDescription"
              name="categoryDescription"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              aria-required="true"
            ></textarea>
          </div>

          <div className="form__group">
            <label htmlFor="categoryPageTitle">Page title</label>
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
            <label htmlFor="categoryPageDescription">Page description</label>
            <textarea
              id="categoryPageDescription"
              name="categoryPageDescription"
              value={categoryPageDescription}
              onChange={(e) => setCategoryPageDescription(e.target.value)}
              aria-required="true"
            ></textarea>
          </div>

          <div className="form__button">
            <button type="submit" disabled={mutation.isLoading}>
              {mutation.isLoading ? "Creating..." : "Create"} 
            </button>
          </div>
        </fieldset>
      </form>

      <ToastContainer />
    </>
  );
};

export default AddCategory;
