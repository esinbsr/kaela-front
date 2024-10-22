import EveningLatestDescriptionList from "../components/EveningLatestDescriptionList";
import EveningLatestImageList from "../components/EveningLatestImageList";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import "../assets/styles/pages/_evening-latest.scss";


// Define section identifiers to display only images in that section
const SECTIONS = {
    LATEST_COLLECTION: 5, // Section identifier for latest collection 
};

// This component displays the latest collection
const LatestCollection = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

}, [])
  return (
    <>
    <Helmet>
    <title>Latest Fashion Collections | Kaela Couture</title>
    <meta name="description" content="Explore the latest trends and new arrivals at Kaela Couture. Our new fashion collections blend modern style with high-quality craftsmanship." />

    </Helmet>
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
