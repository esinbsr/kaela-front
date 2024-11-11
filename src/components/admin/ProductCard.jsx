import { Link } from "react-router-dom";
import { API_URL } from "../../api/serverRequest";
import DeleteProduct from "../../pages/admin/productsManagement/DeleteProduct";

// Component to display a product's information in a table row
const ProductCard = ({ product }) => {
  return (
    <tr>
      <td data-label="Image">
        <img
          src={`${API_URL}assets/img/${product.path}`}
          alt={`Image of ${product.name}`}
          width="100"
          loading="lazy"
        />
      </td>
      <td data-label="Name">{product.name}</td>
      <td data-label="Description">{product.description}</td>
      <td data-label="Category">{product.categorie}</td>
      <td data-label="Section"> {product.section}</td>
      <td data-label="Action">
        <div className="button-group">
          <Link
            to={`/updateProduct/${product.id}`}
            aria-label={`Update ${product.name}`}
            className="blue-link"
          >
            Update
          </Link>
          <DeleteProduct productId={product.id} />
        </div>
      </td>
    </tr>
  );
};

export default ProductCard;
