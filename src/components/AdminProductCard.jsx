import AdminDeleteProduct from '../pages/admin/AdminDeleteProduct';
import { Link } from 'react-router-dom';

const AdminProductCard = ({ product, onDelete }) => {

  return (
    <tr>
      <td><img src={`http://localhost/travail-perso/kaela-couture/assets/img/${product.path}?t=${new Date().getTime()}`} alt={product.name} width="90" /></td>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.categorie}</td>
      <td>
        <Link to={`/adminModifyProduct/${product.id}`}>Modify</Link>
        <AdminDeleteProduct productId={product.id} onDelete={onDelete} />
      </td>
    </tr>
  );
};

export default AdminProductCard;