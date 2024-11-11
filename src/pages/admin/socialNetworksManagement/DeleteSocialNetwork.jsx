import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteSocialNetwork } from "../../../api/socialNetworkApi";
import { toast } from "react-toastify";
import ModalAdminDelete from "../../../components/utils/ModalAdminDelete";

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
        toast.error(data.message || "An error has occurred.");
      }
    },
    // Handle server errors
    onError: (error) => {
      toast.error("Server error: " + error.message);
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
        <ModalAdminDelete
          isOpen={modalShow}
          contentSuffix={`social network : ${socialNetworkId}`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </>
  );
};

export default DeleteSocialNetwork;
