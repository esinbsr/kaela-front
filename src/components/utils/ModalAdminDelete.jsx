import "../../assets/styles/components/_modal-admin.scss";
import Modal from "react-modal";
Modal.setAppElement("#root"); // Set the root element for accessibility

// Modal component to confirm deletion action in the admin interface
const ModalAdminDelete = ({
  contentPrefix = "Are you sure you want to delete this", // Default prefix message
  contentSuffix, // Customizable suffix to specify the item to be deleted
  onConfirm, // Function to handle confirmation of deletion
  onCancel, // Function to handle cancellation of deletion
  isOpen, // Boolean to control modal visibility
}) => {
  return (
    <Modal
      isOpen={isOpen} // Open modal if isOpen is true
      onRequestClose={onCancel} // Close modal when user clicks outside or presses Esc
      className="modal__content" // Class for modal content styling
      overlayClassName="modal" // Class for modal overlay styling
    >
      <h2>Delete</h2>
      <p>{`${contentPrefix} ${contentSuffix}`}</p>{" "}
      {/* Display confirmation message */}
      <button onClick={onConfirm}>Yes</button> {/* Confirm button */}
      <button onClick={onCancel}>No</button> {/* Cancel button */}
    </Modal>
  );
};

export default ModalAdminDelete;
