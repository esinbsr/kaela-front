import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getSocialNetwork } from '../../../actions/socialNetworkAction';
import { isEmpty } from '../../../components/Utils';
import AdminSocialNetworkCard from '../../../components/admin/socialNetwork/AdminSocialNetworkCard';
import AdminAddSocialNetwork from './AdminAddSocialNetwork';
import Breadcrumb from '../../../components/utils/Breadcrumb';

const AdminSocialNetwork = () => {
    const dispatch = useDispatch();
    const socialNetwork = useSelector((state) => state.socialNetwork.socialNetwork);
    const message = useSelector((state) => state.socialNetwork.message);
    const error = useSelector((state) => state.socialNetwork.error);

    useEffect(() => {
        dispatch(getSocialNetwork());
    }, [dispatch]);

    return (
        <div>
            <Breadcrumb/>
            <AdminAddSocialNetwork/>
            <h1>Social Networks</h1>
            <div className="table-container">
                <table className="table">
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
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default AdminSocialNetwork;
