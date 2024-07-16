import EveningDressesDescriptionList from "../components/EveningDressesDescriptionList";
import EveningLatestImageList from "../components/EveningLatestImageList";


const LatestCollection = () => {
  return (
    <div className="evening-latest">
        <h1>Latest Collection</h1>
      <EveningDressesDescriptionList/>
      <EveningLatestImageList start={9} end={13} additionalClass="image" />
    </div>
  );
};

export default LatestCollection;
