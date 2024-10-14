import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import ModalAdmin from "../../../components/utils/ModalAdmin"; 
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
        toast.success(data.message || "Information supprimée avec succès !");
        queryClient.invalidateQueries('informations');
      } else {
        toast.error(data.message || "Une erreur est survenue.");
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
      <button onClick={handleDeleteClick} disabled={mutation.isLoading} className="delete-color">
        {mutation.isLoading ? "Deleting..." : "Delete"}
      </button>

      {modalShow && (
        <ModalAdmin
          contentSuffix={`information : ${informationId}`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </>
  );
};

export default DeleteInformation;
