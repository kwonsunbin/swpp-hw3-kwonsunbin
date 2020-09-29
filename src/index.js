import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import loginReducer from './store/reducers/login';
import articleReducer from './store/reducers/article';
import commentReducer from './store/reducers/comment';
import userReducer from './store/reducers/user';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  /* in this case, we have only single reducer,
   * but we can merge reducers by using combineReducers for bigger project */
  login: loginReducer,
  article: articleReducer,
  comment: commentReducer,
  user: userReducer,
  router: connectRouter(history),
});

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk, routerMiddleware(history)))
);

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
