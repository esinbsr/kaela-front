import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import Logo from "./Logo";
import { getInformation } from "../api/informationApi";
import { useQuery } from "react-query";
import SocialNetworkIcon from "./SocialNetworkIcon";

const Footer = () => {
  // Fetch informations from the serveur
  const { isLoading, error, data } = useQuery({
    queryKey: ["informations"], // The unique query key to identify this query
    queryFn: getInformation, // The function responsible for fetching the products
  });

  // If there is data and it contains informations, use the first information, otherwise return an empty array.
  const info = data?.length > 0 ? data[0] : null;

  if (isLoading) return "Loading...";
  if (error) return "An error occurred: " + error.message;
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__column testo">
          <h3>Contact Details</h3>
          <div className="line"></div>

          <div className="footer__contact-item">
            <FaPhoneAlt aria-label="Mobile" />
            {info && <p>+{info.mobile}</p>}
          </div>

          <div className="footer__contact-item">
            <MdEmail aria-label="Email" />
            {info && <p>{info.email}</p>}
          </div>

          <div className="footer__contact-item">
            <FaLocationDot aria-label="Address" />
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
        <Logo />
        <p> Copyright © 2024 Kaela Couture. All rights reserved.</p>
      <SocialNetworkIcon/>
      </div>
    </footer>
  );
};

export default Footer;
