import { useState, useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvider";
import { addComment } from "../../api/commentApi";

// Component to add a comment for a specific product
const AddComment = () => {
  const [content, setContent] = useState(""); // Manages comment content
  const { auth } = useContext(AuthContext); // Retrieves user authentication info
  const userId = auth.userId; // Gets the current user's ID

  const { productDetailId } = useParams(); // Retrieves product ID from URL parameters
  const queryClient = useQueryClient(); // QueryClient instance for cache management

  // Mutation for adding a comment
  const mutation = useMutation({
    mutationFn: addComment,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries(["comments", productDetailId]); // Refreshes comments for the product
        setContent(""); // Clears the input field
        toast.success(data.message || "Comment added successfully."); // Success notification
      } else {
        toast.error(data.message || "An error has occurred."); // Error notification
      }
    },
    onError: (error) => {
      toast.error("Server error: " + error.message); // Error handling on failure
    },
  });

  // Handles form submission to add a new comment
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      content,
      userId,
      productId: productDetailId,
    };

    mutation.mutate(formData); // Triggers the mutation with form data
  };

  // If user is not logged in, show login prompt
  if (!userId) {
    return (
      <div className="comment__login-link">
        <p>Login to write a comment</p>
        <Link className="comment__link" to="/login">
          Login
        </Link>
      </div>
    );
  }

  // Render form to add a comment if user is logged in
  return (
    <>
      <h3>Give your opinion</h3>

      <form onSubmit={handleSubmit}>
        <input type="hidden" value={productDetailId} />{" "}
        {/* Hidden input for product ID */}
        <div className="comments__input-container">
          <label htmlFor="content">Message</label>
          <textarea
            name="content"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            aria-required="true"
            aria-describedby="content-desc"
          ></textarea>

          <div id="content-desc" className="visually-hidden">
            Enter your message to give your opinion on the product.
          </div>
        </div>
        <div className="comments__button">
          <button type="submit">Send</button>
        </div>
      </form>
    </>
  );
};

export default AddComment;
