import { useDispatch } from "react-redux";
import { addComment } from "../actions/commentAction";
import { useState } from "react";
import { useParams } from "react-router-dom";

const AddComment = () => {

  const [content, setContent] = useState("");
  const userId = localStorage.getItem("user_id");
  const {productDetailId} = useParams();

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
  return (
    <div>
      <h2>Give your opinion</h2>
      <form onSubmit={handleSubmit}>

        <input type="hidden" defaultValue={productDetailId} />

        <label htmlFor="content">Message</label>
        <textarea
          name="content"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <button type="submit">send</button>
      </form>
    </div>
  );
};

export default AddComment;
