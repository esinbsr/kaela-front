import EveningLatestDescriptionList from "../components/EveningLatestDescriptionList";
import EveningLatestImageList from "../components/EveningLatestImageList";

const SECTIONS = {
    LATEST_COLLECTION: 5,
};

const LatestCollection = () => {
  return (
    <div className="evening-latest">
      <EveningLatestDescriptionList categoryIndex={0} />
      <EveningLatestImageList start={0} end={4} additionalClass="evening-latest__image" section={SECTIONS.LATEST_COLLECTION} />
    </div>
  );
};

export default LatestCollection;
