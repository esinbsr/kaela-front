import { useState, useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import { AuthContext } from '../../context/AuthProvider'; 
import { addComment } from '../../api/commentApi';

const AddComment = () => {
  const [content, setContent] = useState('');
  const { auth } = useContext(AuthContext); 
  const userId = auth.userId;

  const { productDetailId } = useParams();
  const queryClient = useQueryClient();


  const mutation  = useMutation({
    mutationFn: addComment,
    onSuccess: (data) => {
      if(data.success) {
        setContent('');
        toast.success(data.message || 'Comment added successfully!');
        queryClient.invalidateQueries('comments');
      } else {
        toast.error(data.message || "An error has occurred.");
      }
    },
    onError: (error) => {
      toast.error("Server error: " + error.message); 
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      content,
      userId,
      productId: productDetailId,
    };

    mutation.mutate(formData);
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
      <h3>Give your opinion</h3>

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
