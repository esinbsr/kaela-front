import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getInformationById, updateInformation } from '../../../actions/informationAction';

const AdminInformationModify = () => {
    const { informationId } = useParams();
    const dispatch = useDispatch();

    const singleInformation = useSelector((state) => state.information.singleInformation);


    const [description, setDescription] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const message = useSelector((state) => state.information.message);
    const error = useSelector((state) => state.information.error);

    useEffect(() => {
        if (informationId) {
            dispatch(getInformationById(informationId));
        } else {
            setResponseMessage('Information ID missing in URL');
        }
    }, [dispatch, informationId]);

    useEffect(() => {
        if (singleInformation) {
            setDescription(singleInformation.description);
            setMobile(singleInformation.mobile);
            setAddress(singleInformation.address);
        }
    }, [singleInformation]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            id: informationId,
            description,
            mobile,
            address,
        };

        dispatch(updateInformation(formData));
    };

    return (
        <div>
            <h1>Update Information</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>

                <label htmlFor="mobile">Mobile</label>
                <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                />

                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <button type="submit">Modify</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default AdminInformationModify;