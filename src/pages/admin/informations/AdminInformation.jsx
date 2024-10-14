import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteInformation,
  getInformation,
} from "../../../actions/informationAction";
import InformationCard from "../../../components/admin/InformationCard";
import AdminAddInformation from "./AdminAddInformation";
import { isEmpty } from "../../../components/utils/isEmpty";
import AdminNavigation from "../AdminNavigation";
import ModalAdmin from "../../../components/utils/ModalAdmin";

const AdminInformation = () => {
  const dispatch = useDispatch(); // Initialize Redux's dispatch function
  const information = useSelector((state) => state.information.information); // Select the 'information' data from the Redux store

  const [modalShow, setModalShow] = useState(false); // State to control the visibility of the modal
  const [selectedInformation, setSelectedInformation] = useState(null); // State to track the selected information for deletion

  // Fetch the information data when the component mounts
  useEffect(() => {
    if (isEmpty(information)) {
      dispatch(getInformation());
    }
  }, [dispatch, information]);

  // Handler to open the delete confirmation modal and set the selected information
  const handleDelete = (info) => {
    setSelectedInformation(info);
    setModalShow(true);
  };

  // Confirm deletion of the selected information
  const confirmDelete = () => {
    if (selectedInformation && selectedInformation.id) {
      dispatch(deleteInformation(selectedInformation.id)); // Dispatch action to delete the information
    }
    setModalShow(false); // Close the modal
    setSelectedInformation(null); // Reset selected information
  };

  // Cancel deletion and close the modal
  const cancelDelete = () => {
    setModalShow(false);
    setSelectedInformation(null);
  };

  return (
    <div className="admin-container">
      <AdminNavigation />

      <main className="admin-container__content">
        <h1>My Information</h1>
        <AdminAddInformation />
        <section className="table">
          <h2>List of information</h2>
          <div className="table__container">
            <table className="table__content">
              <thead>
                <tr>
                  <th scope="col">Description</th>
                  <th scope="col">Mobile</th>
                  <th scope="col">Email</th>
                  <th scope="col">Address</th>
                  <th scope="col" className="action-header" colSpan={2}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {!isEmpty(information) ? (
                  // Map through the information array and render a row for each item
                  information.map((info) => (
                    <InformationCard
                      key={info.id}
                      infos={info}
                      onDelete={() => handleDelete(info)} // Pass the delete handler to the card component
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      style={{ textAlign: "center" }}
                      role="alert"
                    >
                      There is no information
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {modalShow && selectedInformation && (
        <ModalAdmin
          contentSuffix={`information: ${selectedInformation?.description}`} // Pass information description to the modal for display
          onConfirm={confirmDelete} // Pass confirm handler to the modal
          onCancel={cancelDelete} // Pass cancel handler to the modal
        />
      )}
    </div>
  );
};

export default AdminInformation;
