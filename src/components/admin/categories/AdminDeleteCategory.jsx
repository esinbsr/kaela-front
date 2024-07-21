import React from 'react';
import { Link } from 'react-router-dom';
import { deleteCategory } from '../../../actions/categoryAction';
import { useDispatch } from 'react-redux';

const AdminDeleteCategory = ({categoryId}) => {
    const dispatch = useDispatch();

    const handleDeleteClick = async (e) => {
        e.preventDefault();

        const confirmDelete = window.confirm('Are you sure you want to delete this category ?');

        if (confirmDelete) {
            dispatch(deleteCategory(categoryId));
        }
    };

    return (
        <Link onClick={handleDeleteClick}>Delete</Link>
    );
};

export default AdminDeleteCategory;