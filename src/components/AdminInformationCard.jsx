import { Link } from "react-router-dom";

const AdminInformationCard= ({infos}) => {
    return (
            <tr>
                <td>{infos.description}</td>
                <td>{infos.mobile}</td>
                <td>{infos.address}</td>
                <td>
                    <Link to="/">
                    Modify
                    </Link>
                    <Link>
                    Delete
                    </Link>
                </td>
            </tr>
    );
};

export default AdminInformationCard;