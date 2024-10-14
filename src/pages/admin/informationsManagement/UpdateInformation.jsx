import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getInformationById,
  updateInformation,
} from "../../../actions/informationAction";
import AdminNavigation from "../AdminNavigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateInformation = () => {
  const { informationId } = useParams();
  const dispatch = useDispatch();

  const informationById = useSelector(
    (state) => state.information.singleInformation
  );

  const [description, setDescription] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const message = useSelector((state) => state.information.message);
  const error = useSelector((state) => state.information.error);

  useEffect(() => {
    if (informationId) {
      dispatch(getInformationById(informationId));
    }
    window.scrollTo(0, 0);
  }, [dispatch, informationId]);

  useEffect(() => {
    if (informationById) {
      setDescription(informationById.description ?? ""); 
      setMobile(informationById.mobile ?? "");
      setEmail(informationById.email ?? "");
      setAddress(informationById.address ?? "");
    }
  }, [informationById]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      id: informationId,
      description,
      mobile,
      email,
      address,
    };

    dispatch(updateInformation(formData));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
    }
  }, [message, error]);

  return (
    <div className="admin-container">
      <AdminNavigation />
      <div className="admin-container__content">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Update Information</legend>

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
                <button type="submit">Update</button>
              </div>
            </fieldset>
          </form>

          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default UpdateInformation;
