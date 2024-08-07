import CollectionImage from '../components/CollectionImage';
import HomeDescriptionList from '../components/HomeDescriptionList';
import HomeImageList from '../components/HomeImageList';

// This component serves as the main container for combining 3 sub-components
const Home = () => {
    return (
        <div className='home'>
            <h1>KAELA COUTURE</h1>
            {/* Renders a list of home header images with a custom CSS class */}
            <HomeImageList start={0} end={3} additionalClass="home__header-image" />
            {/* Renders a list of descriptions for the home page */}
            <HomeDescriptionList />
            {/* Renders a collection of images with a custom CSS class */}
            <CollectionImage start={0} end={2} additionalClass="home__collection-image"/>
        </div>
    );
};

export default Home;
