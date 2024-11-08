import "../../assets/styles/components/_modal-admin.scss";
import Modal from 'react-modal';
Modal.setAppElement('#root');

const ModalAdminDelete = ({ contentPrefix = "Are you sure you want to delete this", contentSuffix, onConfirm, onCancel, isOpen }) => {
  return (
    <Modal
        isOpen={isOpen}
        onRequestClose={onCancel}
        className="modal__content"
        overlayClassName="modal"
    >
        <h2>Delete</h2>
        <p>{`${contentPrefix} ${contentSuffix}`}</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
    </Modal>
);
  };
  
  export default ModalAdminDelete;