import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import AdminNavigation from "../AdminNavigation";
import { toast, ToastContainer } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css'; 
import { getSocialNetworkById, updateSocialNetwork } from "../../../api/socialNetworkApi"; 

const UpdateSocialNetwork = () => {
  
  const { socialNetworkId } = useParams();  // Get social network id from route params
  
  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");

  const queryClient = useQueryClient(); 

  // Fetch social netwoek data by id when the component mounts
  useQuery({
    queryKey: ["socialNetworks", socialNetworkId],  // Unique query key for the social network
    queryFn: () => getSocialNetworkById(socialNetworkId),  // Api call to fetch the social network details
    onSuccess: (data) => {
      if (data) {
        // Populate the state with the fetched social network data
        setPlatform(data.platform || "");
        setUrl(data.url || ""); 
      }
    },
    // Display an error toast if the Api call fails
    onError: (error) => {
      toast.error("Error fetching social network: " + error.message);
    }
  });

  // Mutation to update the social network
  const mutation = useMutation({
    mutationFn: updateSocialNetwork, 
    onSuccess: (data) => {
      queryClient.invalidateQueries("socialNetworks"); // Invalidate the cache to refetch updated data
      if (data.success) {
        toast.success(data.message); 
      } else {
        toast.error(data.message); 
      }
    },
    // Display an error toast if the mutation fails
    onError: (error) => {
      toast.error("Error updating social network: " + error.message);  
    }
  });

  // Form submission handler to update social network
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Triggers the mutation to send the data to the server
    mutation.mutate({
      id: socialNetworkId,  
      platform, 
      url, 
    });
  };

  return (
    <div className="admin-container">
      <AdminNavigation />  
      <div className="admin-container__content">
        <form onSubmit={handleSubmit} className="form">
          <fieldset>
            <legend>Update Social Network</legend>  

            <div className="form__group">
              <label htmlFor="platform">Platform:</label> 
              <input
                id="platform"
                type="text"
                name="platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              />
            </div>

            <div className="form__group">
              <label htmlFor="url">URL:</label> 
              <input
                id="url"
                type="text"
                name="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <div className="form__button">
              <button type="submit" disabled={mutation.isLoading}>
                {mutation.isLoading ? "Updating..." : "Update"}  
              </button>
            </div>
          </fieldset>
        </form>
        <ToastContainer />  
      </div>
    </div>
  );
};

export default UpdateSocialNetwork;
