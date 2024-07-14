import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addInformation } from '../../../actions/informationAction';
import Navigation from '../../../components/Navigation';


const AdminAddInformation = () => {
    const [description, setDescription] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');

    const dispatch = useDispatch();

    const message = useSelector((state) => state.information.message);
    const error = useSelector((state) => state.information.error);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            description,
            mobile,
            address,
        };

        dispatch(addInformation(formData));
    };

    return (
        <div>
            <Navigation />
            <h2>Add Information</h2>
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

                <button type="submit">Add</button>
            </form>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default AdminAddInformation;