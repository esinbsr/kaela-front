import { useEffect } from "react";
import AdminNavigation from "../AdminNavigation";
import AddSocialNetwork from "./AddSocialNetwork";
import DisplaySocialNetwork from "./DisplaySocialNetwork";
import "../../../assets/styles/components/_table-admin.scss";
import "../../../assets/styles/components/_form-admin.scss";

// This component manages social networks by rendering a navigation bar and two child components: one for adding a social network and another for displaying existing social networks
const SocialNetworkManager = () => {
  // UseEffect hook to scroll to the top of the page when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="navigation-and-content">
      <AdminNavigation />
      <div className="content-wrapper">
        <AddSocialNetwork />
        <DisplaySocialNetwork />
      </div>
    </div>
  );
};

export default SocialNetworkManager;
