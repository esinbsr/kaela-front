import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInformation } from '../../../actions/informationAction';
import AdminInformationCard from '../../../components/admin/informations/AdminInformationCard';
import AdminAddInformation from './AdminAddInformation';
import { isEmpty } from '../../../components/utils/isEmpty';
import AdminNavigation from '../AdminNavigation';

const AdminInformation = () => {
    const dispatch = useDispatch();
    const information = useSelector((state) => state.information.information);

    useEffect(() => {
        dispatch(getInformation());
    }, [dispatch]);

    return (
        <div className="admin-container">
            <AdminNavigation />
            <div className="admin-container__content">
                <h1>My Information</h1>
                <AdminAddInformation />
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
                            {!isEmpty(information) ? (
                                information.map((info) =>
                                    !isEmpty(info) && (
                                        <AdminInformationCard
                                            key={info.id}
                                            infos={info}
                                        />
                                    )
                                )
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center' }}>
                                        There are no information
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminInformation;
