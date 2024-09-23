import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComment } from "../../actions/commentAction";
import { isEmpty } from "../utils/isEmpty";
import { useParams } from "react-router-dom";

const CommentDisplay = () => {
  const { productDetailId } = useParams();

  const dispatch = useDispatch();

  const comments = useSelector((state) => state.comment.comments);

  const [showAllComments, setShowAllComments] = useState(false);

  // useEffect to fetch comments when the product ID changes
  useEffect(() => {
    if (productDetailId) {
      dispatch(getComment(productDetailId));
    }
  }, [dispatch, productDetailId]);

  // Function to toggle between showing all comments and partial comments
  const handleToggleComments = () => {
    setShowAllComments(!showAllComments);
  };

  // useMemo to optimize the calculation of displayed comments
  const displayedComments = useMemo(() => {
    return showAllComments ? comments : comments.slice(0, 5);
  }, [showAllComments, comments]);

  return (
    <div className="comments">
      {!isEmpty(displayedComments) ? (
        displayedComments.map(
          (comment) =>
            !isEmpty(comment) && (
              <div key={comment.id} className="comments__username-content">
                <h4 className="comments__username">
              {comment.username ? comment.username : "Utilisateur supprimé"}
            </h4>
                <p className="comment__content">{comment.content}</p>
              </div>
            )
        )
      ) : (
        <p>There are currently no comments, so be the first to write one!</p>
      )}

      {/* Button to toggle between showing all comments and partial comments */}
      {comments.length > 5 && (
        <button
          onClick={handleToggleComments}
          aria-expanded={showAllComments} // Indicates whether the comments are currently expanded or collapsed
          aria-label={
            showAllComments ? "Show less comments" : "Show more comments"
          } // Provides an accessible label for screen reader users
          className="comments__toggle-button"
        >
          {showAllComments ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
};

export default CommentDisplay;
