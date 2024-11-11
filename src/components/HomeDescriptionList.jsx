import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getInformation } from "../api/informationApi";
import "../assets/styles/components/_home-description.scss";

// Component to display a brief home description with a link to "About Me" page
const HomeDescriptionList = () => {
  // Fetches information data
  const { isLoading, error, data } = useQuery({
    queryKey: ["informations"],
    queryFn: getInformation,
  });

  if (isLoading) return <p role="status"> Loading...</p>; // Show loading state
  if (error) return <p role="alert">An error occurred: {error.message}</p>; // Show error state

  const description = data?.length > 0 ? data[0].description : ""; // Get first item description or empty

  return (
    <div className="home__description">
      {description && <p> {description} </p>}
      <Link
        to="/aboutMe"
        aria-label="Learn more about me"
        className="home__button"
      >
        About me {/* Link to "About Me" page */}
      </Link>
    </div>
  );
};

export default HomeDescriptionList;
