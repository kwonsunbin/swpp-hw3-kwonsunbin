import React from 'react';
import { Provider } from 'react-redux';
import { createMount } from '@material-ui/core/test-utils';

import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import Loginpage from './Loginpage';
import * as actionCreators from '../store/actions/login';

const stubInitialStateLI = {
  logInInfo: {
    id: 1,
    email: 'swpp@snu.ac.kr',
    password: 'iluvswpp',
    name: 'Software Lover',
    logged_in: true,
  },
};

const stubInitialStateLO = {
  logInInfo: {
    id: 1,
    email: 'swpp@snu.ac.kr',
    password: 'iluvswpp',
    name: 'Software Lover',
    logged_in: false,
  },
};
let mockStore = getMockStore(stubInitialStateLI);

describe('<Loginpage />', () => {
  let loginpage;
  let mount;

  beforeAll(() => {
    mount = createMount();
  });

  afterAll(() => {
    mount.cleanUp();
  });

  beforeEach(() => {
    loginpage = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Loginpage} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Loginpage when not logged in', () => {
    mockStore = getMockStore(stubInitialStateLO);
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Loginpage} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const wrapper = component.find('.loginpage');
    expect(wrapper.length).toBe(3);
  });

  it('should make user logged in with correct id,pw', () => {
    mockStore = getMockStore(stubInitialStateLO);
    const spyLogIn = jest
      .spyOn(actionCreators, 'logIn')
      .mockImplementation(() => {
        return (dispatch) => {};
      });
    let component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <Loginpage />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    let wrapper = component.find('#email-input');
    wrapper.simulate('change', { target: { value: 'swpp@snu.ac.kr' } });
    wrapper = component.find('#pw-input');
    wrapper.simulate('change', { target: { value: 'iluvswpp' } });
    wrapper = component.find('#login-button');
    wrapper.simulate('click');
    expect(spyLogIn).toHaveBeenCalledTimes(1);
  });

  it('should not make user logged in with incorrect id,pw', () => {
    mockStore = getMockStore(stubInitialStateLO);
    const spyLogIn = jest
      .spyOn(actionCreators, 'logIn')
      .mockImplementation(() => {
        return (dispatch) => {};
      });
    let component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Loginpage} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    let wrapper = component.find('#email-input');
    wrapper.simulate('change', { target: { value: 'fasdf' } });
    wrapper = component.find('#pw-input');
    wrapper.simulate('change', { target: { value: 'fasdf' } });
    wrapper = component.find('#login-button');
    wrapper.simulate('click');
    expect(spyLogIn).toHaveBeenCalledTimes(0);
  });

  it('should not render Loginpage when logged in', () => {
    mockStore = getMockStore(stubInitialStateLI);
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Loginpage} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const wrapper = component.find('.loginpage');
    expect(wrapper.length).toBe(0);
  });
});
