import React from 'react';
import { Provider } from 'react-redux';
import { createMount } from '@material-ui/core/test-utils';

import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import Articlelistpage from './Articlelistpage';
import * as loginActionCreators from '../store/actions/login';
import * as userActionCreators from '../store/actions/user';
import * as articleActionCreators from '../store/actions/article';

jest.mock('../components/Article', () => {
  return jest.fn((props) => {
    return (
      <div className="spyArticle">
        <div>{props.article.title}</div>
      </div>
    );
  });
});

const stubInitialStateLI = {
  logInInfo: {
    id: 1,
    logged_in: true,
  },
  articles: [
    {
      id: 0,
      author_id: 1,
      title: 'TEST_TITLE_2',
      content: 'TEST_CONTENT_2',
    },
    {
      id: 1,
      author_id: 1,
      title: 'TEST_TITLE_2',
      content: 'TEST_CONTENT_2',
    },
    {
      id: 2,
      author_id: 1,
      title: 'TEST_TITLE_3',
      content: 'TEST_CONTENT_3',
    },
  ],
  users: [
    {
      id: 1,
      email: 'TEST_EMAIL_1',
      password: 'TEST_PW_1',
      name: 'TEST_NAME_1',
      logged_in: true,
    },
    {
      id: 2,
      email: 'TEST_EMAIL_2',
      password: 'TEST_PW_2',
      name: 'TEST_NAME_2',
      logged_in: false,
    },
  ],
};

const stubInitialStateLO = {
  logInInfo: {
    id: 1,
    logged_in: false,
  },
};

describe('<Articlelistpage />', () => {
  let articlelistpage;
  let mount;
  let mockedPush, mockedHistory;
  let mockStore = getMockStore(stubInitialStateLI);

  beforeAll(() => {
    mount = createMount();
  });

  afterAll(() => {
    mount.cleanUp();
  });

  beforeEach(() => {
    mockedPush = jest.fn();
    mockedHistory = { push: mockedPush };
    articlelistpage = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <Articlelistpage history={mockedHistory} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    afterEach(() => {
      jest.clearAllMocks();
    });

    const spyGetAllArticles = jest
      .spyOn(articleActionCreators, 'getArticles')
      .mockImplementation(() => {
        return (dispatch) => {};
      });

    const spyGetAllUsers = jest
      .spyOn(userActionCreators, 'getUsers')
      .mockImplementation(() => {
        return (dispatch) => {};
      });
  });

  it('should render Articleeditpage', () => {
    const component = mount(articlelistpage);
    const wrapper = component.find('.articlelistpage');
    expect(wrapper.length).toBe(3);
  });

  it('should have good create-article-button', () => {
    const spyPush = jest.spyOn(history, 'push').mockImplementation(() => {});

    const stubInitStateTemp = {
      logInInfo: {
        id: 1,
        logged_in: true,
      },
    };
    const mockStoreTemp = getMockStore(stubInitStateTemp);
    const component = mount(
      <Provider store={mockStoreTemp}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <Articlelistpage />} />
            <Route
              path="/login"
              exact
              render={() => <div className="login">loginpage</div>}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    let wrapper = component.find('#create-article-button');
    wrapper.simulate('click');
    expect(spyPush).toHaveBeenCalledTimes(1);
  });

  it('should have good log-out button', () => {
    const spyLogOut = jest
      .spyOn(loginActionCreators, 'logOut')
      .mockImplementation(() => {
        return (dispatch) => {};
      });
    const component = mount(articlelistpage);
    const wrapper = component.find('#logout-button');
    wrapper.simulate('click');
    expect(spyLogOut).toHaveBeenCalledTimes(1);
  });

  it('should not render Articleeditpage when user not logged in', () => {
    const spyPush = jest.spyOn(history, 'push').mockImplementation(() => {});

    mockStore = getMockStore(stubInitialStateLO);
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <Articlelistpage />} />
            <Route
              path="/login"
              exact
              render={() => <div className="login">loginpage</div>}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const wrapper = component.find('.login');
    expect(wrapper.length).toBe(1);
  });
});
