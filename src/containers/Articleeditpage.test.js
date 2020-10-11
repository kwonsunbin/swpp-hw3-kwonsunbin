import React from 'react';
import { Provider } from 'react-redux';
import { createMount } from '@material-ui/core/test-utils';

import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import Articleeditpage from './Articleeditpage';
import * as articleActionCreators from '../store/actions/article';
import * as loginActionCreators from '../store/actions/login';

const stubInitStateLI = {
  logInInfo: {
    id: 1,
    logged_in: true,
  },
  selectedArticle: {
    id: 1,
    author_id: 1,
    title: 'TEST',
    content: 'TEST',
  },
};

const stubInitStateLO = { logInInfo: { logged_in: false } };

describe('<Articleeditpage />', () => {
  let mockStore = getMockStore(stubInitStateLI);
  let articleeditpage;
  let mount;

  beforeAll(() => {
    mount = createMount();
  });

  afterAll(() => {
    mount.cleanUp();
  });

  beforeEach(() => {
    let mockedPush = jest.fn();
    let mockedHistory = { push: mockedPush };
    let mockedMatch = { params: { id: 1 } };
    articleeditpage = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <Articleeditpage history={mockedHistory} match={mockedMatch} />
              )}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Articleeditpage', () => {
    const component = mount(articleeditpage);
    const wrapper = component.find('.articleeditpage');
    expect(wrapper.length).toBe(3);
  });

  it('should have good logout-button', () => {
    const spyLogOut = jest
      .spyOn(loginActionCreators, 'logOut')
      .mockImplementation(() => {
        return (dispatch) => {};
      });
    const component = mount(articleeditpage);

    let wrapper = component.find('#logout-button');
    wrapper.simulate('click');
    expect(spyLogOut).toHaveBeenCalledTimes(1);
  });

  it('should have good preview-tab-button', () => {
    const component = mount(articleeditpage);
    const wrapper = component.find('#preview-tab-button');
    wrapper.simulate('click');
    const instance = component
      .find(Articleeditpage.WrappedComponent)
      .instance();
    expect(instance.state.mode).toEqual('preview');
  });

  it('should have good write-tab-button', () => {
    const component = mount(articleeditpage);
    let wrapper = component.find('#preview-tab-button');
    wrapper.simulate('click');
    wrapper = component.find('#write-tab-button');
    wrapper.simulate('click');
    const instance = component
      .find(Articleeditpage.WrappedComponent)
      .instance();
    expect(instance.state.mode).toEqual('write');
  });

  it('should have good back-edit-article-button nothing changed', () => {
    let mockedPush = jest.fn();
    let mockedHistory = { push: mockedPush };
    let mockedMatch = { params: { id: 1 } };
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <Articleeditpage history={mockedHistory} match={mockedMatch} />
              )}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    let wrapper = component.find('#back-edit-article-button');
    wrapper.simulate('click');
    expect(mockedPush).toHaveBeenCalledTimes(1);
  });

  it('should have good back-edit-article-button something changed', () => {
    let mockedPush = jest.fn();
    let mockedHistory = { push: mockedPush };
    let mockedMatch = { params: { id: 1 } };
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <Articleeditpage history={mockedHistory} match={mockedMatch} />
              )}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    let wrapper = component.find('textarea');
    wrapper.simulate('change', { target: { value: 'MODIFIED CONTENT' } });
    wrapper = component.find('input');
    wrapper.simulate('change', { target: { value: 'MODIFIED TITLE' } });
    wrapper = component.find('#back-edit-article-button');
    wrapper.simulate('click');
    expect(mockedPush).toHaveBeenCalledTimes(0);
  });

  it('should have good confirm-edit-article-button', () => {
    const spyPutAritcle = jest
      .spyOn(articleActionCreators, 'putArticle')
      .mockImplementation(() => {
        return (dispatch) => {};
      });
    const component = mount(articleeditpage);
    let wrapper = component.find('#confirm-edit-article-button');
    wrapper.simulate('click');
    expect(spyPutAritcle).toHaveBeenCalledTimes(1);
  });

  it('should disable confirm button when there is nothing', () => {
    const spyPutAritcle = jest
      .spyOn(articleActionCreators, 'putArticle')
      .mockImplementation(() => {
        return (dispatch) => {};
      });
    const component = mount(articleeditpage);
    let wrapper = component.find('textarea');
    wrapper.simulate('change', { target: { value: '' } });
    wrapper = component.find('input');
    wrapper.simulate('change', { target: { value: '' } });
    wrapper = component.find('#confirm-edit-article-button');
    wrapper.simulate('click');
    expect(spyPutAritcle).toHaveBeenCalledTimes(0);
  });

  it('should disable confirm button when there is nothing2', () => {
    const spyPutAritcle = jest
      .spyOn(articleActionCreators, 'putArticle')
      .mockImplementation(() => {
        return (dispatch) => {};
      });
    const component = mount(articleeditpage);
    let wrapper = component.find('textarea');
    wrapper.simulate('change', { target: { value: '' } });
    wrapper = component.find('#confirm-edit-article-button');
    wrapper.simulate('click');
    expect(spyPutAritcle).toHaveBeenCalledTimes(0);
  });

  it('should disable confirm button when there is nothing3', () => {
    const spyPutAritcle = jest
      .spyOn(articleActionCreators, 'putArticle')
      .mockImplementation(() => {
        return (dispatch) => {};
      });
    const component = mount(articleeditpage);
    let wrapper = component.find('input');
    wrapper.simulate('change', { target: { value: '' } });
    wrapper = component.find('#confirm-edit-article-button');
    wrapper.simulate('click');
    expect(spyPutAritcle).toHaveBeenCalledTimes(0);
  });

  it('should go back to login page when user logged out', () => {
    mockStore = getMockStore(stubInitStateLO);
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Articleeditpage} />
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
