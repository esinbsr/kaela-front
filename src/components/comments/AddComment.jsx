import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../../actions/commentAction';
import { useParams, Link } from 'react-router-dom';
import Message from '../utils/Message'; // Import the reusable message component

const AddComment = () => {
  // Local state for the comment content
  const [content, setContent] = useState('');
  const [showMessage, setShowMessage] = useState(false); // State to manage message visibility

  // Retrieve the user ID from the Redux store
  const userId = useSelector((state) => state.user.user_id);

  // Retrieve the product ID from the URL parameters
  const { productDetailId } = useParams();

  // Retrieve error and success messages from the Redux store
  const error = useSelector((state) => state.comment.error);
  const message = useSelector((state) => state.comment.message);

  // Hook to dispatch Redux actions
  const dispatch = useDispatch();

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Prepare the form data object to be sent to the server
    const formData = {
      content,
      userId,
      productId: productDetailId,
    };

    // Dispatch the action to add a comment
    dispatch(addComment(formData));

    // Reset the textarea content after submission
    setContent('');

    // Show the message after submission
    setShowMessage(true);
  };

  // Handler for pressing the Enter key in the textarea
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e); // Submit the form
    }
  };

  // Effect to hide the message after 3 seconds
  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);

      // Cleanup the timer on component unmount
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

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
      <h2>Give your opinion</h2>

      {/* Display the success or error message if available */}
      {showMessage && message && <Message message={message} type="success" />}
      {showMessage && error && <Message message={error} type="error" />}

      <form onSubmit={handleSubmit}>
        {/* Hidden field for the product ID */}
        <input type="hidden" value={productDetailId} />

        <div className="comments__input-container">
          <label htmlFor="content">Message</label>
          <textarea
            name="content"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyPress} // Key press event listener for the Enter key
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