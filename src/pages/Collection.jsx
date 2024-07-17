
import CollectionImage from '../components/CollectionImage';

const Collection = () => {
    return (
        <div>
            <h1>Collection</h1>
            <CollectionImage start={3} end={5} additionalClass="more-products collection-center"/>    
        </div>
    );
};

export default Collection;