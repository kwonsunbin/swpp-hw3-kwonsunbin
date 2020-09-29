import * as actionTypes from '../actions/actionTypes';

const initialState = {
  articles: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_ARTICLES:
      return { ...state, articles: action.articles };
    case actionTypes.GET_ARTICLE:
      return { ...state, selectedArticle: action.selectedArticle };
    case actionTypes.ADD_ARTICLE:
      const newArticle = {
        id: action.id,
        author_id: action.author_id,
        title: action.title,
        content: action.content,
      };
      return { ...state, articles: [...state.articles, newArticle] };
    case actionTypes.UPDATE_ARTICLE:
      const modified = state.articles.map((article) => {
        if (article.id === action.id) {
          return {
            id: action.id,
            author_id: action.author_id,
            title: action.title,
            content: action.content,
          };
        } else {
          return { ...article };
        }
      });
      return { ...state, articles: modified };
    case actionTypes.DELETE_ARTICLE:
      const deleted = state.articles.filter(
        (article) => article.id !== action.targetID
      );
      return { ...state, articles: deleted };
    default:
      return state;
  }
};

export default reducer;
