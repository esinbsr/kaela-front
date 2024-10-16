import { useState} from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify"; 
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
    <h2>Add an information</h2>
      <form onSubmit={handleSubmit} className="form">
    
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
   
  
 
            <label htmlFor="mobile">Mobile</label> 
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
     
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
  
 
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
 

            <button type="submit" disabled={mutation.isLoading}>
              {mutation.isLoading ? "Creating..." : "Create"} 
            </button>
   
        {/* </fieldset> */}
      </form>
    </>
  );
};

export default AddInformation;
