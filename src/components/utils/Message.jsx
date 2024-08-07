import { useEffect, useState } from 'react';

const Message = ({ message, type }) => {
  const [visible, setVisible] = useState(true);
  const duration = 3000; 

  useEffect(() => {
    const timer = setTimeout(() => { // définit un minuteur qui change l'état visible à false après 3s
      setVisible(false);
    }, duration);

    // Fonction de nettoyage pour annuler le minuteur si le composant est démonté
    return () => clearTimeout(timer); // si le composant est démonté avant que le minuteur ne se déclenche, le minuteur continuerait de tourner en arrière-plan donc je nettois le timer pour éviter ca
  }, []);

  if (!visible || !message) return null; //Si visible est false ou si message est null ou indéfini, le composant ne rend rien. ca empêche l'affichage du message

  return (
    <p
      role="alert" // Indique aux technologies d'assistance que cet élément est un message important
      aria-live={type === 'success' ? 'polite' : 'assertive'}
      className={`message ${type}`}
    >
      {message}
    </p>
  );
};

export default Message;
