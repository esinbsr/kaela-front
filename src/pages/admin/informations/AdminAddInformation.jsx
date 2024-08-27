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
    <>
      <form onSubmit={handleSubmit} className="form">
        <fieldset>
          <legend>Information Details</legend>
          
          <div className="form__group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
  
          <div className="form__group">
            <label htmlFor="mobile">Mobile</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
  
          <div className="form__group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
  
          <div className="form__button">
          <button type="submit">Create</button>
          </div>


        </fieldset>
      </form>
      
      {message && <Message message={message} type="success" />}
      {error && <Message message={error} type="error" />}
    </>
  );
  
};

export default AdminAddInformation;
