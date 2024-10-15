import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import Map from "../components/utils/Map";
import Footer from "../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendMessage } from "../api/contactApi";
import { getInformation } from "../api/informationApi";

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    object: "",
    message: "",
  });

  const { email, object, message } = formData;

  const { data, isLoading, error } = useQuery({
    queryKey: ["informations"],
    queryFn: getInformation,
  });

  const info = data?.length > 0 ? data[0] : null;

  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      toast.success(data.message || "Message envoyé avec succès !");
      setFormData({ email: "", object: "", message: "" }); 
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de l'envoi du message.");
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (isLoading) return "Loading...";
  if (error) return "An error occurred: " + error.message;
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
                type="text"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="example@domain.com"
                required
              />
              <label htmlFor="object">Object</label>
              <input
                id="object"
                type="text"
                name="object"
                value={object}
                onChange={handleChange}
                placeholder="Subject of your inquiry"
                required
              />
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={handleChange}
                placeholder="Hello, I would like to inquire about..."
                required
              ></textarea>
              <div className="form__button-container">
                <button type="submit">
                  Send
                </button>
              </div>
            </fieldset>
          </form>
        </section>

        <address className="contact__content">
          <h2>Contact Details</h2>
          <div className="line"></div>

          <div className="contact__data">
          <FaPhoneAlt aria-label="Mobile" />
              <p>+{info?.mobile}</p>
          </div>

          <div className="contact__data">
          <MdEmail aria-label="Email" />
              <p>{info?.email}</p>
          </div>

          <div className="contact__data localisation">
          <FaLocationDot aria-label="Address" />
              <p>{info?.address}</p>
          </div>

          {info && <Map address={info.address} />}
        </address>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
