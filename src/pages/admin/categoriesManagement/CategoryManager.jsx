import { useEffect } from "react";
import AdminNavigation from "../AdminNavigation";
import AddCategory from "./AddCategory";
import DisplayCategory from "./DisplayCategory"


const CategoryManager = () => {

    useEffect(() => {
        window.scrollTo(0,0);
      }, []);

    return (
        <div className="navigation-and-content">
        <AdminNavigation/>
        <div className="content-wrapper">
            <AddCategory/>
            <DisplayCategory/>
        </div>
    </div>
    );
};

export default CategoryManager;