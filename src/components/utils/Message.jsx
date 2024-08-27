import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import the FontAwesomeIcon component from the react-fontawesome library
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon (faTimes) from the FontAwesome library
import { useState } from 'react'; // Import the useState hook from React to manage component state

const Message = ({ message, type }) => { 
  const [visible, setVisible] = useState(true); // Declare a state variable 'visible' initialized to true, and 'setVisible' to update it

  if (!visible || !message) return null; // If 'visible' is false or 'message' is null/undefined, return null to prevent rendering

  return (
    <p
      role="alert" // Accessibility feature, indicates that this is an important message
      aria-live={type === 'success' ? 'polite' : 'assertive'} // Sets the ARIA live region politeness level depending on the message type
      className={`message ${type}`} // Applies dynamic CSS classes based on the 'type' prop
    >
      {message} {/* Render the message content */}
      <button className="message-close-btn" onClick={() => setVisible(false)}> 
        {/* Button to close the message, which sets 'visible' to false when clicked */}
        <FontAwesomeIcon icon={faTimes} /> {/* Display the 'faTimes' icon inside the button */}
      </button>
    </p>
  );
};

export default Message; // Export the Message component as the default export
