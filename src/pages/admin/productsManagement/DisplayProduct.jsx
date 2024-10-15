import { isEmpty } from "../../../components/utils/isEmpty";
import AdminNavigation from "../AdminNavigation";
import ProductCard from "../../../components/admin/ProductCard";
import AddProduct from "./AddProduct";
import { useQuery } from "react-query";
import { getProduct } from "../../../api/productApi";

const DisplayProduct = () => {

  // Fetch products from the serveur
  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],  // The unique query key to identify this query
    queryFn: getProduct,     // The function responsible for fetching the products
  });

  // If there is data and it contains products, use it, otherwise return an empty array
  const productList = data?.length > 0 ? data : [];

  if (isLoading) return "Loading...";
  if (error) return "An error occurred: " + error.message;

  return (
    <div className="admin-container">
      <AdminNavigation />

      <main className="admin-container__content">
        <h1>Products</h1> 
        <AddProduct /> 

        <section className="table">
          <h2>List of Products</h2> 
          <div className="table__container">
            <table className="table__content">
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Category</th>
                  <th scope="col">Section</th>
                  <th scope="col" className="action-header" colSpan={2}>
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* If the list has items, render each as a row, sorted by creation date */}
                {productList ? (
                  productList
                    .slice()
                    .sort(
                      (a, b) => new Date(b.created_at) - new Date(a.created_at)
                    )
                    .map(
                      (product) =>
                        !isEmpty(product) && (
                          <ProductCard
                            key={product.id}
                            product={product}
                          />
                        )
                    )
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
        </section>
      </main>
    </div>
  );
};

export default DisplayProduct;
