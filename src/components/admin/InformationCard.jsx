import { Link } from 'react-router-dom';

const InformationCard = ({ infos, onDelete }) => {
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
                <button
                    onClick={onDelete}
                    className="delete-color"
                    aria-label={`Delete information ${infos.description}`}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default InformationCard;
