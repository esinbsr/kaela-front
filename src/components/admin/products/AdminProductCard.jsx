import { Link } from "react-router-dom";
import { API_URL } from "../../../actions/serverRequest";

const AdminProductCard = ({ product, onDelete }) => {
  return (
    <tr>
      <td>
        <img
          src={`${API_URL}assets/img/${product.path}`}
          alt={`Image of ${product.name}`}
          width="100"
        />
      </td>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.categorie}</td>
      <td>{product.section}</td>
      <td>
        <Link
          to={`/updateProduct/${product.id}`}
          aria-label={`Update ${product.name}`}
          className='update-color'
        >
          Update
        </Link>
      </td>
      <td>
        <button
          onClick={onDelete} 
          aria-label={`Delete ${product.name}`}
          className="delete-color"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default AdminProductCard;
