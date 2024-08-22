import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon
import { useState } from 'react';

const Message = ({ message, type }) => {
  const [visible, setVisible] = useState(true);

  if (!visible || !message) return null; // If visible is false or message is empty, do not render anything

  return (
    <p
      role="alert"
      aria-live={type === 'success' ? 'polite' : 'assertive'}
      className={`message ${type}`}
    >
      {message}
      <button className="message-close-btn" onClick={() => setVisible(false)}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </p>
  );
};

export default Message;
