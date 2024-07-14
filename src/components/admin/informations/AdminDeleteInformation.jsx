import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteInformation } from '../../../actions/informationAction';


const AdminDeleteInformation = ({ informationId, onDelete }) => {
    const dispatch = useDispatch();

    const handleDeleteClick = async (e) => {
        e.preventDefault();

        const confirmDelete = window.confirm('Are you sure you want to delete this information?');

        if (confirmDelete) {
            dispatch(deleteInformation(informationId));
            onDelete(informationId);
        }
    };

    return (
        <Link to="#" onClick={handleDeleteClick}>
            {' '}
            Delete{' '}
        </Link>
    );
};

export default AdminDeleteInformation;