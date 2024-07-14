// components/AdminAddProduct.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, getProductCategories } from '../../../actions/productAction';
import Navigation from '../../../components/Navigation';

const AdminAddProduct = () => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productImage, setProductImage] = useState(null);

    const dispatch = useDispatch();
    const categories = useSelector((state) => state.product.categories);
    const responseMessage = useSelector((state) => state.product.message);
    const errorMessage = useSelector((state) => state.product.error);

    useEffect(() => {
        dispatch(getProductCategories());
    }, [dispatch]);

    useEffect(() => {
        if (categories.length > 0) {
            setProductCategory(categories[0].id);
        }
    }, [categories]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productDescription', productDescription);
        formData.append('productCategory', productCategory);
        formData.append('productImage', productImage);

        dispatch(addProduct(formData));
    };

    return (
        <div>
            <Navigation />
            <h2>Add a product</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="productName">Name of product:</label>
                <input
                    id="productName"
                    type="text"
                    name="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />

                <label htmlFor="productDescription">Description:</label>
                <textarea
                    id="productDescription"
                    name="productDescription"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                ></textarea>

                <label htmlFor="productCategory">Category:</label>
                <select
                    id="productCategory"
                    name="productCategory"
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                >
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <label htmlFor="productImage">Image:</label>
                <input
                    type="file"
                    id="productImage"
                    name="productImage"
                    onChange={(e) => setProductImage(e.target.files[0])}
                />

                <button type="submit">Create product</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default AdminAddProduct;
