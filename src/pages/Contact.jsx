import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { sendMessage } from "../api/contactApi";
import { getInformation } from "../api/informationApi";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import Map from "../components/utils/Map";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthProvider";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { auth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [object, setObject] = useState("");
  const [message, setMessage] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["informations"],
    queryFn: getInformation,
  });

  const info = data?.length > 0 ? data[0] : null;

  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      setEmail(""), setObject("");
      setMessage("");
      toast.success(data.message || "Message envoyé avec succès !");
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de l'envoi du message.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Si l'utilisateur est connecté pas besoin d'envoyer l'email, juste le userId
    const formData = {
      email: !auth.email ? email : null, // Envoie l'email que si l'utilisateur n'est pas connecté
      object,
      message,
      userId: auth.userId || null, // Envoie le userId pour récupérer l'email côté backend si connecté
    };

    mutation.mutate(formData);
  };

  return (
    <>
      <div className="contact">
        <section className="contact__form">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <h2>Contactez-nous</h2>
              <div className="line"></div>

              {!auth.email && (
                <>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@domain.com"
                    aria-required="true"
                  />
                </>
              )}
              <label htmlFor="object">Objet</label>
              <input
                id="object"
                type="text"
                name="object"
                value={object}
                onChange={(e) => setObject(e.target.value)}
                placeholder="Objet de votre message"
                aria-required="true"
              />

              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Votre message"
                aria-required="true"
              ></textarea>

              <div className="form__button-container">
                <button type="submit">Envoyer</button>
              </div>
            </fieldset>
          </form>
        </section>

        <address className="contact__content">
          <h2>Détails de contact</h2>
          <div className="line"></div>

          <div className="contact__data">
            <FaPhoneAlt aria-label="Mobile" />
            <p>
              {isLoading && <span role="status"> Loading...</span>}
              {error && (
                <span role="alert"> An error occurred : {error.message}</span>
              )}
              {info?.mobile}
            </p>
          </div>

          <div className="contact__data">
            <MdEmail aria-label="Email" />
            <p>
              {isLoading && <span role="status"> Loading...</span>}
              {error && (
                <span role="alert"> An error occurred : {error.message}</span>
              )}
              {info?.email}
            </p>
          </div>

          <div className="contact__data localisation">
            <FaLocationDot aria-label="Adresse" />
            <p>
              {isLoading && <span role="status"> Loading...</span>}
              {error && (
                <span role="alert"> An error occurred : {error.message}</span>
              )}
              {info?.address}
            </p>
          </div>
          {isLoading && <span role="status"> Loading...</span>}
          {error && <span role="alert"> An error occurred : {error.message}</span>}
          {info && <Map address={info.address} />}
        </address>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
