import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { sendMessage } from "../api/contactApi";
import { getInformation } from "../api/informationApi";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthProvider";
import "../assets/styles/pages/_contact.scss";
import { Helmet } from "react-helmet-async";
import SocialNetworkIcon from "../components/SocialNetworkIcon";

const Contact = () => {
  // Scroll to the top of the page on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get authentication data from context (like user email and userId)
  const { auth } = useContext(AuthContext);

  // Local state for managing form inputs
  const [email, setEmail] = useState("");
  const [object, setObject] = useState("");
  const [message, setMessage] = useState("");

  // Fetch contact information using react-query
  const { data, isLoading, error } = useQuery({
    queryKey: ["informations"],
    queryFn: getInformation, // Fetch the contact information
  });

  // Get the first data entry (information)
  const info = data?.length > 0 ? data[0] : null;

  // Setup mutation for sending the contact message
  const mutation = useMutation({
    mutationFn: sendMessage, // Function to send the message
    onSuccess: (data) => {
      if (data.success) {
        // Clear form fields if message is sent successfully
        setEmail("");
        setObject("");
        setMessage("");
        toast.success(data.message || "Email sent successfully"); // Show success toast
      } else {
        toast.error(data.message || "A valid email is required"); // Show error toast
      }
    },
    onError: () => {
      toast.error("An error has occurred while sending the message."); // Error handling for message sending
    },
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    // Prepare the data to be sent
    const formData = {
      email: !auth.email ? email : null, // Only send email if the user is not authenticated
      object,
      message,
      userId: auth.userId || null, // Send userId if the user is authenticated
    };

    // Trigger mutation to send the message
    mutation.mutate(formData);
  };

  return (
    <>
      <Helmet>
        <title>Kaela Couture | Contact</title>
        <meta
          name="description"
          content="Contact Kaela Couture for information about our collections, custom orders, and in-store appointments. We are happy to answer all your inquiries."
        />
      </Helmet>
      <div className="contact">
        <section className="contact__form">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <h2>Contacte Me</h2>
              <div className="line"></div>

              {!auth.email && (
                <>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@domain.com"
                    aria-required="true"
                  />
                </>
              )}
              <label htmlFor="object">Object</label>
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
                <button type="submit" disabled={mutation.isLoading}>
                  {mutation.isLoading ? "Sending..." : "Send"}
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
          {error && (
            <span role="alert"> An error occurred : {error.message}</span>
          )}
          <SocialNetworkIcon />
        </address>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
