import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../../actions/productAction';

const AdminDeleteProduct = ({ productId, onDelete }) => {
  const dispatch = useDispatch();

  const handleDeleteClick = async (e) => {
    e.preventDefault();

    const confirmDelete = window.confirm("Are you sure you want to delete this product?");

    if (confirmDelete) {
      dispatch(deleteProduct(productId))
        .then(() => {
          onDelete(productId);
        })
        .catch(error => {
          console.error("Error deleting product:", error);
          alert("Error deleting product");
        });
    }
  };

  return (
    <Link to="#" onClick={handleDeleteClick}>Delete</Link>
  );
};

export default AdminDeleteProduct;
