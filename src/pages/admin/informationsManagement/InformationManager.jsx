import { useEffect } from "react";
import AdminNavigation from "../AdminNavigation";
import AddInformation from "./AddInformation";
import DisplayInformation from "./DisplayInformation";
import "../../../assets/styles/components/_table-admin.scss";
import "../../../assets/styles/components/_form-admin.scss";

// This component manages information by rendering a navigation bar and two child components: one for adding new information and another for displaying existing information
const InformationManager = () => {
  // UseEffect hook to scroll to the top of the page when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="navigation-and-content">
      <AdminNavigation />
      <div className="content-wrapper">
        <AddInformation />
        <DisplayInformation />
      </div>
    </div>
  );
};

export default InformationManager;
