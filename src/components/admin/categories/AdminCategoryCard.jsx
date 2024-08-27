import { Link } from "react-router-dom";

const AdminCategoryCard = ({ category, onDelete }) => {
  return (
    <tr>
      <td>{category.name}</td>
      <td>{category.description}</td>
      <td>{category.page_title}</td>
      <td>{category.page_description}</td>
      <td>
        <Link to={`/adminUpdateCategory/${category.id}`} className='update-color' aria-label={`Update category ${category.name}`}>Update</Link>
      </td>
      <td>
        <button
          onClick={onDelete}
          className="delete-color"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default AdminCategoryCard;
