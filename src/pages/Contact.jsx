import { useState } from "react";
import axios from "axios";
import SocialNetworkIcon from "../components/utils/SocialNetworkIcon";

const Contact = () => {
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
    <div>
         <SocialNetworkIcon/>
    <h1>Contact me</h1>
    <form onSubmit={handleSubmit} className="user-form">
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="text"
        name="email"
        value={email}
        onChange={handleChange}
      />
      <label htmlFor="object">Object</label>
      <input
        id="object"
        type="text"
        name="object"
        value={object}
        onChange={handleChange}
      />
      <label htmlFor="message">Message</label>
      <textarea
        id="message"
        name="message"
        value={message}
        onChange={handleChange}
      ></textarea>
      <button type="submit">Send</button>
    </form>
    
    {/* {error && <Message message={error} type="error" />} */}
  </div>
  
  );
};

export default Contact;
