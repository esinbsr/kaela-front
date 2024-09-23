
import { useDispatch, useSelector } from "react-redux"; 
import AdminProductDetailCard from "../components/admin/products/ProductDetailCard"; 
import { useEffect } from "react"; 
import { getProductById } from "../actions/productAction"; 
import { useParams } from "react-router-dom"; 
import Comment from "../components/comments/Comment"; 
import { isEmpty } from "../components/utils/isEmpty";
import Footer from "../components/Footer"; 

const ProductDetail = () => {
    // Extract the product ID from the URL parameters
    const { productDetailId } = useParams();
    
    // Initialize dispatch and selector hooks
    const dispatch = useDispatch();
    const productById = useSelector((state) => state.product.productById);

    // Use the useEffect hook to dispatch the action to fetch product details when the ID changes
    useEffect(() => {
        window.scrollTo(0, 0);
        if (productDetailId) {
            dispatch(getProductById(productDetailId)); // Dispatch the action to get product details
        }
    }, [dispatch, productDetailId]); // Dependencies of the useEffect: it runs when dispatch or productDetailId changes

    return (
        <>
            {/* Check if the product details are available */}
            {!isEmpty(productById) ? (
                <AdminProductDetailCard key={productById.id} productDetail={productById} />
                // Display the AdminProductDetailCard component if product details are not empty
            ) : (
                <p>No products found.</p>
                // Message displayed when product details are empty
            )}

            <Comment/>
            <Footer/>
    
        </>
    );
};

export default ProductDetail;
