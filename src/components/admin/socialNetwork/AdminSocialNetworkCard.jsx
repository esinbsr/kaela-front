import { Link } from "react-router-dom";

const AdminSocialNetworkCard = ({ socialNetwork, onDelete }) => {
  return (
    <tr>
      <td>{socialNetwork.platform}</td>
      <td>{socialNetwork.url}</td>
      <td>
        <Link 
          to={`/adminUpdateSocialNetwork/${socialNetwork.id}`} 
          className='update-color'
          aria-label={`Update ${socialNetwork.platform} network`}
        >
          Update
        </Link>
      </td>
      <td>
        <button
          onClick={onDelete}  
          className="delete-color"
          aria-label={`Delete ${socialNetwork.platform} network`}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default AdminSocialNetworkCard;