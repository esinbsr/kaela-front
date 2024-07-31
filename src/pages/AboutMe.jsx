import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInformation } from "../actions/informationAction";
import { API_URL } from "../actions/serverRequest";
import { getProduct } from "../actions/productAction";
import { Link } from "react-router-dom";
import { getSocialNetwork } from "../actions/socialNetworkAction";

const SECTIONS = {
  ABOUT_ME: 6,
};

const AboutMe = () => {
  const informations = useSelector((state) => state.information.information) || [];
  const products = useSelector((state) => state.product.products) || [];
  const socialNetworks = useSelector((state) => state.socialNetwork.socialNetwork) || [];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInformation());
    dispatch(getProduct());
    dispatch(getSocialNetwork());
  }, [dispatch]);

  const filteredProducts = products.filter((product) => product.section_id === SECTIONS.ABOUT_ME);
  const threeInformations = informations.slice(1, 4);


  const instagram = socialNetworks.find((network) => network.platform.toLowerCase() === 'instagram');


  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };


  // générer une URL pour la page de connexion d'Instagram qui redirige l'utilisateur vers une page de profil spécifique après la connexion

  const generateInstagramLoginUrl = (profileUrl) => { //profileUrl représente l'URL du profil Instagram
    const loginUrl = 'https://www.instagram.com/accounts/login/'; //URL de la page de connexion d'Instagram
    const redirectUrl = encodeURIComponent(profileUrl); //contient l'URL encodée du profil vers lequel l'utilisateur doit être redirigé après la connexion, encode l'URL du profil pour s'assurer qu'elle est correctement formatée pour être utilisée comme un paramètre d'URL
    return `${loginUrl}?next=${redirectUrl}`; //Combinaison de loginUrl et redirectUrl pour former une URL complète
  };

  return (
    <div className="about-me">
      <h1>About Me</h1>

      <div className="about-me__header">
        <div className="about-me__description">
          <h2>Who am I?</h2>
          {threeInformations.length > 0 ? (
            threeInformations.map((info) => (
              <div key={info.id}>
                <p>{info.description}</p>
              </div>
            ))
          ) : (
            <p>Loading descriptions...</p>
          )}
        </div>

        <div className="about-me__image">
          {filteredProducts.length > 0 ? (
            <img
              src={`${API_URL}assets/img/${filteredProducts[0].path}`}
              alt={filteredProducts[0].name}
            />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
      </div>

      <div className="about-me__footer">
        <h2>Subscribe to my Instagram</h2>
        <div className="about-me__footer-container">
          {filteredProducts.length > 1 && instagram && isValidUrl(instagram.url) ? (
            filteredProducts.slice(1, 9).map((product) => (
              <div className="about-me__footer-image" key={product.id}>
                <Link to={generateInstagramLoginUrl(instagram.url)} target="_blank" rel="noopener noreferrer">
                  <img
                    src={`${API_URL}assets/img/${product.path}`}
                    alt={product.name}
                  />
                </Link>
              </div>
            ))
          ) : (
            <p>Loading drawing images...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
