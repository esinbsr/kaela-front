import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComment } from "../actions/commentAction";
import { isEmpty } from "./Utils";
import { Link, useParams } from "react-router-dom";
import UpdateComment from "./UpdateComment";

const CommentDisplay = () => {
  const { productDetailId } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comment.comments);
  const [showAllComments, setShowAllComments] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);

  useEffect(() => {
    if (productDetailId) {
      dispatch(getComment(productDetailId));
    }
  }, [dispatch, productDetailId]);

  const handleToggleComments = () => {
    setShowAllComments(!showAllComments);
  };

  const handleEditComment = (commentId) => {
    setEditingCommentId(commentId);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
  };

  const displayedComments = showAllComments ? comments : comments.slice(0, 5);

  return (
    <>
      {!isEmpty(displayedComments) ? (
        displayedComments.map(
          (comment) =>
            !isEmpty(comment) && (
              <div key={comment.id} className="comments__username-content">
                <p className="comments_username">{comment.username} </p>
                <p>{comment.content}</p>
                <div className="comments_buttons">
                  <button onClick={() => handleEditComment(comment.id)}>Update</button>
                </div>
                {editingCommentId === comment.id && (
                  <UpdateComment commentId={comment.id} onCancel={handleCancelEdit} />
                )}
              </div>
            )
        )
      ) : (
        <p>There are no comments for the moment, be the first to write one!</p>
      )}
      {comments.length > 5 && (
        <button onClick={handleToggleComments}>
          {showAllComments ? "View less" : "View more"}
        </button>
      )}
    </>
  );
};

export default CommentDisplay;
