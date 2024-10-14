import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { deleteCategory } from '../../../api/categoryApi';
import ModalAdmin from "../../../components/utils/ModalAdmin";

const DeleteCategory = ({ categoryId }) => {
  
  const [modalShow, setModalShow] = useState(false); // State to control the visibility of the modal
  const queryClient = useQueryClient();

  // Mutation for deleting a category
  const mutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: (data) => {
      // If successful, show success message and refresh the categories list
      if (data.success) {
        toast.success(data.message || "Category deleted successfully!");
        queryClient.invalidateQueries('categories'); 
      } else {
        toast.error(data.message || "An error has occurred.");
      }
    },
    // Handle server errors
    onError: (error) => {
      toast.error("Server error: " + error.message);
    }
  });

  // Open delete confirmation modal
  const handleDeleteClick = () => {
    setModalShow(true);
  };

  // Confirm the deletion
  const confirmDelete = () => {
    mutation.mutate(categoryId); 
    setModalShow(false);
  };

  // Cancel the deletion and close the modal
  const cancelDelete = () => {
    setModalShow(false);
  };

  return (
    <>
      <button onClick={handleDeleteClick} disabled={mutation.isLoading} className="delete-color ">
        {mutation.isLoading ? "Deleting..." : "Delete"} 
      </button>

      {/* Show confirmation modal */}
      {modalShow && (
        <ModalAdmin
          contentSuffix={`category : ${categoryId}`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </>
  );
};

export default DeleteCategory;
