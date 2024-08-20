import { useDispatch} from "react-redux";
import { deleteProduct} from "../../../actions/productAction";
import { API_URL } from "../../../actions/serverRequest";
import { Link } from "react-router-dom";

const AdminProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete the product: ${product.name}?`)) {
      dispatch(deleteProduct(product.id));
    }
  };

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
            to={`/adminUpdateProduct/${product.id}`}
            aria-label={`Update ${product.name}`}
          >
            Update
          </Link>
        </td>


        <td>
          <Link
            to="#"
            onClick={handleDelete}
            aria-label={`Delete ${product.name}`}
          >
            Delete
          </Link>
        </td>
        
      </tr>
  );
};

export default AdminProductCard;
