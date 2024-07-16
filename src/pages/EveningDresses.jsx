import EveningDressesDescriptionList from "../components/EveningDressesDescriptionList";
import EveningLatestImageList from "../components/EveningLatestImageList";


const EveningDresses = () => {
    return (
        <div className="evening-latest">
            <h1>Evening Dresses</h1>
            <EveningDressesDescriptionList/>
            <EveningLatestImageList start={5} end={9} additionalClass="image" />
        </div>
    );
};

export default EveningDresses;
