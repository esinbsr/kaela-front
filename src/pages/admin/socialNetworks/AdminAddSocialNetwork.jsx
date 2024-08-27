import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSocialNetwork, resetSocialNetworkMessages } from "../../../actions/socialNetworkAction";
import Message from "../../../components/utils/Message";

const AdminAddSocialNetwork = () => {
  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const message = useSelector((state) => state.socialNetwork.message);
  const error = useSelector((state) => state.socialNetwork.error);

  // Reset messages only on initial mount
  useEffect(() => {
    dispatch(resetSocialNetworkMessages());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      platform,
      url,
    };

    dispatch(addSocialNetwork(formData));
  };

  useEffect(() => {
    if (message && !error) {
      setPlatform("");
      setUrl("");
    }
  }, [message, error]);

  return (
    <div className='form'>
      <h3>Add social network</h3>
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
        <button type="submit">Create</button>
      </form>
      {message && <Message message={message} type="success" />}
      {error && <Message message={error} type="error" />}
    </div>
  );
};

export default AdminAddSocialNetwork;
