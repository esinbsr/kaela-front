import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteInformation, getInformation } from '../../../actions/informationAction';
import Navigation from '../../../components/Navigation';
import AdminInformationCard from '../../../components/admin/informations/AdminInformationCard';
import { isEmpty } from '../../../components/Utils';

const AdminInformation = () => {
    const dispatch = useDispatch();
    const information = useSelector((state) => state.information.information);
    const message = useSelector((state) => state.information.message);
    const error = useSelector((state) => state.information.error);

    useEffect(() => {
        dispatch(getInformation());
    }, [dispatch]);

    const handleDelete = (informationId) => {
        dispatch(deleteInformation(informationId));
    };

    return (
        <div>
            <Navigation />
            <h2>My Information</h2>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Mobile</th>
                            <th>Address</th>
                            <th className="action-header" colSpan={2}>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !isEmpty(information) ? (
                                information.map((info) => 
                                    !isEmpty(info) && (
                                        <AdminInformationCard
                                            key={info.id}
                                            infos={info}
                                            onDelete={handleDelete}
                                        />
                                    )
                                )
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center' }}>
                                        There are no information
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <Link to="/adminAddInformation">Add a new information</Link>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default AdminInformation;
