import EveningLatestDescriptionList from "../components/EveningLatestDescriptionList";
import EveningLatestImageList from "../components/EveningLatestImageList";

const SECTIONS = {
    EVENING_DRESSES: 4,
};

const EveningDresses = () => {
  return (
    <div className="evening-latest">
      <EveningLatestDescriptionList categoryIndex={1} />
      <EveningLatestImageList start={0} end={4} additionalClass="evening-latest__image" section={SECTIONS.EVENING_DRESSES} />
    </div>
  );
};

export default EveningDresses;
