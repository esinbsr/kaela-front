import CollectionImage from '../components/CollectionImage';

const Collection = () => {
    return (
        <div className='collection'>
            <h1>Collection</h1>
            <CollectionImage start={0} end={2} additionalClass="home__collection-image collection-center"/>    
        </div>
    );
};

export default Collection;
