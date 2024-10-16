import { Link } from 'react-router-dom';
import DeleteInformation from '../../pages/admin/informationsManagement/DeleteInformation';

const InformationCard = ({ infos }) => {
    return (
        <tr>
            <td data-label="Description">{infos.description}</td>
            <td data-label="Mobile">{infos.mobile}</td>
            <td data-label="Email">{infos.email}</td>
            <td data-label="Address">{infos.address}</td>
            <td data-label="Action">

            <div className="button-group">
                <Link to={`/updateInformation/${infos.id}`} className="blue-link" aria-label={`Update information ${infos.description}`}>
                    Update
                </Link>
            <DeleteInformation informationId={infos.id} informationDescription={infos.description} />
            </div>
            </td>
        </tr>
    );
};

export default InformationCard;
