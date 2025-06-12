import { useQuery } from "react-query";
import { getComment } from "../../../api/commentApi";

const CommentsManager = () => {
    const {data} = useQuery({
        queryKey: ['comments'],
        queryFn: getComment
    })

    console.log(data);
    
    return (
        <div>

            
        </div>
    );
};

export default CommentsManager;