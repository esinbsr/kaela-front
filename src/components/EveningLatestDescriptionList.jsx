import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductCategories } from "../actions/categoryAction";

const EveningLatestDescriptionList = ({ categoryIndex }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categorie);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getProductCategories()).then(() => setLoading(false));
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  const category = categories && categories.length > categoryIndex
    ? categories[categoryIndex]
    : null;

  return (
    <div className="description">
      {category ? (
        <>
        <h1>{category.name}</h1>
          <h3>{category.page_title}</h3>
          <p>{category.page_description}</p>
        </>
      ) : (
        <p>Category description not found.</p>
      )}
    </div>
  );
};

export default EveningLatestDescriptionList;
