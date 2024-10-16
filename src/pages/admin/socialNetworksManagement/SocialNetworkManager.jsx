import { useEffect } from "react";
import AdminNavigation from "../AdminNavigation";
import AddSocialNetwork from "./AddSocialNetwork";
import DisplaySocialNetwork from "./DisplaySocialNetwork";


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