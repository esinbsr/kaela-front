import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInformation } from "../actions/informationAction";
import { Link, useNavigate } from "react-router-dom";
import { isEmpty } from "./utils/isEmpty";
// import SocialNetworkIcon from "./utils/SocialNetworkIcon";

const HomeDescriptionList = () => {
  const dispatch = useDispatch();
  const description = useSelector((state) => state.information.information);
  const error = useSelector((state) => state.information.error);
  const userRole = useSelector((state) => state.user.role);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getInformation());
  }, [dispatch]);

  if (error) {
    return <p>Error loading description: {error}</p>;
  }

  if (isEmpty(description)) {
    return <p>Loading...</p>;
  }

  const handleAdminClick = (desc) => {
    navigate(`/adminUpdateInformation/${desc.id}`);
  };

  return (
    <div className="home__description">
      {!isEmpty(description) ? (
        description.slice(0, 1).map((desc) => (
          <div
            key={desc.id}
            onClick={userRole === "admin" ? () => handleAdminClick(desc) : null}
            className={userRole === "admin" ? "clickable" : ""}
          >
            <p id="description">
              {desc.description}
              {userRole === "admin" && (
                <span className="edit-tooltip">Edit description</span>
              )}
            </p>
            <Link to="/aboutMe" aria-labelledby="description" className="home__button">
              About me
            </Link>
          </div>
        ))
      ) : (
        <p>Description not found.</p>
      )}
    </div>
  );
  
};

export default HomeDescriptionList;
