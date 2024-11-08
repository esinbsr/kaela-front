import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify"; 
import { addSocialNetwork } from "../../../api/socialNetworkApi"; 

const AddSocialNetwork = () => {
  const queryClient = useQueryClient();
console.log(queryClient);
  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");

  // Mutation for adding social network
  const mutation = useMutation({
    mutationFn: addSocialNetwork,
    onSuccess: (data) => {
      // If successful, invalidate the 'socialNetwork' query and reset the form
      if (data.success) {
        queryClient.invalidateQueries('socialNetworks');
        toast.success(data.message || "Social network added successfully!");
        setPlatform("");
        setUrl("");
      } else {
        toast.error(data.message || "An error has occurred.");
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

    console.log(formData);
    // Trigger the mutation to add information
    mutation.mutate(formData);
  };

  return (
    <>
    <h2>Add a social network</h2>
      <form onSubmit={handleSubmit} className="form">
        {/* <fieldset>
          <legend>Add a New Social Network</legend> */}

            <label htmlFor="platform">Platform</label>
            <input
              type="text"
              id="platform"
              name="platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              aria-required="true"
            />

            <label htmlFor="url">URL</label>
            <input
              type="text"
              id="url"
              name="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              aria-required="true"
            />
  

  
            <button type="submit" disabled={mutation.isLoading}>
              {mutation.isLoading ? "Creating..." : "Create"}
            </button>
        {/* </fieldset> */}
      </form>
    </>
);
};

export default AddSocialNetwork;
