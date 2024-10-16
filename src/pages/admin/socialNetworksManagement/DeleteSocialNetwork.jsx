import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteSocialNetwork } from "../../../api/socialNetworkApi";
import { toast } from "react-toastify";
import ModalAdmin from "../../../components/utils/ModalAdmin";

const DeleteSocialNetwork = ({ socialNetworkId }) => {
  const [modalShow, setModalShow] = useState(false); // State to control the visibility of the modal
  const queryClient = useQueryClient();

  // Mutation for deleting a social networks
  const mutation = useMutation({
    mutationFn: deleteSocialNetwork,
    onSuccess: (data) => {
      // If successful, show success message and refresh the social networks list
      if (data.success) {
        toast.success(data.message);
        queryClient.invalidateQueries("socialNetworks");
      } else {
        toast.error(data.message || "Une erreur est survenue.");
      }
    },
    // Handle server errors
    onError: (error) => {
      toast.error("Erreur de serveur : " + error.message);
    },
  });

   // Open delete confirmation modal
  const handleDeleteClick = () => {
    setModalShow(true);
  };

  // Confirm the deletion
  const confirmDelete = () => {
    mutation.mutate(socialNetworkId);
    setModalShow(false);
  };

  // Cancel the deletion and close the modal
  const cancelDelete = () => {
    setModalShow(false);
  };

  return (
    <>
      <button
        onClick={handleDeleteClick}
        disabled={mutation.isLoading}
        className="red-link"
      >
        {mutation.isLoading ? "Deleting..." : "Delete"}
      </button>

      {modalShow && (
        <ModalAdmin
          contentSuffix={`social network : ${socialNetworkId}`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </>
  );
};

export default DeleteSocialNetwork;
