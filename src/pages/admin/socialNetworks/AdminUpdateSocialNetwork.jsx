import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSocialNetworkById, updateSocialNetwork } from "../../../actions/socialNetworkAction";

const AdminUpdateSocialNetwork = () => {
  const { socialNetworkId } = useParams();
  const dispatch = useDispatch();

  const socialNetworkById = useSelector((state) => state.socialNetwork.socialNetworkById);

  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const message = useSelector((state) => state.socialNetwork.message);
  const error = useSelector((state) => state.socialNetwork.error);

  useEffect(() => {
    if (socialNetworkId) {
      dispatch(getSocialNetworkById(socialNetworkId));
    } else {
      setResponseMessage("Social network ID missing in URL");
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
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="platform">Platform</label>
        <input
          type="text"
          id="platform"
          name="platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        />

        <label htmlFor="url">Url</label>
        <input
          type="text"
          id="url"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default AdminUpdateSocialNetwork;
