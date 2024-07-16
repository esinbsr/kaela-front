import CollectionImage from '../components/CollectionImage';
import Navigation from '../components/Navigation';
import HomeDescriptionList from '../components/admin/informations/HomeDescriptionList';
import HomeImageList from '../components/admin/products/HomeImageList';

const Home = () => {
    return (
        <div className='home'>
            <Navigation />
            <h1>KAELA COUTURE</h1>
            <HomeImageList start={0} end={3} additionalClass="featured-image" />
            <HomeDescriptionList />
            <CollectionImage start={3} end={5} additionalClass="more-products"/>
        
        </div>
    );
};

export default Home;