import ProductCard from "../../../components/admin/ProductCard";
import { useQuery } from "react-query";
import { getProduct } from "../../../api/productApi";

const DisplayProduct = () => {
  // Fetch products from the server
  const { isLoading, error, data } = useQuery({
    queryKey: ["products"], // The unique query key to identify this query
    queryFn: getProduct, // The function responsible for fetching the products
    staleTime: 1000 * 60 * 60, // Time in milliseconds (1 hour) during which the data is considered fresh and won't be re-fetched
    cacheTime: 1000 * 60 * 60 * 24, // Time in milliseconds (24 hours) that the data will remain in cache even if it's stale
  });

  // If there is data and it contains products, use it, otherwise return an empty array
  const productList = data?.length > 0 ? data : [];

  if (isLoading) return "Loading...";
  if (error) return "An error occurred: " + error.message;

  return (
    <>
      <h2>List of Products</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Category</th>
              <th scope="col">Section</th>
              <th scope="col" colSpan={2} className="action-header">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {/* If the list has items, render each as a row, sorted by creation date */}
            {productList.length > 0 ? (
              productList.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              // If no products are available, display a message
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }} role="alert">
                  There are no products
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DisplayProduct;
