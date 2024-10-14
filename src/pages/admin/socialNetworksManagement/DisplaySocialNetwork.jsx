import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSocialNetwork,
  deleteSocialNetwork,
} from "../../../actions/socialNetworkAction";
import SocialNetworkCard from "../../../components/admin/SocialNetworkCard";
import AdminAddSocialNetwork from "./AddSocialNetwork";
import { isEmpty } from "../../../components/utils/isEmpty";
import AdminNavigation from "../AdminNavigation";
import ModalAdmin from "../../../components/utils/ModalAdmin";

const DisplaySocialNetwork = () => {
  const dispatch = useDispatch(); // Initialize Redux's dispatch function
  const socialNetwork = useSelector(
    (state) => state.socialNetwork.socialNetwork
  ); // Select the social networks from the Redux store

  const [modalShow, setModalShow] = useState(false); // State to control the visibility of the modal
  const [selectedSocialNetwork, setSelectedSocialNetwork] = useState(null); // State to track the selected social network for deletion

  // Fetch the social networks when the component mounts
  useEffect(() => {
    if (isEmpty(socialNetwork)) {
      dispatch(getSocialNetwork()); // Dispatch action to load social networks
    }
  }, [dispatch, socialNetwork]);

  // Handler to open the delete confirmation modal and set the selected social network
  const handleDelete = (socialNetwork) => {
    setSelectedSocialNetwork(socialNetwork); // Set the social network to be deleted
    setModalShow(true); // Show the modal
  };

  // Confirm deletion of the selected social network
  const confirmDelete = () => {
    if (selectedSocialNetwork && selectedSocialNetwork.id) {
      dispatch(deleteSocialNetwork(selectedSocialNetwork.id)); 
    }
    setModalShow(false); // Close the modal
    setSelectedSocialNetwork(null); // Reset the selected social network
  };

  // Cancel deletion and close the modal
  const cancelDelete = () => {
    setModalShow(false);
    setSelectedSocialNetwork(null); 
  };

  return (
    <div className="admin-container">
      <AdminNavigation />
      <main className="admin-container__content">
        <h1>Social Networks</h1>
        <AdminAddSocialNetwork />
        <section className="table">
          <h2>List of social networks</h2>
          <div className="table__container">
            <table className="table__content">
              <thead>
                <tr>
                  <th scope="col">Platform</th>
                  <th scope="col">Url</th>
                  <th scope="col" className="action-header" colSpan={2}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {!isEmpty(socialNetwork) ? (
                  socialNetwork.map(
                    (socialNetwork) => (
                        <SocialNetworkCard
                          key={socialNetwork.id}
                          socialNetwork={socialNetwork}
                          onDelete={() => handleDelete(socialNetwork)} // Pass the delete handler to the card component
                        />
                      )
                  )
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      style={{ textAlign: "center" }}
                      role="alert"
                    >
                      There are no social networks
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      {modalShow && (
        <ModalAdmin
          contentSuffix={`social network: ${selectedSocialNetwork?.platform}`} // Pass the platform name to the modal for display
          onConfirm={confirmDelete} // Pass confirm handler to the modal
          onCancel={cancelDelete} // Pass cancel handler to the modal
        />
      )}
    </div>
  );
};

export default DisplaySocialNetwork;
