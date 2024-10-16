import { useEffect } from "react";
import CollectionImage from "../components/CollectionImage";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";


// This component represents the collection page
const Collection = () => {
  
  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  return (
    <div className="collection">
      <Helmet>
        <title>Kaela Couture Collection | Elegant Women&apos;s Fashion</title>
        <meta
          name="description"
          content="Browse the Kaela Couture collection, featuring elegant dresses and fashion pieces. From evening gowns to everyday wear, find your style with our expertly crafted designs."
        />
      </Helmet>

      <h1>Collection</h1>
      {/* Rendering the CollectionImage component to display images related to the collection.
                - 'start={0} end={2}': Specifies the range of images to display.
                - 'additionalClass="home__collection-image collection-center"': Adds additional CSS classes for styling. */}
      <CollectionImage
        start={0}
        end={2}
        additionalClass="home__collection-image collection-center"
      />
      <Footer />
    </div>
  );
};

export default Collection;
