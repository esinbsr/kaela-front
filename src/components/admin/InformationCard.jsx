import { Link } from 'react-router-dom';
import DeleteInformation from '../../pages/admin/informationsManagement/DeleteInformation';

const InformationCard = ({ infos }) => {
    return (
        <tr>
            <td>{infos.description}</td>
            <td>{infos.mobile}</td>
            <td>{infos.email}</td>
            <td>{infos.address}</td>
            <td>
                <Link to={`/adminUpdateInformation/${infos.id}`} className='update-color' aria-label={`Update information ${infos.description}`}>
                    Update
                </Link>
            </td>
            <td>
            <DeleteInformation informationId={infos.id} informationDescription={infos.description} />
            </td>
        </tr>
    );
};

export default InformationCard;
