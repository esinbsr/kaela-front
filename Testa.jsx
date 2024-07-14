import { useEffect, useState } from "react";

const Testa = () => {
  const [compteur, setCompteur] = useState(0);

  useEffect(() => {
   console.log("test")
  }, [compteur]);

  const handleClick = () => {
    setCompteur(compteur + 1);
  };

  return (
    <div>
      <h1>{compteur}</h1>
      <button onClick={handleClick}> Clique</button>
    </div>
  );
};

export default Testa;
