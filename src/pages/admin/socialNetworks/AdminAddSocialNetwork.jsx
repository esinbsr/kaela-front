import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSocialNetwork } from "../../../actions/socialNetworkAction";

const AdminAddSocialNetwork = () => {
  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      platform,
      url,
    };

    dispatch(addSocialNetwork(formData));
  };

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
    </div>
  );
};

export default AdminAddSocialNetwork;
