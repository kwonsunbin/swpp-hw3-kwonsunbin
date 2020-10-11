import React from 'react';
import App from './App';
import { Provider } from 'react-redux';

import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import { createMount } from '@material-ui/core/test-utils';
import { getMockStore } from './test-utils/mocks';
import { history } from './store/store';

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

  it('renders without crashing', () => {
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <App />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });
});
