import { Link } from "react-router-dom";
import AdminDeleteInformation from './AdminDeleteInformation';

const AdminInformationCard = ({ infos, onDelete }) => {
  return (
    <tr>
      <td>{infos.description}</td>
      <td>{infos.mobile}</td>
      <td>{infos.address}</td>
      <td>
        <Link to={`/adminInformationModify/${infos.id}`}>Modify</Link>
        <AdminDeleteInformation informationId={infos.id} onDelete={onDelete} />
      </td>
    </tr>
  );
};

export default AdminInformationCard;
