import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav aria-label="breadcrumb">
      <ul className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/admin">Admin</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          return (
            <li key={to} className={`breadcrumb-item ${index === pathnames.length - 1 ? "active" : ""}`}>
              {index === pathnames.length - 1 ? (
                <span>{value}</span>
              ) : (
                <Link to={to}>{value}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
