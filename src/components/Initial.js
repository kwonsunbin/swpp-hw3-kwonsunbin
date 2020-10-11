import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
class Initial extends Component {
  render() {
    return <Redirect className="toLogin" to="/login" />;
  }
}

export default Initial;
