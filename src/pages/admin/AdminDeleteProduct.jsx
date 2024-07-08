import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminDeleteProduct = ({ productId, onDelete }) => {

  const handleDeleteClick = async (e) => {
    e.preventDefault();

    const confirmDelete = window.confirm("Are you sure you want to delete this product?");

    if (confirmDelete) {

      try {
        const response = await axios.post('http://localhost/travail-perso/kaela-couture/deleteProduct', {
          productId
        });
        if (response.data.success) {
          onDelete(productId);
        } else {
          alert("Failed to delete product");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Error deleting product");
      } 
    }
  };

  return (
    <Link to="#" onClick={handleDeleteClick} > Delete </Link>
  );
};

export default AdminDeleteProduct;
