import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loginpage from './containers/Loginpage';
import Articlelistpage from './containers/Articlelistpage';
import Articleeditpage from './containers/Articleeditpage';
import Articledetailpage from './containers/Articledetailpage';
import Articlecreatepage from './containers/Articlecreatepage';
import { ConnectedRouter } from 'connected-react-router';

function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
        <Route exact path="/login" component={Loginpage}></Route>
        <Route
          exact
          path="/articles"
          render={(props) => <Articlelistpage {...props} />}
        ></Route>
        <Route
          exact
          path="/articles/create"
          render={(props) => <Articlecreatepage {...props} />}
        ></Route>
        <Route
          exact
          path="/articles/:id"
          render={(props) => <Articledetailpage {...props} />}
        ></Route>
        <Route
          exact
          path="/articles/:id/edit"
          render={(props) => <Articleeditpage {...props} />}
        ></Route>
      </Switch>
    </ConnectedRouter>
  );
}

export default App;
