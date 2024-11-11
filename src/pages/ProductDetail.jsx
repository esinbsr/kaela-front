import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Comment from "../components/comments/Comment";
import Footer from "../components/Footer";
import ProductDetailCard from "../components/admin/ProductDetailCard";
import { getProductById } from "../api/productApi";
import "../assets/styles/components/_product-detail.scss";

const ProductDetail = () => {
  // Retrieves the 'productDetailId' from the URL parameters
  const { productDetailId } = useParams();

  // Fetch products from the serveur
  const {
    data: productById,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", productDetailId],
    queryFn: () => getProductById(productDetailId),
  });

  if (isLoading) return <p>Chargement...</p>;
  if (isError)
    return <p>Une erreur est survenue lors de la récupération du produit.</p>;

  return (
    <>
      {/* If the product data has been successfully fetched, render the 'ProductDetailCard' component, 
                passing the fetched product details as props. */}
      {productById && (
        <ProductDetailCard key={productById.id} productDetail={productById} />
      )}
      <Comment />
      <Footer />
    </>
  );
};

export default ProductDetail;
