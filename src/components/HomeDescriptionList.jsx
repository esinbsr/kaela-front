import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getInformation } from "../api/informationApi";
import '../assets/styles/components/_home-description.scss';

const HomeDescriptionList = () => {

  const { isLoading, error, data } = useQuery({
    queryKey: ['informations'],
    queryFn: getInformation
  });
  
  if (isLoading) return <p role="status"> Loading...</p>;
  if (error) return <p role="alert">An error occurred: {error.message}</p>;

  const description = data?.length > 0 ? data[0].description : '';

  return (
    <div className="home__description">
      {description && (
        <p> {description} </p>
      )}
      <Link
        to="/aboutMe"
        aria-label="Learn more about me"
        className="home__button"
      >
        About me
      </Link>
    </div>
  );
};

export default HomeDescriptionList;