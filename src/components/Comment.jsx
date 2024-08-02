
import AddComment from './AddComment';
import CommentDisplay from './CommentDisplay';

const Comment = () => {
    return (
        <div className='comments'>
            <AddComment/>
            <CommentDisplay/>
        </div>
    );
};

export default Comment;