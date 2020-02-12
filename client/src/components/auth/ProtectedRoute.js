import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { withRouter } from "react-router-dom";

class ProtectedRoute extends Component {
  componentDidMount() {
    const { history, location } = this.props;
    const expireTime = sessionStorage.getItem('expire-time');
    const currentTime = Math.round((new Date()).getTime() / 1000);
    if (expireTime - currentTime <= 0) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('expire-time');
    }

    const token = sessionStorage.getItem('token');

    const authenticated = !!token;
    
    if (!authenticated) {
      history.push("/login", {last: location });
    }
  }

  render() {
    return (
      <Route {...this.props} />
      )
    }
  }
  
  export default withRouter(ProtectedRoute);