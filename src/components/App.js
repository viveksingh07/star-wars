import React, { Component } from 'react';

import Login from './Login';

export default class App extends Component {
  render() {
    return (
      <div className="login-container">
        <h4>Login to Star Wars</h4>
        <br />
        <Login />
      </div>
    )
  }
}
