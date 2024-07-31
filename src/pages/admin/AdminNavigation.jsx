import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AdminNavigation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="admin-container">
      <h1>Administration</h1>
      <div className="admin-navigation">
        <Link to="/adminProduct">Product</Link>
        <Link to="/adminInformation">Information about me</Link>
        <Link to="/adminCategory">Category</Link>
        <Link to="/adminSocialNetwork">Social network</Link>
      </div>
    </div>
  );
};

export default AdminNavigation;
