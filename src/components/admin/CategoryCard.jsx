import { Link } from "react-router-dom";
import DeleteCategory from "../../pages/admin/categoriesManagement/DeleteCategory";

const CategoryCard = ({ category }) => {
  return (
    <tr>
      <td data-label="Name">{category.name}</td>
      <td data-label="Description">{category.description}</td>
      <td data-label="Page title">{category.page_title}</td>
      <td data-label="Page description">{category.page_description}</td>
      <td data-label="Action">
      <div className="button-group">
        <Link to={`/updateCategory/${category.id}`} className="blue-link" aria-label={`Update category ${category.name}`}
        > Modifier
        </Link>
        <DeleteCategory categoryId={category.id}/>
        </div>
      </td>
    </tr>
  );
};

export default CategoryCard;