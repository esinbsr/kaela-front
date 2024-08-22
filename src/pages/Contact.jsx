import { useEffect, useState } from "react";
import axios from "axios";
import SocialNetworkIcon from "../components/utils/SocialNetworkIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons"; 
import { useDispatch, useSelector } from "react-redux";
import { getInformation } from "../actions/informationAction";
import { isEmpty } from "../components/utils/isEmpty";
import Map from "../components/utils/Map";

const Contact = () => {
  const dispatch = useDispatch();
  const information = useSelector((state) => state.information.information);

  useEffect(() => {
    dispatch(getInformation());
  }, [dispatch]);

  const info = !isEmpty(information) ? information[0] : null;

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
    <div className="contact">
      <SocialNetworkIcon />
      <form onSubmit={handleSubmit} className="contact__form">
        <h1>Contact me</h1>

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
      <div className="contact__data">
        <div className="contact__mobile">
          <FontAwesomeIcon icon={faPhone} /> 
          {info && <p>+{info.mobile}</p>}
        </div>

        <div className="contact__localisation">
          <FontAwesomeIcon icon={faLocationDot} /> 
          {info && <p>{info.address}</p>}
        </div>
      {info && <Map address={info.address} />}
      </div>
    </div>
  );
};

export default Contact;
