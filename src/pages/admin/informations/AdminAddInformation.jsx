import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addInformation, resetInformationMessages } from "../../../actions/informationAction";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const AdminAddInformation = () => {
  const [description, setDescription] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();
  const message = useSelector((state) => state.information.message);
  const error = useSelector((state) => state.information.error);


  useEffect(() => {
    dispatch(resetInformationMessages());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      description,
      mobile,
      email,
      address,
    };

    dispatch(addInformation(formData));
  };


  useEffect(() => {
    if (message && !error) {
      toast.success(message); 
      setDescription("");
      setMobile("");
      setEmail("");
      setAddress("");
    } else if (error) {
      toast.error(error); 
    }
  }, [message, error]);

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <fieldset>
          <legend>Add new information</legend>
          
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
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
      
      <ToastContainer />
    </>
  );
};

export default AdminAddInformation;
