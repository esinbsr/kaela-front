import { Link, NavLink } from "react-router-dom";

const AdminNavigation = () => {
    return (
        <div className="admin-container">
            <h1>Administration</h1>

            <div className="admin-navitation">
            <Link to="/adminProduct">Product</Link>
            <Link to="/adminInformation">Information about me</Link>
            <Link to="/adminCategory">Category</Link>
            </div>
        </div>
    );
};

export default AdminNavigation;