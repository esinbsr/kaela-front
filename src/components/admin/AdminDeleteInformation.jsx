import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminDeleteInformation = ({ informationId, onDelete }) => {

  const handleDeleteClick = async (e) => {
    e.preventDefault();

    const confirmDelete = window.confirm("Are you sure you want to delete this information?");

    if (confirmDelete) {

      try {
        const response = await axios.post('http://localhost/travail-perso/kaela-couture/deleteInformation', {
          informationId
        });
        if (response.data.success) {
          onDelete(informationId);
        } else {
          alert("Failed to delete information");
        }
      } catch (error) {
        console.error("Error deleting information:", error);
        alert("Error deleting information");
      } 
    }
  };

  return (
    <Link to="#" onClick={handleDeleteClick} > Delete </Link>
  );
};

export default AdminDeleteInformation;
