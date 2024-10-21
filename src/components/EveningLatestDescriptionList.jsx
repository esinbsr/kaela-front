import { useQuery } from "react-query";
import { getProductCategories } from "../api/categoryApi";

const EveningLatestDescriptionList = ({ categorySlug }) => {

  // Fetch categories from the server 
  const { isLoading, error, data: categories } = useQuery({
    queryKey: ['categories'],  // The unique query key to identify this query
    queryFn: getProductCategories,  // Function responsible for fetching categories
  });

// Select the category based on the slug passed in prop
  const category = categories
    ? categories.find(cat => cat.slug === categorySlug)
    : null;

    // Return loading or error messages if necessary
    if (isLoading) return <p role="status"> Loading...</p>;
    if (error) return <p role="alert"> An error occurred : {error.message}</p>;

  return (
    <>
      {category ? (
        <>
        <h1>{category.name}</h1>
        <section className="evening-latest__description">
          <h3>{category.page_title}</h3>
          <p>{category.page_description}</p>
        </section>
        </>
      ) : (
        // Message displayed if no category is found
        <p role="alert" aria-live="assertive">Category description not found.</p>
      )}
    </>
  );
};

export default EveningLatestDescriptionList;
