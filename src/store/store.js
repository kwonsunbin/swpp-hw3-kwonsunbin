import { createStore, combineReducers, compose } from 'redux';
import loginReducer from './reducers/login';
import articleReducer from './reducers/article';
import commentReducer from './reducers/comment';
import userReducer from './reducers/user';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const middlewares = [thunk, routerMiddleware(history)];

const rootReducer = combineReducers({
  /* in this case, we have only single reducer,
   * but we can merge reducers by using combineReducers for bigger project */
  login: loginReducer,
  article: articleReducer,
  comment: commentReducer,
  user: userReducer,
  router: connectRouter(history),
});

export const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk, routerMiddleware(history)))
);
