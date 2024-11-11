import { Link } from "react-router-dom";
import DeleteSocialNetwork from "../../pages/admin/socialNetworksManagement/DeleteSocialNetwork";

// Component to display a social network's information in a table row
const SocialNetworkCard = ({ socialNetwork }) => {
  return (
    <tr>
      <td data-label="Platform">{socialNetwork.platform}</td>
      <td data-label="Url">{socialNetwork.url}</td>
      <td data-label="Action">
        <div className="button-group">
          <Link
            to={`/updateSocialNetwork/${socialNetwork.id}`}
            className="blue-link"
            aria-label={`Update ${socialNetwork.platform} network`}
          >
            {" "}
            Update{" "}
          </Link>
          <DeleteSocialNetwork socialNetworkId={socialNetwork.id} />
        </div>
      </td>
    </tr>
  );
};

export default SocialNetworkCard;
