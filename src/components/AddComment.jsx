import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../actions/commentAction";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";

const AddComment = () => {
  const [content, setContent] = useState("");
  const userId = useSelector((state)=> state.user.user_id);
  const { productDetailId } = useParams();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      content,
      userId,
      productId: productDetailId,
    };

    dispatch(addComment(formData));
    setContent("");
  };

  if (!userId) {
    return (
      <div className="comment__login-link">
        <p>Login to write a comment</p>
        <Link className="comment__link" to="/login">Login</Link>
      </div>
    );
  }

  return (
    <>
      <h2>Give your opinion</h2>
      <form onSubmit={handleSubmit}>
        <input type="hidden" defaultValue={productDetailId} />
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
          <button type="submit">Send</button>
        </div>
      </form>
    </>
  );
};

export default AddComment;
