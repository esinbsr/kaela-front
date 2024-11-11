import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import AdminNavigation from "../AdminNavigation";
import { toast } from "react-toastify";
import { getCategoryById, updateCategory } from "../../../api/categoryApi";
import "../../../assets/styles/components/_form-admin.scss";

const UpdateCategory = () => {
  // UseEffect hook to scroll to the top of the page when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { categoryId } = useParams(); // Get the id of the category from the route params

  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryPageTitle, setCategoryPageTitle] = useState("");
  const [categoryPageDescription, setCategoryPageDescription] = useState("");

  const queryClient = useQueryClient();

  // Fetch category data by id when the component mounts
  useQuery({
    queryKey: ["categories", categoryId], // Unique query key for the category
    queryFn: () => getCategoryById(categoryId), // Api call to fetch category details
    onSuccess: (data) => {
      // Populate the state with the fetched category data
      if (data) {
        setCategoryName(data.name || "");
        setCategoryDescription(data.description || "");
        setCategoryPageTitle(data.page_title || "");
        setCategoryPageDescription(data.page_description || "");
      }
    },
    // Display an error toast if the Api call fails
    onError: (error) => {
      toast.error("Error fetching category: " + error.message);
    },
  });

  // Mutation to update the category
  const mutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries("categories"); // Invalidate the cache to refetch updated data
        toast.success(data.message || "Category updated successfully!");
      } else {
        toast.error(data.message || "An error occurred during the update.");
      }
    },
    // Display an error toast if the mutation fails
    onError: (error) => {
      toast.error("Server error: " + error.message);
    },
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Trigger the mutation to update the category with the current state values
    mutation.mutate({
      id: categoryId,
      name: categoryName,
      description: categoryDescription,
      page_title: categoryPageTitle,
      page_description: categoryPageDescription,
    });
  };

  return (
    <div className="navigation-and-content">
      <AdminNavigation />
      <div className="content-wrapper">
        <h2>Modify the category</h2>
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="categoryName">Category name:</label>
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

          <button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
