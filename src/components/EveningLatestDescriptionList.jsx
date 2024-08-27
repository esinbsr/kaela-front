import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductCategories } from "../actions/categoryAction";
import { isEmpty } from './utils/isEmpty'; // Utility function to check if an array is empty

const EveningLatestDescriptionList = ({ categorySlug }) => {
  const dispatch = useDispatch(); // Hook to dispatch Redux actions
  const categories = useSelector((state) => state.category.category); // Selector to access categories from the Redux store

  useEffect(() => {
    // Dispatch action to get categories and update loading state
    dispatch(getProductCategories());
  }, [dispatch]);

// Select the category based on the slug passed in prop
  const category = !isEmpty(categories)
    ? categories.find(cat => cat.slug === categorySlug)
    : null;

  return (
    <>
      {category ? (
        <>
        {/* Display the name of the category */}
        <h1>{category.name}</h1>
        <div className="evening-latest__description">
          {/* Display the page title and description */}
          <h2>{category.page_title}</h2>
          <p>{category.page_description}</p>
        </div>
        </>
      ) : (
        // Message displayed if no category is found
        <p role="alert" aria-live="assertive">Category description not found.</p>
      )}
    </>
  );
};

export default EveningLatestDescriptionList;
