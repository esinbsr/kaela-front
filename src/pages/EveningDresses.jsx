import EveningLatestDescriptionList from "../components/EveningLatestDescriptionList";
import EveningLatestImageList from "../components/EveningLatestImageList";

const EveningDresses = () => {
  return (
    <div className="evening-latest">
      <EveningLatestDescriptionList categoryIndex={1} />
      <EveningLatestImageList start={5} end={9} additionalClass="image" />
    </div>
  );
};

export default EveningDresses;
