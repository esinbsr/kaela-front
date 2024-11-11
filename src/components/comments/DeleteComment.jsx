import { useMutation, useQueryClient } from "react-query";

import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { deleteComment } from "../../api/commentApi";
import { useState } from "react";
import ModalAdminDelete from "../utils/ModalAdminDelete";

const DeleteComment = ({ commentId }) => {
  const [modalShow, setModalShow] = useState(false);
  const queryClient = useQueryClient();

  // Mutation to delete the comment
  const mutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Comment deleted successfully");
        queryClient.invalidateQueries("comments");
      } else {
        toast.error(data.message || "Could not delete comment");
      }
    },
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
    mutation.mutate(commentId);
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
        className="delete-button"
        aria-label="Delete comment"
      >
        <FaTrash className="delete-icon" />
      </button>

      {/* Show confirmation modal */}
      {modalShow && (
        <ModalAdminDelete
          contentSuffix="comment ?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </>
  );
};

export default DeleteComment;
