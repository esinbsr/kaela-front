import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";


const AdminUpdateCategory = () => {
    const { categoryId } = useParams();
    const dispatch = useDispatch();
    // const categoryById = useSelector((state) => )
    return (
        <div>
            
        </div>
    );
};

export default AdminUpdateCategory;