import { useEffect } from "react";
import AdminNavigation from "../AdminNavigation";
import AddSocialNetwork from "./AddSocialNetwork";
import DisplaySocialNetwork from "./DisplaySocialNetwork";
import "../../../assets/styles/components/_table-admin.scss";
import "../../../assets/styles/components/_form-admin.scss";

const SocialNetworkManager = () => {

    useEffect(() => {
        window.scrollTo(0,0);
      }, []);

    return (
        <div className="navigation-and-content">
        <AdminNavigation/>
        <div className="content-wrapper">
            <AddSocialNetwork/>
            <DisplaySocialNetwork/>
        </div>
    </div>
    );
};

export default SocialNetworkManager;