import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInformation } from "../actions/informationAction";
import { Link, useNavigate } from "react-router-dom";
import { isEmpty } from "./utils/isEmpty";
// import SocialNetworkIcon from "./utils/SocialNetworkIcon";

const HomeDescriptionList = () => {
  const dispatch = useDispatch();
  const description = useSelector((state) => state.information.information);
  const userRole = useSelector((state) => state.user.role);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getInformation());
  }, [dispatch]);

  if (isEmpty(description)) {
    return <p>Loading descriptions...</p>;
  }

  const handleAdminClick = (desc) => {
    navigate(`/adminUpdateInformation/${desc.id}`);
  };

  return (
    <div className="home__description">
      {!isEmpty(description) ? (
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
            {/* {userRole === "admin" && (
              <span className="edit-tooltip">Edit description</span>
            )} */}
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
