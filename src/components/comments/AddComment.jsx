import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../../actions/commentAction';
import { useParams, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const AddComment = () => {
  const [content, setContent] = useState('');
  const [showMessage, setShowMessage] = useState(false); 

  const userId = useSelector((state) => state.user.user_id);

  const { productDetailId } = useParams();

  const error = useSelector((state) => state.comment.error);
  const message = useSelector((state) => state.comment.message);

  const dispatch = useDispatch();

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the form data object to be sent to the server
    const formData = {
      content,
      userId,
      productId: productDetailId,
    };

    // Dispatch the action to add a comment
    dispatch(addComment(formData));

    setContent('');
    setShowMessage(true);
  };

  // Handler for pressing the Enter key in the textarea
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e); // Submit the form
    }
  };

  // Effect to show notifications for message or error
  useEffect(() => {
    if (showMessage) {
      if (message) {
        toast.success(message); 
      } else if (error) {
        toast.error(error); 
      }
      
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);

      // Cleanup the timer on component unmount
      return () => clearTimeout(timer);
    }
  }, [showMessage, message, error]);

  // If the user is not logged in, display a login link
  if (!userId) {
    return (
      <div className="comment__login-link">
        <p>Login to write a comment</p>
        <Link className="comment__link" to="/login">Login</Link>
      </div>
    );
  }

  // Render the comment form
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
            onKeyDown={handleKeyPress} 
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
      <ToastContainer />
    </>
  );
};

export default AddComment;
