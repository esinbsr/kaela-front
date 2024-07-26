import { useDispatch } from "react-redux";
import { deleteSocialNetwork } from "../../../actions/socialNetworkAction";
import { Link } from "react-router-dom";

const AdminDeleteSocialNetwork = ({ socialNetworkId }) => {
    const dispatch = useDispatch();

    const handleDeleteClick = async (e) => {
        e.preventDefault();

        const confirmDelete = window.confirm('Are you sure you want to delete this social network?');

        if (confirmDelete) {
            dispatch(deleteSocialNetwork(socialNetworkId));
        }
    };

    return (
        <div>
            <Link onClick={handleDeleteClick}>Delete</Link>
        </div>
    );
};

export default AdminDeleteSocialNetwork;
