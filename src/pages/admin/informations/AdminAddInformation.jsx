import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addInformation,
  resetInformationMessages,
} from "../../../actions/informationAction";
import Message from "../../../components/utils/Message";

const AdminAddInformation = () => {
  const [description, setDescription] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();
  const message = useSelector((state) => state.information.message);
  const error = useSelector((state) => state.information.error);

  // Reset messages when the component mounts
  useEffect(() => {
    dispatch(resetInformationMessages());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      description,
      mobile,
      address,
    };

    dispatch(addInformation(formData));
  };

  useEffect(() => {
    if (message && !error) {
      setDescription("");
      setMobile("");
      setAddress("");
    }
  }, [message, error]);

  return (
    <div className="form">
      <h3>Add information</h3>
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

        <button type="submit">Create</button>
      </form>
      {message && <Message message={message} type="success" />}
      {error && <Message message={error} type="error" />}
    </div>
  );
};

export default AdminAddInformation;
