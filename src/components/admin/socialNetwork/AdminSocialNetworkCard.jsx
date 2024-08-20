import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { deleteSocialNetwork } from "../../../actions/socialNetworkAction";

const AdminSocialNetworkCard = ({ socialNetwork }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (
      window.confirm("Are you sure you want to delete this social network?")
    ) {
      dispatch(deleteSocialNetwork(socialNetwork.id));
    }
  };
  return (
    <tr>
      <td>{socialNetwork.platform}</td>
      <td>{socialNetwork.url}</td>
      <td>
        <Link to={`/adminUpdateSocialNetwork/${socialNetwork.id}`} className='update-color'>Update</Link>
      </td>
      <td>
        <Link to="#" onClick={handleDelete}  className="delete-color">
          Delete
        </Link>
      </td>
    </tr>
  );
};

export default AdminSocialNetworkCard;
