import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComment } from "../actions/commentAction";
import { isEmpty } from "./Utils";

const CommentDisplay = () => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comment.comments);
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    dispatch(getComment());
  }, [dispatch]);

  const displayedComments = showAllComments ? comments : comments.slice(0, 5);

  const handleToggleComments = () => {
    setShowAllComments(!showAllComments);
  };

  return (
    <div className="">
      {!isEmpty(displayedComments) ? (
        displayedComments.map(
          (comment) =>
            !isEmpty(comment) && (
              <div key={comment.id} className="test">
                <p>{comment.username}</p>
                <p>{comment.content}</p>
              </div>
            )
        )
      ) : (
        <p>There are no comments for the moment.</p>
      )}

      {comments.length > 5 && (
        <button onClick={handleToggleComments}>
          {showAllComments ? "View less" : "View more"}
        </button>
      )}
    </div>
  );
};

export default CommentDisplay;
