import { Link } from 'react-router-dom';
import { deleteInformation } from '../../../actions/informationAction';
import { useDispatch } from 'react-redux';

const AdminInformationCard = ({ infos }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
      if (window.confirm("Are you sure you want to delete this product?")) {
        dispatch(deleteInformation(infos.id));
      }
    };
  
    return (
        <tr>
            <td>{infos.description}</td>
            <td>{infos.mobile}</td>
            <td>{infos.address}</td>
            <td>
                <Link to={`/adminInformationModify/${infos.id}`}>Modify</Link>
            </td>

            <td>
                <Link
                to="#" 
                onClick={handleDelete} 
                >
                Delete 
                </Link>
            </td>

        </tr>
    );
};

export default AdminInformationCard;