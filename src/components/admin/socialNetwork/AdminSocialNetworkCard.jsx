import { Link } from 'react-router-dom';
import AdminDeleteSocialNetwork from './AdminDeleteSocialNetwork';

const AdminSocialNetworkCard = ({ socialNetwork, onDelete }) => {
    return (
        <tr>
            <td>{socialNetwork.platform}</td>
            <td>{socialNetwork.url}</td>
            <td>
                <Link to={`/adminUpdateSocialNetwork/${socialNetwork.id}`}>Modify</Link>
            </td>
            <td>
                <AdminDeleteSocialNetwork socialNetworkId={socialNetwork.id} onDelete={onDelete} />
            </td>
        </tr>
    );
};

export default AdminSocialNetworkCard;
