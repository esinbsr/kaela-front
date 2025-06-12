import ProductCard from "../../../components/admin/ProductCard";
import { useQuery } from "react-query";
import { getProduct } from "../../../api/productApi";
import { useState } from "react";
import "../../../assets/styles/components/_search-bar.scss";
import { IoIosSearch } from "react-icons/io";

const DisplayProduct = () => {
  const [search, setSearch] = useState("");
  // Fetch products from the server
  const { isLoading, error, data } = useQuery({
    queryKey: ["products"], // The unique query key to identify this query
    queryFn: getProduct, // The function responsible for fetching the products
    staleTime: 1000 * 60 * 60, // Time in milliseconds (1 hour) during which the data is considered fresh and won't be re-fetched
    cacheTime: 1000 * 60 * 60 * 24, // Time in milliseconds (24 hours) that the data will remain in cache even if it's stale
  });

  // If there is data and it contains products, use it, otherwise return an empty array
  const productList = data?.length > 0 ? data : [];

  // Filter products based on the search input
  const filteredProducts = productList.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return "Loading...";
  if (error) return "An error occurred: " + error.message;

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          name="search"
          autoFocus
          id="search"
          placeholder="Enter your search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <IoIosSearch />
      </div>

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
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }} role="alert">
                  No products match your search
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
