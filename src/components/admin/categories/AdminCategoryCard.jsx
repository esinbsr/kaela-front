
import { Link } from 'react-router-dom';

const AdminCategoryCard = ({category}) => {
    return (
            <tr>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>{category.page_title}</td>
                <td>{category.page_description}</td>
                <td>
                    <Link to={`/adminUpdateCategory/${category.id}`}>Modify</Link>
                </td>
                <td>
                    <Link>Delete</Link>
                </td>
            </tr>
        
    );
};

export default AdminCategoryCard;