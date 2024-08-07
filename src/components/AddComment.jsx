import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../actions/commentAction";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";

const AddComment = () => {
  const [content, setContent] = useState("");
  const userId = useSelector((state)=> state.user.user_id);
  const { productDetailId } = useParams();

  const error = useSelector((state) => state.comment.error);
  const message = useSelector((state) => state.comment.message);

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

      {message && <p role="alert" aria-live="polite" className="message-success">{message}</p>}
      {error && <p role="alert" aria-live="assertive" className="message-error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input type="hidden" value={productDetailId} />
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
