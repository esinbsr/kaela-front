import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import AdminNavigation from "../AdminNavigation";
import { toast } from "react-toastify";
import {
  getInformationById,
  updateInformation,
} from "../../../api/informationApi";
import "../../../assets/styles/components/_form-admin.scss";

const UpdateInformation = () => {
  // UseEffect hook to scroll to the top of the page when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { informationId } = useParams(); // Get the id of the information from the route params

  const [description, setDescription] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const queryClient = useQueryClient();

  // Fetch information data by id when the component mounts
  useQuery({
    queryKey: ["informations", informationId], // Unique query key for the information
    queryFn: () => getInformationById(informationId), // Api call to fetch the information details
    onSuccess: (data) => {
      // Populate the state with the fetched information data
      if (data) {
        setDescription(data.description || "");
        setMobile(data.mobile || "");
        setEmail(data.email || "");
        setAddress(data.address || "");
      }
    },
    // Display an error toast if the Api call fails
    onError: (error) => {
      toast.error("Error fetching information: " + error.message);
    },
  });

  // Mutation to update the information
  const mutation = useMutation({
    mutationFn: updateInformation,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries("informations"); // Invalidate the cache to refetch updated data
        toast.success(data.message || "Information updated successfully!");
      } else {
        toast.error(data.message || "An error occurred.");
      }
    },
    // Display an error toast if the mutation fails
    onError: (error) => {
      toast.error("Server error: " + error.message);
    },
  });

  // Trigger the mutation to update the information with the current state values
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      id: informationId,
      description,
      mobile,
      email,
      address,
    });
  };

  return (
    <div className="navigation-and-content">
      <AdminNavigation />
      <div className="content-wrapper">
        <h2>Modify the information</h2>
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <label htmlFor="mobile">Phone:</label>
          <input
            id="mobile"
            type="text"
            name="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="address">Address:</label>
          <input
            id="address"
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateInformation;
