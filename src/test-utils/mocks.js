import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import { history, middlewares } from '../store/store';

const getMockLoginReducer = jest.fn(
  (initialState) => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  }
);

const getMockUserReducer = jest.fn(
  (initialState) => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  }
);

const getMockArticleReducer = jest.fn(
  (initialState) => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  }
);

const getMockCommentReducer = jest.fn(
  (initialState) => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  }
);

export const getMockStore = (initialState) => {
  const mockLoginReducer = getMockLoginReducer(initialState);
  const mockUserReducer = getMockUserReducer(initialState);
  const mockCommentReducer = getMockCommentReducer(initialState);
  const mockArticleReducer = getMockArticleReducer(initialState);
  const rootReducer = combineReducers({
    login: mockLoginReducer,
    article: mockArticleReducer,
    comment: mockCommentReducer,
    user: mockUserReducer,
    router: connectRouter(history),
  });
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const mockStore = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  return mockStore;
};
