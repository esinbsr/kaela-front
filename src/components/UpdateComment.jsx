import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentById, updateComment } from "../actions/commentAction";

const UpdateComment = ({ commentId, onCancel }) => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const commentById = useSelector((state) => state.comment.commentById);

  useEffect(() => {
    if (commentId) {
      dispatch(getCommentById(commentId));
    }
  }, [dispatch, commentId]);

  useEffect(() => {
    if (commentById && commentById.id === commentId) {
      setContent(commentById.content);
    }
  }, [commentById, commentId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      id: commentId,
      content,
    };

    dispatch(updateComment(formData));
    onCancel();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="comments__input-container">
          <label htmlFor="content">Message</label>
          <textarea
            name="content"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="comments__button">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateComment;
