import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

const AdminNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/");
    }

    // Masquer le titre si l'utilisateur n'est pas sur la route "/admin"
    if (location.pathname !== "/admin") {
      setShowTitle(false);
    }
  }, [navigate, location.pathname]);

  const handleLinkClick = () => {
    setShowTitle(false);
  };

  return (
    <div className="admin-container">
      {showTitle && <h1 id="h1-administration">Administration</h1>}
      <div className="admin-container__navigation">
        <Link to="/adminProduct" onClick={handleLinkClick}>Product</Link>
        <Link to="/adminInformation" onClick={handleLinkClick}>Information about me</Link>
        <Link to="/adminCategory" onClick={handleLinkClick}>Category</Link>
        <Link to="/adminSocialNetwork" onClick={handleLinkClick}>Social network</Link>
      </div>
    </div>
  );
};

export default AdminNavigation;
