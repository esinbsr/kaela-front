import EveningLatestDescriptionList from "../components/EveningLatestDescriptionList";
import EveningLatestImageList from "../components/EveningLatestImageList";
import Footer from "../components/Footer";

// Define section identifiers to display only images in that section
const SECTIONS = {
    LATEST_COLLECTION: 5, // Section identifier for latest collection 
};

// This component displays the latest collection
const LatestCollection = () => {
  return (
    <>
    <main className="evening-latest">
      {/* Component to display the description of the latest collection */}
      <EveningLatestDescriptionList categorySlug="latest-collection" />
      {/* Component to display images of the latest collection */}
      <EveningLatestImageList start={0} end={4} additionalClass="evening-latest__image" section={SECTIONS.LATEST_COLLECTION} />
    </main>
        <Footer/>
        </>
  );
};

export default LatestCollection;
