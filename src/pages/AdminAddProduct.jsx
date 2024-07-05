import { useState } from "react";

const AdminAddProduct = () => {

    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
    }


    return (
        <div>
            <h2>Add a product</h2>
            <form onSubmit={handleSubmit}>

                <label htmlFor="productName">Name of product</label>
                <input id="productName" type="text" name="productName" value={productName} onChange={(e) => setProductName(e.target.value)}/>

                <label htmlFor="productDescription">Description</label>
                <textarea id="productDescription" name="productDescription" value={productDescription} onChange={(e) => setProductDescription(e.target.value)}></textarea>

                <label htmlFor="productCategory">Categorie</label>
                <select name="category" id="productCategory">
                    <option value="test">test</option>
                </select>

                <input type="file" id="productImage"/>

            </form>
            

            
        </div>
    );
};

export default AdminAddProduct;