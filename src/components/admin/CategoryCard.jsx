import { Link } from "react-router-dom";
import DeleteCategory from "../../pages/admin/categoriesManagement/DeleteCategory";

const CategoryCard = ({ category }) => {
  return (
    <tr>
      <td>{category.name}</td>
      <td>{category.description}</td>
      <td>{category.page_title}</td>
      <td>{category.page_description}</td>
      <td>
        <Link
          to={`/adminUpdateCategory/${category.id}`}
          className="update-color"
          aria-label={`Mettre à jour la catégorie ${category.name}`}
        >
          Modifier
        </Link>
      </td>
      <td>
        <DeleteCategory categoryId={category.id} />
      </td>
    </tr>
  );
};

export default CategoryCard;