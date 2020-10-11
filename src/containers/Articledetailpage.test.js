import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createMount } from '@material-ui/core/test-utils';

import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import Articledetailpage from './Articledetailpage';
import * as loginActionCreators from '../store/actions/login';
import * as userActionCreators from '../store/actions/user';
import * as articleActionCreators from '../store/actions/article';
import * as commentActionCreators from '../store/actions/comment';

jest.mock('../components/Comment', () => {
  return jest.fn((props) => {
    return (
      <div className="spyComment">
        <div>comment</div>
      </div>
    );
  });
});

const stubInitStateLI = {
  logInInfo: { logged_in: true, id: 1 },
  selectedArticle: {
    id: 1,
    author_id: 1,
    title: 'TEST_TITLE',
    content: 'TEST_CONTENT',
  },
  users: [
    {
      id: 1,
      name: 'TEST1',
    },
    {
      id: 2,
      name: 'TEST2',
    },
  ],
  comments: [
    {
      id: 1,
      author_id: 1,
      article_id: 1,
      content: 'TEST_CONTENT',
    },
    {
      id: 2,
      author_id: 2,
      article_id: 1,
      content: 'TEST_CONTENT',
    },
  ],
};

const stubInitStateLIdiff = {
  logInInfo: { logged_in: true, id: 2 },
  selectedArticle: {
    id: 1,
    author_id: 1,
    title: 'TEST_TITLE',
    content: 'TEST_CONTENT',
  },
  users: [
    {
      id: 1,
      name: 'TEST1',
    },
    {
      id: 2,
      name: 'TEST2',
    },
  ],
  comments: [
    {
      id: 1,
      author_id: 1,
      article_id: 1,
      content: 'TEST_CONTENT',
    },
    {
      id: 2,
      author_id: 2,
      article_id: 1,
      content: 'TEST_CONTENT',
    },
  ],
};

const stubInitStateLO = { logInInfo: { logged_in: false } };

describe('<Articledetailpage />', () => {
  let articledetailpage;
  let mount;
  let mockedPush, mockedHistory, mockedMatch;
  let mockStore = getMockStore(stubInitStateLI);

  beforeEach(() => {
    mockedPush = jest.fn();
    mockedHistory = { push: mockedPush };
    mockedMatch = { params: { id: 1 } };

    const spyGetAllComments = jest
      .spyOn(commentActionCreators, 'getComments')
      .mockImplementation(() => {
        return (dispatch) => {};
      });

    const spyPutComment = jest
      .spyOn(commentActionCreators, 'putComment')
      .mockImplementation(() => {
        return (dispatch) => {};
      });

    const spyDeleteComment = jest
      .spyOn(commentActionCreators, 'deleteComment')
      .mockImplementation(() => {
        return (dispatch) => {};
      });

    const spyGetAllArticles = jest
      .spyOn(articleActionCreators, 'getArticles')
      .mockImplementation(() => {
        return (dispatch) => {};
      });

    articledetailpage = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              render={() => (
                <Articledetailpage
                  history={mockedHistory}
                  match={mockedMatch}
                />
              )}
            />
            <Route
              path="/login"
              exact
              render={() => <div className="login">login</div>}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });
  beforeAll(() => {
    mount = createMount();
  });

  afterAll(() => {
    mount.cleanUp();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Articledetailpage', () => {
    const component = mount(articledetailpage);
    const wrapper = component.find('.articledetailpage');
    expect(wrapper.length).toBe(3);
  });

  it('should have good logout-button', () => {
    const spyLogOut = jest
      .spyOn(loginActionCreators, 'logOut')
      .mockImplementation(() => {
        return (dispatch) => {};
      });
    const component = mount(articledetailpage);

    let wrapper = component.find('#logout-button');
    wrapper.simulate('click');
    expect(spyLogOut).toHaveBeenCalledTimes(1);
  });

  it('should have good confirm-create-comment-button', () => {
    const spyPostComment = jest
      .spyOn(commentActionCreators, 'postComment')
      .mockImplementation(() => {
        return (dispatch) => {};
      });
    const component = mount(articledetailpage);
    let wrapper = component.find('textarea');
    wrapper.simulate('change', { target: { value: 'TEST' } });
    wrapper = component.find('#confirm-create-comment-button');
    wrapper.simulate('click');
    expect(spyPostComment).toHaveBeenCalledTimes(1);
  });

  it('should disable confirm-create-comment-button when there is nothing on comment', () => {
    const spyPostComment = jest
      .spyOn(commentActionCreators, 'postComment')
      .mockImplementation(() => {
        return (dispatch) => {};
      });
    mockStore = getMockStore(stubInitStateLIdiff);
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Articledetailpage} />
            <Route
              path="/login"
              exact
              render={() => <div className="login">login</div>}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    let wrapper = component.find('#confirm-create-comment-button');
    expect(spyPostComment).toHaveBeenCalledTimes(0);
  });

  it('should not show delete-article-button when user is not owner', () => {
    mockStore = getMockStore(stubInitStateLIdiff);
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Articledetailpage} />
            <Route
              path="/login"
              exact
              render={() => <div className="login">login</div>}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    let wrapper = component.find('#delete-article-button');

    expect(wrapper.length).toBe(0);
  });

  it('should not show edit-article-button when user is not owner', () => {
    mockStore = getMockStore(stubInitStateLIdiff);
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Articledetailpage} />
            <Route
              path="/login"
              exact
              render={() => <div className="login">login</div>}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    let wrapper = component.find('#edit-article-button');

    expect(wrapper.length).toBe(0);
  });

  it('should have good edit-article-button', () => {
    mockStore = getMockStore(stubInitStateLI);
    mockedPush = jest.fn();
    mockedHistory = { push: mockedPush };
    mockedMatch = { params: { id: 1 } };

    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <Articledetailpage
                  history={mockedHistory}
                  match={mockedMatch}
                />
              )}
            />
            <Route
              path="/login"
              exact
              render={() => <div className="login">login</div>}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    let wrapper = component.find('#edit-article-button');
    wrapper.simulate('click');
    expect(mockedPush).toHaveBeenCalledTimes(1);
  });

  it('should have good delete-article-button', () => {
    const spyDeleteArticle = jest
      .spyOn(articleActionCreators, 'deleteArticle')
      .mockImplementation(() => {
        return (dispatch) => {};
      });
    mockStore = getMockStore(stubInitStateLI);
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Articledetailpage} />
            <Route
              path="/login"
              exact
              render={() => <div className="login">login</div>}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    let wrapper = component.find('#delete-article-button');
    wrapper.simulate('click');
    expect(spyDeleteArticle).toHaveBeenCalledTimes(1);
  });

  it('should have good back-detail-article-button', () => {
    const component = mount(articledetailpage);
    let wrapper = component.find('#back-detail-article-button');
    wrapper.simulate('click');
    expect(mockedPush).toHaveBeenCalledTimes(1);
  });

  it('should have good back-detail-article-button when user is not the owner', () => {
    mockStore = getMockStore(stubInitStateLIdiff);
    mockedPush = jest.fn();
    mockedHistory = { push: mockedPush };
    mockedMatch = { params: { id: 1 } };
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <Articledetailpage
                  history={mockedHistory}
                  match={mockedMatch}
                />
              )}
            />
            <Route
              path="/login"
              exact
              render={() => <div className="login">login</div>}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    let wrapper = component.find('#back-detail-article-button');
    wrapper.simulate('click');
    expect(mockedPush).toHaveBeenCalledTimes(1);
  });

  it('should not render Articledetailpage if user not logged in', () => {
    mockStore = getMockStore(stubInitStateLO);
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Articledetailpage} />
            <Route
              path="/login"
              exact
              render={() => <div className="login">login</div>}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const wrapper = component.find('.login');
    expect(wrapper.length).toBe(1);
  });
});
