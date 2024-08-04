import { GET_COMMENT_SUCCESS, GET_COMMENT_ERROR, ADD_COMMENT_ERROR, ADD_COMMENT_SUCCESS, GET_COMMENT_BY_ID_SUCCESS, UPDATE_COMMENT_SUCCESS, GET_COMMENT_BY_ID_ERROR, UPDATE_COMMENT_ERROR } from "../actions/commentAction";

const initialState = {
  comments: [],
  commentById: null,
  message: "",
  error: "",
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENT_SUCCESS:
      return {
        ...state,
        comments: action.payload.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        ), // Trier les commentaires après récupération
        message: action.message,
        error: "",
      };
    case GET_COMMENT_BY_ID_SUCCESS:
      return {
        ...state,
        commentById: action.payload,
        message: action.message,
        error: "",
      };

    case ADD_COMMENT_SUCCESS:
      const updatedComment = [action.payload, ...state.comments].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      return {
        ...state,
        comments: updatedComment,
        message: action.message,
        error: "",
      };

    case UPDATE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.id === action.payload.id ? action.payload : comment
        ),
        message: action.message,
        error: "",
      };

    case GET_COMMENT_ERROR:
    case GET_COMMENT_BY_ID_ERROR:
    case ADD_COMMENT_ERROR:
    case UPDATE_COMMENT_ERROR:
      return {
        ...state,
        message: "",
        error: action.payload,
      };
    default:
      return state;
  }
};

export default commentReducer;
