import { useEffect } from "react";
import AdminNavigation from "../AdminNavigation";
import AddInformation from "./AddInformation";
import DisplayInformation from "./DisplayInformation";


const InformationManager = () => {
    useEffect(() => {
        window.scrollTo(0,0);
      }, []);

    return (
        <div className="navigation-and-content">
        <AdminNavigation/>
        <div className="content-wrapper">
            <AddInformation/>
            <DisplayInformation/>
        </div>
    </div>
    );
};

export default InformationManager;