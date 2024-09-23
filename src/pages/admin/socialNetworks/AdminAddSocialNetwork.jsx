import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSocialNetwork, resetSocialNetworkMessages } from "../../../actions/socialNetworkAction";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const AdminAddSocialNetwork = () => {
  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const message = useSelector((state) => state.socialNetwork.message);
  const error = useSelector((state) => state.socialNetwork.error);


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
      toast.success(message); 
      setPlatform("");
      setUrl("");
    } else if (error) {
      toast.error(error);
    }
  }, [message, error]);

  return (
    <div className="form">
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Add a new social network</legend>

                <div className="form__group">
                    <label htmlFor="platform">Platform</label>
                    <input
                        type="text"
                        id="platform"
                        name="platform"
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                        aria-required="true"
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
                        aria-required="true"
                    />
                </div>

                <div className="form__button">
                    <button type="submit">Create</button>
                </div>
            </fieldset>
        </form>
        <ToastContainer />
    </div>
  );
};

export default AdminAddSocialNetwork;
