import * as actionTypes from '../actions/actionTypes';

const initialState = {
  comments: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_COMMENTS:
      return { ...state, comments: action.comments };
    case actionTypes.DELETE_COMMENT:
      const deleted = state.comments.filter(
        (comment) => comment.id !== action.targetID
      );
      return { ...state, comments: deleted };
    case actionTypes.ADD_COMMENT:
      const newComment = {
        id: action.id,
        author_id: action.author_id,
        article_id: action.article_id,
        content: action.content,
      };
      return { ...state, comments: [...state.comments, newComment] };
    case actionTypes.UPDATE_COMMENT:
      const modified = state.comments.map((comment) => {
        if (comment.id === action.id) {
          return {
            id: action.id,
            author_id: action.author_id,
            article_id: action.article_id,
            content: action.content,
          };
        } else {
          return { ...comment };
        }
      });
      return { ...state, comments: modified };
    default:
      return state;
  }
};

export default reducer;
