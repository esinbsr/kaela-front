import "../../assets/styles/components/_modal-admin.scss";
const ModalAdminDelete = ({ contentPrefix = "Are you sure you want to delete this", contentSuffix, onConfirm, onCancel }) => {
    return (
      <div className="modal">
        <div className="modal__content">
          <h2>Delete</h2>
          <p>{`${contentPrefix} ${contentSuffix}`}</p>
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    );
  };
  
  export default ModalAdminDelete;