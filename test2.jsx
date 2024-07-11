import { useState } from "react";
import Navigation from "../../components/Navigation";
import axios from "axios";

const AdminAddInformation = () => {
  const [description, setDescription] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      description,
      mobile,
      address,
    };

    try {
      const response = await axios.post(
        "http://localhost/travail-perso/kaela-couture/adminAddInformation",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const message = response.data.message || "No message returned";
      setResponseMessage(message);
    } catch (error) {
      console.error("Error submitting form:", error);
      setResponseMessage("Error submitting form");
    }
  };
  return (
    <div>
      <Navigation />
      <h2>Add Information</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label htmlFor="mobile">Mobile</label>
        <input
          type="text"
          id="mobile"
          name="mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default AdminAddInformation;
