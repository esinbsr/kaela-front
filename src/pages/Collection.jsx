
import CollectionImage from '../components/CollectionImage';

const Collection = () => {
    return (
        <div>
            <h1>Collection</h1>
            <CollectionImage start={0} end={2} additionalClass="collection-image collection-center"/>    
        </div>
    );
};

export default Collection;