import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import axios from "axios";
import { useParams } from "react-router-dom";

const AdminInformationModify = () => {
  const { informationId } = useParams(); // Récupération de l'ID depuis l'URL

  const [description, setDescription] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    if (informationId) {
      fetchInformation();
    } else {
      setResponseMessage("Information ID missing in URL");
    }
  }, [informationId]);

  const fetchInformation = async () => {
    try {
      const response = await axios.get(`http://localhost/travail-perso/kaela-couture/getInformation/${informationId}`);
      console.log(response.data);

      if (response.data.success) {
        const information = response.data.information;
        setDescription(information.description);
        setMobile(information.mobile);
        setAddress(information.address);
      } else {
        setResponseMessage("Failed to fetch information");
      }
    } catch (error) {
      console.error("Error fetching information:", error);
      setResponseMessage("Error fetching information");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("informationId", informationId);
    formData.append("description", description);
    formData.append("mobile", mobile);
    formData.append("address", address);

    try {
      const response = await axios.post("http://localhost/travail-perso/kaela-couture/updateInformation", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

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
      <h2>Modify Information</h2>
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

        <button type="submit">Modify</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default AdminInformationModify;
