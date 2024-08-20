import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSocialNetwork } from '../../../actions/socialNetworkAction';
import AdminSocialNetworkCard from '../../../components/admin/socialNetwork/AdminSocialNetworkCard';
import AdminAddSocialNetwork from './AdminAddSocialNetwork';
import { isEmpty } from '../../../components/utils/isEmpty';
import AdminNavigation from '../AdminNavigation';

const AdminSocialNetwork = () => {
    const dispatch = useDispatch();
    const socialNetwork = useSelector((state) => state.socialNetwork.socialNetwork);
    const message = useSelector((state) => state.socialNetwork.message);
    const error = useSelector((state) => state.socialNetwork.error);

    useEffect(() => {
        dispatch(getSocialNetwork());
    }, [dispatch]);

    return (
        <div className="admin-container">
            <AdminNavigation />
            <div className="admin-container__content">
                <h1>Social Networks</h1>
                <AdminAddSocialNetwork />
                <div className="table">
                    <h3>List of social networks</h3>
                    <div className="table__container">
                        <table className="table__content">
                            <thead>
                                <tr>
                                    <th>Platform</th>
                                    <th>Url</th>
                                    <th className="action-header" colSpan={2}>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {!isEmpty(socialNetwork) ? (
                                    socialNetwork.map((socialNetwork) =>
                                        !isEmpty(socialNetwork) && (
                                            <AdminSocialNetworkCard
                                                key={socialNetwork.id}
                                                socialNetwork={socialNetwork}
                                            />
                                        )
                                    )
                                ) : (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center' }}>
                                            There are no social networks
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                {message && <p>{message}</p>}
                {error && <p>{error}</p>}
            </div>
        </div>
    );
};

export default AdminSocialNetwork;
