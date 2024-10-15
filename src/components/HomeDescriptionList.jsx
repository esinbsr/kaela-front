import { useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "react-query";
import { getInformation } from "../api/informationApi";

const HomeDescriptionList = () => {

  const {isLoading, error, data} = useQuery({
    queryKey: ['informations'],
    queryFn: getInformation
  });

  const description = data?.length > 0 ? data : [];

  const {auth} = useContext(AuthContext);
  const userRole = auth.role;

  const navigate = useNavigate();


  const handleAdminClick = (desc) => {
    navigate(`/updateInformation/${desc.id}`);
  };

  if (isLoading) return "Loading...";
  if (error) return "An error occurred: " + error.message;

  return (
    <div className="home__description">
      {description ? (
        <>
          <p
            key={description[0].id}
            onClick={
              userRole === "admin"
                ? () => handleAdminClick(description[0])
                : null
            }
            className={userRole === "admin" ? "clickable" : ""}
          >
            {description[0].description}
            {userRole === "admin" && (
              <span className="edit-tooltip">Edit description</span>
            )}
          </p>

          <Link
            to="/aboutMe"
            aria-label="Learn more about me"
            className="home__button"
          >
            About me
          </Link>
        </>
      ) : (
        <p>Description not found.</p>
      )}
    </div>
  );
};

export default HomeDescriptionList;
