import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { addSocialNetwork } from "../../../api/socialNetworkApi"; 

const AddSocialNetwork = () => {
  const queryClient = useQueryClient();

  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");

  // Mutation for adding social network
  const mutation = useMutation({
    mutationFn: addSocialNetwork,
    onSuccess: (data) => {
      // If successful, invalidate the 'socialNetwork' query and reset the form
      if (data.success) {
        queryClient.invalidateQueries('socialNetwork');
        toast.success(data.message || "Réseau social ajouté avec succès !");
        setPlatform("");
        setUrl("");
      } else {
        toast.error(data.message || "Une erreur est survenue.");
      }
    },
    // Handle server errors
    onError: (error) => {
      toast.error("Erreur serveur : " + error.message);
    }
  });

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      platform,
      url,
    };

    // Trigger the mutation to add information
    mutation.mutate(formData);
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Add a New Social Network</legend>

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
            <label htmlFor="url">URL</label>
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
            <button type="submit" disabled={mutation.isLoading}>
              {mutation.isLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </fieldset>
      </form>
      <ToastContainer />
    </div>
);
};

export default AddSocialNetwork;
