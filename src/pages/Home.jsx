

import CollectionImage from '../components/CollectionImage';
import HomeDescriptionList from '../components/HomeDescriptionList';
import HomeImageList from '../components/HomeImageList';

const Home = () => {
    return (
        <div className='home'>
            <h1>KAELA COUTURE</h1>
            <HomeImageList start={0} end={3} additionalClass="featured-image" />
            <HomeDescriptionList />
            <CollectionImage start={3} end={5} additionalClass="more-products"/>
        
        </div>
    );
};

export default Home;