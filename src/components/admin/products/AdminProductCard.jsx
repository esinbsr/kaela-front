
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../../actions/productAction';

const AdminProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      dispatch(deleteProduct(product.id));
    }
  };

  return (
    <tr>
      <td>
        <img
          src={`http://localhost:8888/travail-perso/kaela-couture/assets/img/${product.path}`}
          alt={product.name}
          width="100"
        />
      </td>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.categorie}</td>
      <td>
        <Link to={`/adminModifyProduct/${product.id}`}>Modify</Link>
      </td>
      <td>
        <Link to="#" onClick={handleDeleteClick}>Delete</Link>
      </td>
    </tr>
  );
};

export default AdminProductCard;
