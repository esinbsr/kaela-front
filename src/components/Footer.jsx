import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInformation } from "../actions/informationAction";
import { isEmpty } from "./utils/isEmpty";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faLocationDot,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "./Logo";

const Footer = () => {
  const information = useSelector((state) => state.information.information);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInformation());
  }, [dispatch]);

  const info = !isEmpty(information) ? information[0] : null;

  return (
    <footer className="footer">

      <div className="footer__container">

      <div className="footer__column testo">
        <h3>Contact Details</h3>
        <div className="line"></div>

        <div className="footer__contact-item">
          <FontAwesomeIcon icon={faPhone} />
          {info && <p>+{info.mobile}</p>}
        </div>

        <div className="footer__contact-item">
          <FontAwesomeIcon icon={faEnvelope} />
          {info && <p>{info.email}</p>}
        </div>

        <div className="footer__contact-item">
          <FontAwesomeIcon icon={faLocationDot} />
          {info && <p>{info.address}</p>}
        </div>
      </div>

      <div className="footer__column">
        <h3>Navigation</h3>
        <div className="line"></div>
        <Link to="/">Home</Link>
        <Link to="/collection">Collection</Link>
        <Link to="/aboutMe">About Me</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="footer__column">
        <h3>Legal Information</h3>
        <div className="line"></div>
        <Link to="/privacyPolicy">Privacy policy</Link>
        <Link to="/legalNotice">Legal notice</Link>
      </div>
      </div>

      <div className="footer__line"></div>
      <div className="footer__copyright">
        <Logo/>
        <p> Copyright © 2024 Kaela Couture. All rights reserved.</p>
        </div>
    </footer>
  );
};

export default Footer;
