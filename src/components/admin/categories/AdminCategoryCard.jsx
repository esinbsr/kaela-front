
import { Link } from 'react-router-dom';
import AdminDeleteCategory from './AdminDeleteCategory';

const AdminCategoryCard = ({category, onDelete}) => {
    return (
            <tr>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>{category.page_title}</td>
                <td>{category.page_description}</td>
                <td>
                    <Link to={`/adminUpdateCategory/${category.id}`}>Update</Link>
                </td>
                <td>
                    <AdminDeleteCategory categoryId={category.id} onDelete={onDelete} />
                </td>
            </tr>
        
    );
};

export default AdminCategoryCard;