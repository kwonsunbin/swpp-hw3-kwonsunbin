import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import Grid from '@material-ui/core/Grid';
import './containers.css';
import { Redirect } from 'react-router';

class Loginpage extends Component {
  state = {
    email: 'swpp@snu.ac.kr',
    pw: 'iluvswpp',
  };
  componentDidMount() {
    this.props.onGetLogInInfo();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.email === 'swpp@snu.ac.kr' && this.state.pw === 'iluvswpp') {
      this.props.logIn();
    } else {
      alert('Email or password is wrong');
    }
  };
  render() {
    if (this.props.logInInfo.logged_in) {
      return <Redirect to="/articles" />;
    }
    return (
      <Grid container>
        <Grid item xs={12}>
          <h1>Login page</h1>
        </Grid>
        <Grid container item xs={3}>
          <Grid item xs={3}>
            email :
          </Grid>
          <Grid item xs={9}>
            <input
              id="email-input"
              value={this.state.email}
              onChange={(e) =>
                this.setState({ ...this.state, email: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={3}>
            password :
          </Grid>
          <Grid item xs={9}>
            <input
              id="pw-input"
              value={this.state.pw}
              onChange={(e) =>
                this.setState({ ...this.state, pw: e.target.value })
              }
            />
          </Grid>
        </Grid>
        <Grid container item xs={2}>
          <Grid item xs={12}>
            <button id="login-button" onClick={(e) => this.handleSubmit(e)}>
              login-button
            </button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    logInInfo: state.login.logInInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: () => dispatch(actionCreators.logIn()),
    onGetLogInInfo: () => dispatch(actionCreators.getLogInInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Loginpage);
