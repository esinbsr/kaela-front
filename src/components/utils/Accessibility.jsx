import { useEffect } from 'react'; 

const Accessibility = () => {
  useEffect(() => {
    //  fonction déclenchée lorsque l'utilisateur appuie sur une touche
    const handleFirstTab = (e) => {
      // Vérifie si la touche enfoncée est Tab
      if (e.key === 'Tab') {
        // Ajoute une classe 'user-is-tabbing' au body du document
        document.body.classList.add('user-is-tabbing');
        // Retire l'écouteur d'événements 'keydown' pour la fonction handleFirstTab
        window.removeEventListener('keydown', handleFirstTab);
        // Ajoute un écouteur d'événements 'mousedown' pour la fonction handleMouseDownOnce
        window.addEventListener('mousedown', handleMouseDownOnce);
      }
    };

    // fonction pour gérer le premier clic de souris
    const handleMouseDownOnce = () => {
      // Retire la classe 'user-is-tabbing' du body du document
      document.body.classList.remove('user-is-tabbing');
      // Retire l'écouteur d'événements 'mousedown' pour la fonction handleMouseDownOnce
      window.removeEventListener('mousedown', handleMouseDownOnce);
      // Ajoute un écouteur d'événements 'keydown' pour la fonction handleFirstTab
      window.addEventListener('keydown', handleFirstTab);
    };

    // Ajoute un écouteur 'keydown' pour la fonction handleFirstTab
    window.addEventListener('keydown', handleFirstTab);

    // Nettoyage des écouteurs lorsque le composant est démonté
    return () => {
      // Retire l'écouteur d'événements 'keydown' pour la fonction handleFirstTab
      window.removeEventListener('keydown', handleFirstTab);
      // Retire l'écouteur d'événements 'mousedown' pour la fonction handleMouseDownOnce
      window.removeEventListener('mousedown', handleMouseDownOnce);
    };
  }, []); 

  // Ce composant ne rend rien, il est utilisé uniquement pour gérer l'accessibilité
  return null;
};

export default Accessibility; 
