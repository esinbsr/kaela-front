import EveningDressesImageList from "../components/admin/products/EveningDressesImageList";
import Navigation from "../components/Navigation";

const EveningDresses = () => {


    return (
        <div>
            <Navigation/>
            <h1>Evening Dresses</h1>
            <EveningDressesImageList start={5} end={7} additionalClass="image"/>
        </div>
    );
};

export default EveningDresses;