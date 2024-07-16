
import Navigation from '../components/Navigation';
import CollectionImage from '../components/CollectionImage';

const Collection = () => {
    return (
        <div>
            <Navigation/>
            <CollectionImage start={3} end={5} additionalClass="more-products"/>    
        </div>
    );
};

export default Collection;