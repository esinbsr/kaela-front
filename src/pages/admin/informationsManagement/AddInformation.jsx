import { useState} from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { addInformation } from "../../../api/informationApi"; 

const AddInformation = () => {
  const queryClient = useQueryClient();

  const [description, setDescription] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  // Mutation for adding information
  const mutation = useMutation({
    mutationFn: addInformation,
    onSuccess: (data) => {
      // If successful, invalidate the 'informations' query and reset the form
      if (data.success) {
        queryClient.invalidateQueries('informations');
        toast.success(data.message || "Information added successfully!");
        setDescription("");
        setMobile("");
        setEmail("");
        setAddress("");
      } else {
        toast.error(data.message || "An error has occurred.");
      }
    },
    // Handle server errors
    onError: (error) => {
      toast.error("Server error: " + error.message); 
    }
  });

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      description,
      mobile,
      email,
      address,
    };

    // Trigger the mutation to add information
    mutation.mutate(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <fieldset>
          <legend>Add new information</legend> 
          
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
            <button type="submit" disabled={mutation.isLoading}>
              {mutation.isLoading ? "Creating..." : "Create"} 
            </button>
          </div>
        </fieldset>
      </form>
      
      <ToastContainer />
    </>
  );
};

export default AddInformation;
