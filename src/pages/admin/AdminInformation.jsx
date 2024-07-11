import axios from "axios";
import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import AdminInformationCard from "../../components/admin/AdminInformationCard";
import { Link } from "react-router-dom";

const AdminInformation = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [informationServer, setInformationServer] = useState([]);

  useEffect(() => {
    fetchInformation();
  }, []);

  const fetchInformation = async () => {
    try {
      const response = await axios.get(
        "http://localhost/travail-perso/kaela-couture/adminInformation"
      );
      if (response.data.success) {
        setInformationServer(response.data.information);
        if (response.data.information.length === 0) {
          setResponseMessage("There are no information");
        }
      } else {
        setResponseMessage("Information loading failure");
      }
    } catch (error) {
      console.error("Error when loading information:", error);
      setResponseMessage("Error when loading information");
    }
  };

  const handleDelete = (informationId) => {
    setInformationServer(
      informationServer.filter((info) => info.id !== informationId)
    );
  };

  return (
    <div>
      <Navigation />
      <h2>My Information</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Mobile</th>
              <th>Address</th>
              <th className="action-header" colSpan={2}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {informationServer.length > 0 ? (
              informationServer.map((info) => (
                <AdminInformationCard
                  key={info.id}
                  infos={info}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  There are no information
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Link to="/adminAddInformation">Add a new information</Link>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default AdminInformation;
