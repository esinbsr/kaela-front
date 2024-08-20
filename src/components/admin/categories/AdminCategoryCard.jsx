import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteCategory } from "../../../actions/categoryAction";

const AdminCategoryCard = ({ category }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(category.id));
    }
  };

  return (
    <tr>
      <td>{category.name}</td>
      <td>{category.description}</td>
      <td>{category.page_title}</td>
      <td>{category.page_description}</td>
      <td>
        <Link to={`/adminUpdateCategory/${category.id}`} className='update-color'>Update</Link>
      </td>
      <td>
        <Link
          to="#"
          onClick={handleDelete}
          className="delete-color"
        >
          Delete
        </Link>
      </td>
    </tr>
  );
};

export default AdminCategoryCard;
