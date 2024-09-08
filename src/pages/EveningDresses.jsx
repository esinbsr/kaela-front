import EveningLatestDescriptionList from "../components/EveningLatestDescriptionList";
import EveningLatestImageList from "../components/EveningLatestImageList";
import Footer from "../components/Footer";

// Define section identifiers to display only images in that section
const SECTIONS = {
  EVENING_DRESSES: 4, // Section identifier for evening dresses
};


// This component displays evening dresses
const EveningDresses = () => {
  return (
    <>
    <main className="evening-latest">
      {/* Component to display the description of the evening dresses */}
      <EveningLatestDescriptionList categorySlug="evening-dresses" />
        {/* Component to display images of the evening dresses */}
      <EveningLatestImageList
        start={0}
        end={4}
        additionalClass="evening-latest__image"
        section={SECTIONS.EVENING_DRESSES}
      />
    </main>
    <Footer/>
    </>
  );
};

export default EveningDresses;
