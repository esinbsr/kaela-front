import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocationDot, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getInformation } from "../actions/informationAction";
import { isEmpty } from "../components/utils/isEmpty";
import Map from "../components/utils/Map";
// import SocialNetworkIcon from "../components/utils/SocialNetworkIcon";
import Footer from "../components/Footer";

const Contact = () => {
  const dispatch = useDispatch();
  const information = useSelector((state) => state.information.information);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getInformation());
    window.scrollTo(0, 0);
  }, [dispatch]);

  const info = !isEmpty(information) ? information[0] : null;

  useEffect(() => {
    if (info) {
      setLoading(false); // Les données (tel, adresse, carte) sont prêtes à être affichées, donc on arrête le chargement
    }
  }, [info]);

  const [formData, setFormData] = useState({
    email: "",
    object: "",
    message: "",
  });

  const { email, object, message } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8888/travail-perso/kaela-couture/contact",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setFormData({
        email: "",
        object: "",
        message: "",
        responseMessage: response.data.message || "No message returned",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div className="contact">
        {/* <SocialNetworkIcon /> */}
        <section className="contact__form">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <h2>Contact Me</h2>
              <div className="line"></div>

              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="example@domain.com"
              />
              <label htmlFor="object">Object</label>
              <input
                id="object"
                type="text"
                name="object"
                value={object}
                onChange={handleChange}
                placeholder="Subject of your inquiry"
              />
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={handleChange}
                placeholder="Hello, I would like to inquire about..."
              ></textarea>
              <div className="form__button-container">
                <button type="submit">Send</button>
              </div>
            </fieldset>
          </form>
        </section>

        <address className="contact__content">
          <h2>Contact Details</h2>
          <div className="line"></div>

          

          <div className="contact__data">
            <FontAwesomeIcon icon={faPhone} />
            {loading ? (
              <p role="alert" aria-live="assertive">
                Loading the phone number...
              </p>
            ) : (
              <p>+{info.mobile}</p>
            )}
          </div>

          <div className="contact__data">
            <FontAwesomeIcon icon={faEnvelope} />
            {loading ? (
              <p role="alert" aria-live="assertive">
                Loading email...
              </p>
            ) : (
              <p>{info.email}</p>
            )}
          </div>

          <div className="contact__data localisation">
          <FontAwesomeIcon icon={faLocationDot} />
            {loading ? (
              <p role="alert" aria-live="assertive">
               Loading the address...
              </p>
            ) : (
              <p>{info.address}</p>
            )}
          </div>


          {loading ? (
            <p role="alert" aria-live="assertive">
              Loading map...
            </p>
          ) : (
            info && <Map address={info.address} />
          )}
        </address>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
