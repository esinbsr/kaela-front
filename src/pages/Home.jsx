import CollectionImage from "../components/CollectionImage";
import HomeDescriptionList from "../components/HomeDescriptionList";
import HomeImageList from "../components/HomeImageList";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import '../assets/styles/pages/_home.scss';
import '../assets/styles/components/_collection.scss';

// This component serves as the main container for combining 3 sub-components
const Home = () => {
  useEffect(() => {
    window.scrollTo(0,0);
  }, []);
  
  return (
    <div className="home">
      <Helmet>
        <title>Kaela Couture | Luxury Fashion for Women </title>
        <meta
          name="description"
          content="Explore Kaela Couture's exclusive collection of luxury women's fashion. Discover timeless elegance, high-quality craftsmanship, and unique designs for every occasion."
        />
      </Helmet>
      <h1>Kaela Couture</h1>
      {/* Renders a list of home header images with a custom CSS class */}
      <HomeImageList start={0} end={3} additionalClass="home__header-image" />
      {/* Renders a list of descriptions for the home page */}
      <HomeDescriptionList />
      {/* Renders a collection of images with a custom CSS class */}
      <CollectionImage
        start={0}
        end={2}
        additionalClass="home__collection-image"
      />
      <Footer />
    </div>
  );
};

export default Home;
