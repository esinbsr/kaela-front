import EveningDressesDescriptionList from "../components/admin/informations/EveningDressesDescriptionList";
import EveningDressesImageList from "../components/admin/products/EveningDressesImageList";
import Navigation from "../components/Navigation";

const EveningDresses = () => {
    return (
        <div className="evening">
            <Navigation />
            <h1>Evening Dresses</h1>
            <EveningDressesDescriptionList />
            <EveningDressesImageList start={5} end={9} additionalClass="image" />
        </div>
    );
};

export default EveningDresses;
