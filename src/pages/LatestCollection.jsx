import EveningLatestDescriptionList from "../components/EveningLatestDescriptionList";
import EveningLatestImageList from "../components/EveningLatestImageList";

const LatestCollection = () => {
  return (
    <div className="evening-latest">
      <EveningLatestDescriptionList categoryIndex={0} />
      <EveningLatestImageList start={9} end={13} additionalClass="image" />
    </div>
  );
};

export default LatestCollection;
