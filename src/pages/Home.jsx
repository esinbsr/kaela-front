import Navigation from '../components/Navigation';
import ProductImageList from '../components/admin/products/ProductImageList';
import DescriptionList from '../components/admin/informations/DescriptionList';

const Home = () => {
    return (
        <div className='home'>
            <Navigation />
            <h1>KAELA COUTURE</h1>
            <ProductImageList start={0} end={3} additionalClass="featured-image" />
            <DescriptionList />
            <h2>Lorem</h2>
            <ProductImageList start={3} end={5} additionalClass="more-products" />
        </div>
    );
};

export default Home;
