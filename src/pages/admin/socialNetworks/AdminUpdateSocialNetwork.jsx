import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSocialNetworkById, updateSocialNetwork } from "../../../actions/socialNetworkAction";
import AdminNavigation from "../AdminNavigation";
import Message from "../../../components/utils/Message";

const AdminUpdateSocialNetwork = () => {
  const { socialNetworkId } = useParams();
  const dispatch = useDispatch();

  const socialNetworkById = useSelector((state) => state.socialNetwork.socialNetworkById);

  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");

  const message = useSelector((state) => state.socialNetwork.message);
  const error = useSelector((state) => state.socialNetwork.error);

  useEffect(() => {
    if (socialNetworkId) {
      dispatch(getSocialNetworkById(socialNetworkId));
    }
  }, [dispatch, socialNetworkId]);

  useEffect(() => {
    if (socialNetworkById) {
      setPlatform(socialNetworkById.platform || "");
      setUrl(socialNetworkById.url || "");
    }
  }, [socialNetworkById]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      id: socialNetworkId,
      platform,
      url,
    };

    dispatch(updateSocialNetwork(formData));
  };

  return (
    <div className="admin-container">
      <AdminNavigation />
      <div className="admin-container__content">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Update Social Network</legend>
  
              <div className="form__group">
                <label htmlFor="platform">Platform</label>
                <input
                  type="text"
                  id="platform"
                  name="platform"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                />
              </div>
  
              <div className="form__group">
                <label htmlFor="url">Url</label>
                <input
                  type="text"
                  id="url"
                  name="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
  
              <div className="form__button">
                <button type="submit">Update</button>
              </div>
            </fieldset>
          </form>
          {message && <Message message={message} type="success" />}
          {error && <Message message={error} type="error" />}
        </div>
      </div>
    </div>
  );
  
  
};

export default AdminUpdateSocialNetwork;
