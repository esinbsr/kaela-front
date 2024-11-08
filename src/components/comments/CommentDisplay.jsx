import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getComment, updateComment } from "../../api/commentApi";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvider"; 
import DeleteComment from "./DeleteComment";

const CommentDisplay = () => {
  const { productDetailId } = useParams();
  const queryClient = useQueryClient();
  const { auth } = useContext(AuthContext); 
  const userId = auth.userId; 

  const { data: comments = [], isLoading, error } = useQuery({
    queryKey: ['comments', productDetailId],
    queryFn: () => getComment(productDetailId),
  });

  const [showAllComments, setShowAllComments] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  const handleToggleComments = () => {
    setShowAllComments(!showAllComments);
  };

  // Affiche tous les commentaires si `showAllComments` est vrai, sinon limite à 5
  const displayedComments = showAllComments ? comments : comments.slice(0, 5);

  const handleEditClick = (comment) => {
    setEditingCommentId(comment.id);
    setEditedContent(comment.content);
  };

  const mutation = useMutation({
    mutationFn: updateComment,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries(['comments', productDetailId]);
        setEditingCommentId(null);
        setEditedContent("");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error(error?.message || "An error occurred while updating the comment");
    }
  });

  const handleSaveClick = (commentId) => {
    mutation.mutate({ id: commentId, content: editedContent });
  };

  const handleCancelClick = () => {
    setEditingCommentId(null);
    setEditedContent("");
  };

  if (isLoading) return <p role="status"> Loading...</p>;
  if (error) return <p role="alert"> An error occurred: {error.message}</p>;

  return (
    <div className="comments">
      {comments.length > 0 ? (
        displayedComments.map((comment) => (
          <div key={comment.id} className="comments__username-content">
            <div className="comments__header">
              <h4 className="comments__username">
                {comment.username ? comment.username : "User Deleted"}
              </h4>
              {comment.user_id === userId && (
                <div className="comments__icons">
                  <FaEdit
                    onClick={() => handleEditClick(comment)}
                    aria-label="Edit comment"
                    className="edit-icon"
                  />
                  <DeleteComment commentId={comment.id} />
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
                  <button onClick={() => handleSaveClick(comment.id)} disabled={mutation.isLoading}>
                    Save
                  </button>
                  <button onClick={handleCancelClick} disabled={mutation.isLoading}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <p className="comment__content">{comment.content}</p>
                <p className="comment__date">Posted on {new Date(comment.created_at).toLocaleDateString()}
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