import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInformation } from "../actions/informationAction";
import { API_URL } from "../actions/serverRequest";
import { getProduct } from "../actions/productAction";
import { Link } from "react-router-dom";

const SECTIONS = {
  ABOUT_ME: 6,
};

const AboutMe = () => {
  const informations = useSelector((state) => state.information.information) || [];
  const products = useSelector((state) => state.product.products) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInformation());
    dispatch(getProduct());
  }, [dispatch]);

  const filteredProducts = products.filter((product) => product.section_id === SECTIONS.ABOUT_ME);
  const threeInformations = informations.slice(1, 4);

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
        <div className="about-me__footer-image">
          {filteredProducts.length > 1 ? (
            filteredProducts.slice(1, 9).map((product) => (
              <div key={product.id}>
                <Link to="https://www.instagram.com/kaela_couture/" target="_blank" rel="noopener noreferrer">
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
