import CollectionImage from '../components/CollectionImage';
import SocialNetworkIcon from '../components/utils/SocialNetworkIcon';

// This component represents the collection page 
const Collection = () => {
    return (
        <div className='collection'> 
        <SocialNetworkIcon/>
            <h1>Collection</h1> 
            {/* Rendering the CollectionImage component to display images related to the collection.
                - 'start={0} end={2}': Specifies the range of images to display.
                - 'additionalClass="home__collection-image collection-center"': Adds additional CSS classes for styling. */}
            <CollectionImage start={0} end={2} additionalClass="home__collection-image collection-center"/>    
        </div>
    );
};

export default Collection;
