import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInformation } from "../actions/informationAction";
import { contact } from "../actions/contactAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocationDot, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Map from "../components/utils/Map";
import Footer from "../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const dispatch = useDispatch();
  const information = useSelector((state) => state.information.information);
  const success = useSelector((state) => state.contact.message); // Message de succès
  const error = useSelector((state) => state.contact.error);     // Message d'erreur

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getInformation());
    window.scrollTo(0, 0);
  }, [dispatch]);

  const info = information.length > 0 ? information[0] : null;

  useEffect(() => {
    if (info) {
      setLoading(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(contact(formData));
  };

  // Affichage des messages de succès ou d'erreur avec Toastify et réinitialisation des champs
  useEffect(() => {
    if (success) {
      toast.success(success); // Afficher le toast de succès
      setFormData({ email: "", object: "", message: "" }); // Réinitialiser les champs
    }

    if (error) {
      toast.error(error); // Afficher le toast d'erreur
    }
  }, [success, error]);

  return (
    <>
      <ToastContainer />
      <div className="contact">
        <section className="contact__form">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <h2>Contact Me</h2>
              <div className="line"></div>

              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
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
              <p>+{info?.mobile}</p>
            )}
          </div>

          <div className="contact__data">
            <FontAwesomeIcon icon={faEnvelope} />
            {loading ? (
              <p role="alert" aria-live="assertive">
                Loading email...
              </p>
            ) : (
              <p>{info?.email}</p>
            )}
          </div>

          <div className="contact__data localisation">
            <FontAwesomeIcon icon={faLocationDot} />
            {loading ? (
              <p role="alert" aria-live="assertive">
                Loading the address...
              </p>
            ) : (
              <p>{info?.address}</p>
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
