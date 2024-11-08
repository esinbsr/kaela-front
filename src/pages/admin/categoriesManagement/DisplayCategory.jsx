import { useQuery } from "react-query";
import { getProductCategories } from "../../../api/categoryApi";
import CategoryCard from "../../../components/admin/CategoryCard";

const DisplayCategory = () => {
  // Fetch categories from the server
  const { isLoading, error, data } = useQuery({
    queryKey: ["categories"], // The unique query key to identify this query
    queryFn: getProductCategories, // Function responsible for fetching categories
    staleTime: 1000 * 60 * 60, // Time in milliseconds (1 hour) during which the data is considered fresh and won't be re-fetched
    cacheTime: 1000 * 60 * 60 * 24, // Time in milliseconds (24 hours) that the data will remain in cache even if it's stale
  });

  // If there is data and it contains categories, use it, otherwise return an empty array
  const categoryList = data?.length > 0 ? data : [];

  if (isLoading) return "Loading...";
  if (error) return "An error occurred: " + error.message;

  return (
    <>
      <h2>Category List</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Page Title</th>
              <th scope="col">Page Description</th>
              <th scope="col" className="action-header" colSpan={2}>
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {/* If the list has items, render each as a row */}
            {categoryList.length > 0 ? (
              categoryList.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))
            ) : (
              // If no categories are available, display a message
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }} role="alert">
                  There are no categories.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DisplayCategory;
