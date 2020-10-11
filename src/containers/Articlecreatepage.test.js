import React from 'react';
import Articlecreatepage from './Articlecreatepage';
import { createMount } from '@material-ui/core/test-utils';
import { getMockStore } from '../test-utils/mocks';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import { history } from '../store/store';
import * as loginActionCreators from '../store/actions/login';
import * as userActionCreators from '../store/actions/user';
import * as articleActionCreators from '../store/actions/article';

const stubInitStateLI = {
  logInInfo: { logged_in: true },
  articles: [
    {
      id: 0,
      author_id: 1,
      title: '10 React JS Articles Every Web Developer Should Read',
      content:
        'Hello Guys, React or React JS is a JavaScript front-end library from Facebook which lets you create HTML based GUI. It makes the task easier by providing a component-based architecture which was only available to languages like Java and C# before.',
    },
    {
      id: 11,
      author_id: 1,
      title: 'React: A JavaScript library for building user interfaces',
      content:
        'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.',
    },
    {
      id: 12,
      author_id: 1,
      title: 'Building the New facebook.com with React, GraphQL and Relay',
      content:
        "Open source projects like React, GraphQL and Relay are powering more and more Facebook services. In this session, we'll discuss how we use the latest features of these technologies, like React Suspense, to help deliver a high quality, modern web experience at Facebook.",
    },
  ],
};
const stubInitStateLO = { logInInfo: { logged_in: false } };

let mockStore = getMockStore(stubInitStateLI);

describe('<Articlecreatepage/>', () => {
  let mount;
  let articlecreatepage;
  let mockedPush, mockedHistory;

  beforeAll(() => {
    mount = createMount();
  });

  afterAll(() => {
    mount.cleanUp();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    mockedPush = jest.fn();
    mockedHistory = { push: mockedPush };
    articlecreatepage = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <Articlecreatepage history={mockedHistory} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  it('should render withour any error', () => {
    const component = mount(articlecreatepage);
    const wrapper = component.find('.articlecreatepage');
    expect(wrapper.length).toBe(3);
  });

  it('should have logout-button when user logged in', () => {
    const component = mount(articlecreatepage);
    const wrapper = component.find('#logout-button');
    expect(wrapper.length).toBe(1);
  });

  it('should disable confirm-create-article-button when there is nothing', () => {
    const spyConfirm = jest
      .spyOn(articleActionCreators, 'postArticle')
      .mockImplementation(() => {
        return (dispatch) => {};
      });
    const component = mount(articlecreatepage);
    const wrapper = component.find('#confirm-create-article-button');
    wrapper.simulate('click');
    expect(spyConfirm).toHaveBeenCalledTimes(0);
  });

  it('should have good confirm-create-article-button', () => {
    const spyConfirm = jest
      .spyOn(articleActionCreators, 'postArticle')
      .mockImplementation(() => {
        return (dispatch) => {};
      });
    const component = mount(articlecreatepage);
    let wrapper = component.find('input');
    wrapper.simulate('change', { target: { value: 'TEST' } });
    wrapper = component.find('textarea');
    wrapper.simulate('change', { target: { value: 'TEST' } });

    wrapper = component.find('#confirm-create-article-button');
    wrapper.simulate('click');
    expect(spyConfirm).toHaveBeenCalledTimes(1);
  });

  it('should have good preview-tab-button', () => {
    const component = mount(articlecreatepage);
    let wrapper = component.find('#preview-tab-button');
    wrapper.simulate('click');
    wrapper = component.find('.preview_mode');
    expect(wrapper.length).toBe(1);
  });

  it('should have good write-tab-button', () => {
    const component = mount(articlecreatepage);
    let wrapper = component.find('#preview-tab-button');
    wrapper.simulate('click');
    wrapper = component.find('#write-tab-button');
    wrapper.simulate('click');
    wrapper = component.find('.write_mode');
    expect(wrapper.length).toBe(1);
  });

  it('should have good back-create-article-button', () => {
    const component = mount(articlecreatepage);
    let wrapper = component.find('#back-create-article-button');
    wrapper.simulate('click');
    expect(mockedPush).toHaveBeenCalledTimes(1);
  });

  it('should have good logout-button', () => {
    const spyLogOut = jest
      .spyOn(loginActionCreators, 'logOut')
      .mockImplementation(() => {
        return (dispatch) => {};
      });

    const component = mount(articlecreatepage);
    const wrapper = component.find('#logout-button');
    wrapper.simulate('click');
    expect(spyLogOut).toHaveBeenCalledTimes(1);
  });

  it('should go back to login if user not logged in', () => {
    mockStore = getMockStore(stubInitStateLO);
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <Articlecreatepage history={mockedHistory} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const wrapper = component.find('.articlecreatepage');
    expect(mockedPush).toHaveBeenCalledTimes(1);
  });

  it('should not have logout-button when user not logged in', () => {
    mockStore = getMockStore(stubInitStateLO);
    mockedPush = jest.fn();
    mockedHistory = { push: mockedPush };
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <Articlecreatepage history={mockedHistory} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const wrapper = component.find('#logout-button');
    expect(wrapper.length).toBe(0);
  });
});
