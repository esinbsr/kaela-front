import { useEffect, useState } from "react";
import { getProductCategories } from "../actions/productAction";
import { useDispatch, useSelector } from "react-redux";

const EveningLatestDescriptionList = ({ categoryIndex }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.product.categories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getProductCategories()).then(() => setLoading(false));
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  // Déterminer le nom de la catégorie en fonction de l'index
  const categoryName = categories && categories.length > categoryIndex
    ? categories[categoryIndex].name
    : "No Category";

  return (
    <div className="description">
      {categories && categories.length > 0 ? (
        <>
          <h1>{categoryName}</h1>
          {categories.map((category) => (
            <div key={category.id} className="description-list">
              <h3>{category.page_title}</h3>
              <p>{category.page_description}</p>
            </div>
          ))}
        </>
      ) : (
        <p>Category description not found.</p>
      )}
    </div>
  );
};

export default EveningLatestDescriptionList;
