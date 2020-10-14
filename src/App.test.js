import React from 'react';
import App from './App';
import { Provider } from 'react-redux';

import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import { createMount } from '@material-ui/core/test-utils';
import { getMockStore } from './test-utils/mocks';
import { history } from './store/store';

jest.mock('./containers/Loginpage', () => {
  return jest.fn(() => {
    return <div className="spyLoginpage">Loginpage</div>;
  });
});

jest.mock('./containers/Articlelistpage', () => {
  return jest.fn(() => {
    return <div className="spyArticlelistpage">Articlelistpage</div>;
  });
});

jest.mock('./containers/Articledetailpage', () => {
  return jest.fn(() => {
    return <div className="spyArticledetailpage">Articledetailpage</div>;
  });
});

jest.mock('./containers/Articlecreatepage', () => {
  return jest.fn(() => {
    return <div className="spyArticlecreatepage">/Articlecreatepage</div>;
  });
});

jest.mock('./containers/Articleeditpage', () => {
  return jest.fn(() => {
    return <div className="spyArticleeditpage">/Articleeditpage</div>;
  });
});

const stubInitialState = {};

let mockStore = getMockStore(stubInitialState);

describe('<App />', () => {
  let mount;
  let app;

  beforeAll(() => {
    mount = createMount();
  });

  afterAll(() => {
    mount.cleanUp();
  });

  it('should renders to each page correctly ', () => {
    const routes = [
      { component: '.spyLoginpage', path: '/' },
      { component: '.spyArticlecreatepage', path: '/articles/create' },
      { component: '.spyArticledetailpage', path: '/articles/0' },
      { component: '.spyArticleeditpage', path: '/articles/0/edit' },
      { component: '.spyArticlelistpage', path: '/articles' },
    ];
    routes.map((route) => {
      history.push(route.path);
      const component = mount(
        <Provider store={mockStore}>
          <App history={history} />
        </Provider>
      );
      const wrapper = component.find(route.component);
      expect(wrapper.length).toEqual(1);
    });
  });
});
