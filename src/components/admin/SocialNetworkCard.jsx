import { Link } from "react-router-dom";
import DeleteSocialNetwork from "../../pages/admin/socialNetworksManagement/DeleteSocialNetwork";

const SocialNetworkCard = ({ socialNetwork }) => {
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
      <DeleteSocialNetwork socialNetworkId= {socialNetwork.id}/>
      </td>
    </tr>
  );
};

export default SocialNetworkCard;