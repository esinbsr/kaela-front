import CollectionImage from '../components/CollectionImage';
import HomeDescriptionList from '../components/HomeDescriptionList';
import HomeImageList from '../components/HomeImageList';

const Home = () => {
    return (
        <div className='home'>
            <h1>KAELA COUTURE</h1>
            <HomeImageList start={0} end={3} additionalClass="home__header-image" />
            <HomeDescriptionList />
            <CollectionImage start={0} end={2} additionalClass="home__collection-image"/>
        </div>
    );
};

export default Home;
