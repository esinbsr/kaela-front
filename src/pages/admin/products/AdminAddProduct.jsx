import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, getProduct } from '../../../actions/productAction';
import { getProductCategories } from '../../../actions/categoryAction';
import { getSection } from '../../../actions/sectionAction';

const AdminAddProduct = () => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productSection, setProductSection] = useState('');
    const [productImage, setProductImage] = useState(null);

    const fileInputRef = useRef(null);

    const dispatch = useDispatch();
    
    const categories = useSelector((state) => state.category.category);
    const section = useSelector((state) => state.section.section);
    const responseMessage = useSelector((state) => state.product.message);
    const error = useSelector((state) => state.product.error);

    useEffect(() => {
        dispatch(getProductCategories());
        dispatch(getSection());
    }, [dispatch]);

    useEffect(() => {
        if (categories.length > 0) {
            setProductCategory(categories[0].id);
        }
        if(section.length > 0) {
            setProductSection(section[0].id);
        }
    }, [categories, section]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productDescription', productDescription);
        formData.append('productCategory', productCategory);
        formData.append('productSection', productSection);
        formData.append('productImage', productImage);

        dispatch(addProduct(formData)).then(() => {
            // Rafraîchir les catégories et produits après l'ajout du produit
            dispatch(getProductCategories());
            dispatch(getProduct());
        });
    };

    useEffect(() => {
        if (responseMessage && !error) {
            setProductName("");
            setProductDescription("");
            setProductCategory(categories.length > 0 ? categories[0].id : ""); 
            setProductSection(section.length > 0 ? section[0].id : ""); 
            setProductImage(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    }, [responseMessage, error, categories, section]);

    return (
        <div>
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

                <label htmlFor="productSection">Section:</label>
                <select
                    id="productSection"
                    name="productSection"
                    value={productSection}
                    onChange={(e) => setProductSection(e.target.value)}
                >
                    {section.map((section) => (
                        <option key={section.id} value={section.id}>
                            {section.name}
                        </option>
                    ))}
                </select>

                <label htmlFor="productImage">Image:</label>
                <input
                    type="file"
                    id="productImage"
                    name="productImage"
                    ref={fileInputRef}
                    onChange={(e) => setProductImage(e.target.files[0])}
                />

                <button type="submit">Create product</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default AdminAddProduct;
