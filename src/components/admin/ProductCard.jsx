import { Link } from "react-router-dom";
import { API_URL } from "../../api/serverRequest";
import DeleteProduct from "../../pages/admin/productsManagement/DeleteProduct";

const ProductCard = ({ product}) => {
  return (
    <tr>
      <td>
        <img
          src={`${API_URL}assets/img/${product.path}`}
          alt={`Image of ${product.name}`}
          width="100"
          loading="lazy" 
        />
      </td>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.categorie}</td>
      <td>{product.section}</td>
      <td>
        <Link
          to={`/updateProduct/${product.id}`}
          aria-label={`Update ${product.name}`}
          className='update-color'
        >
          Update
        </Link>
      </td>
      <td>
      <DeleteProduct productId={product.id} />
      </td>
    </tr>
  );
};

export default ProductCard;
