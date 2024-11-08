import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import ModalAdminDelete from "../../../components/utils/ModalAdminDelete";
import { deleteInformation } from '../../../api/informationApi';

const DeleteInformation = ({ informationId }) => {
  const [modalShow, setModalShow] = useState(false); // State to control the visibility of the modal
  const queryClient = useQueryClient();

  // Mutation for deleting a information
  const mutation = useMutation({
    mutationFn: deleteInformation,
    onSuccess: (data) => {
      // If successful, show success message and refresh the categories list
      if (data.success) {
        toast.success(data.message || "Information successfully deleted!");
        queryClient.invalidateQueries('informations');
      } else {
        toast.error(data.message || "An error has occurred.");
      }
    },
    // Handle server errors
    onError: (error) => {
      toast.error("Erreur de serveur : " + error.message);
    }
  });

  // Open delete confirmation modal
  const handleDeleteClick = () => {
    setModalShow(true);
  };

  // Confirm the deletion
  const confirmDelete = () => {
    mutation.mutate(informationId);
    setModalShow(false);
  };

  // Cancel the deletion and close the modal
  const cancelDelete = () => {
    setModalShow(false);
  };

  return (
    <>
      <button onClick={handleDeleteClick} disabled={mutation.isLoading} className="red-link">
        {mutation.isLoading ? "Deleting..." : "Delete"}
      </button>

      {modalShow && (
        <ModalAdminDelete
        isOpen={modalShow}
          contentSuffix={`information : ${informationId}`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </>
  );
};

export default DeleteInformation;
