import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getComment, updateComment } from "../../api/commentApi";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvider";
import DeleteComment from "./DeleteComment";

// Component to display and manage comments for a specific product
const CommentDisplay = () => {
  const { productDetailId } = useParams(); // Get the product ID from URL
  const queryClient = useQueryClient(); // For cache management and refreshing
  const { auth } = useContext(AuthContext); // Get authentication details
  const userId = auth.userId; // Get current user's ID

  // Query to fetch comments for the product
  const {
    data: comments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comments", productDetailId],
    queryFn: () => getComment(productDetailId),
  });

  const [showAllComments, setShowAllComments] = useState(false); // Controls comment display limit
  const [editingCommentId, setEditingCommentId] = useState(null); // Manages edit mode for a comment
  const [editedContent, setEditedContent] = useState(""); // Stores edited comment content

  const handleToggleComments = () => {
    setShowAllComments(!showAllComments); // Toggle between all and limited comments
  };

  // Show all comments if `showAllComments` is true; otherwise, limit to 5
  const displayedComments = showAllComments ? comments : comments.slice(0, 5);

  // Enables edit mode for a specific comment
  const handleEditClick = (comment) => {
    setEditingCommentId(comment.id);
    setEditedContent(comment.content);
  };
  
  // Mutation to handle comment updates
  const mutation = useMutation({
    mutationFn: updateComment,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries(["comments", productDetailId]); // Refresh comments after update
        setEditingCommentId(null);
        setEditedContent("");
        toast.success(data.message); // Show success message
      } else {
        toast.error(data.message); // Show error message on failure
      }
    },
    onError: (error) => {
      toast.error("Server error: " + error.message); // Handle server errors
    },
  });

  // Saves the edited comment
  const handleSaveClick = (commentId) => {
    mutation.mutate({ id: commentId, content: editedContent });
  };

  // Cancels the edit mode and clears edited content
  const handleCancelClick = () => {
    setEditingCommentId(null);
    setEditedContent("");
  };

  if (isLoading) return <p role="status"> Loading...</p>; // Show loading state
  if (error) return <p role="alert"> An error occurred: {error.message}</p>; // Show error state

  return (
    <div className="comments">
      {comments.length > 0 ? (
        displayedComments.map((comment) => (
          <div key={comment.id} className="comments__username-content">
            <div className="comments__header">
              <h4 className="comments__username">
                {comment.username ? comment.username : "User Deleted"}{" "}
                {/* Display username or fallback text */}
              </h4>
              {comment.user_id === userId && (
                <div className="comments__icons">
                  <FaEdit
                    onClick={() => handleEditClick(comment)} // Enable edit mode
                    aria-label="Edit comment"
                    className="edit-icon"
                  />
                  <DeleteComment commentId={comment.id} /> {/* Delete button */}
                </div>
              )}
            </div>

            {editingCommentId === comment.id ? (
              <>
                <textarea
                  className="comment__edit-textarea"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <div className="comments__button-group">
                  <button
                    onClick={() => handleSaveClick(comment.id)}
                    disabled={mutation.isLoading}
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelClick}
                    disabled={mutation.isLoading}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="comment__content">{comment.content}</p>{" "}
                <p className="comment__date">
                  Posted on {new Date(comment.created_at).toLocaleDateString()}
                </p>
              </>
            )}
          </div>
        ))
      ) : (
        <p className="p-no-comments">
          There are currently no comments, so be the first to write one!
        </p>
      )}

      {comments.length > 5 && (
        <button
          onClick={handleToggleComments}
          aria-expanded={showAllComments}
          aria-label={
            showAllComments ? "Show less comments" : "Show more comments"
          }
          className="comments__toggle-button"
        >
          {showAllComments ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
};

export default CommentDisplay;
