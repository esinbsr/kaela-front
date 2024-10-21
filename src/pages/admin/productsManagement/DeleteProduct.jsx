import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { deleteProduct } from '../../../api/productApi';
import ModalAdminDelete from "../../../components/utils/ModalAdminDelete";

const DeleteProduct = ( {productId}) => {
    const [modalShow, setModalShow] = useState(false); // State to control the visibility of the modal
    const queryClient = useQueryClient();
  
    // Mutation for deleting a product
    const mutation = useMutation({
      mutationFn: deleteProduct,
      onSuccess: (data) => {
        // If successful, show success message and refresh the products list
        if (data.success) {
          toast.success(data.message || "Produit supprimée avec succès !");
          queryClient.invalidateQueries('products');
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
      mutation.mutate(productId);
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
            contentSuffix={`product : ${productId}`}
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
        )}
      </>
    );
  };
export default DeleteProduct;