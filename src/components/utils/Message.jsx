import { useState } from 'react';

const Message = ({ message, type }) => {
  const [visible, setVisible] = useState(true);

  if (!visible || !message) return null; //Si visible est false, cela signifie que le message ne doit pas être affiché, Si message est vide ou non défini, le composant ne rend rien non plus.

  return (
    <p
      role="alert"
      aria-live={type === 'success' ? 'polite' : 'assertive'}
      className={`message ${type}`}
    >
      {message}
      <button className="message-close-btn" onClick={() => setVisible(false)}>X</button>
    </p>
  );
};

export default Message;
