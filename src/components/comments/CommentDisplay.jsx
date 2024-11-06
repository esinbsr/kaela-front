import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getComment } from "../../api/commentApi";

const CommentDisplay = () => {
  const { productDetailId } = useParams();

  const { data: comments = [], isLoading, error } = useQuery({
    queryKey: ['comments', productDetailId],
    queryFn: () => getComment(productDetailId),
  });

  const [showAllComments, setShowAllComments] = useState(false);


  const handleToggleComments = () => {
    setShowAllComments(!showAllComments);
  };


  const sortedComments = useMemo(() => {
    return [...comments].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [comments]);


  const displayedComments = useMemo(() => {
    return showAllComments ? sortedComments : sortedComments.slice(0, 5);
  }, [showAllComments, sortedComments]);

  if (isLoading) return <p role="status"> Loading...</p>;
  if (error) return <p role="alert"> An error occurred : {error.message}</p>;
  
  return (
    <div className="comments">
      {sortedComments.length > 0 ? (
        displayedComments.map(
          (comment) => (
            <div key={comment.id} className="comments__username-content">
              <h4 className="comments__username">
                {comment.username ? comment.username : "Utilisateur supprimé"}
              </h4>
              <p className="comment__content">{comment.content}</p>
            </div>
          )
        )
      ) : (
        <p className="p-no-comments">There are currently no comments, so be the first to write one!</p>
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
