import { useEffect, useState } from 'react';
import { getProductCategories } from '../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';

const EveningDressesDescriptionList = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.product.categories);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getProductCategories()).then(() => setLoading(false));
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            {categories && categories.length > 0 ? (
                categories.slice(1).map((category) => (
                    <div key={category.id}>
                        <h3>{category.page_title}</h3>
                        <p>{category.page_description}</p>
                    </div>
                ))
            ) : (
                <p>Category description not found.</p>
            )}
        </div>
    );
};

export default EveningDressesDescriptionList;
