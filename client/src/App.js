import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import CreateBlog from './components/blogs/CreateBlog';
import ShowBlogList from './components/blogs/ShowBlogList';
import UpdateBlog from './components/blogs/UpdateBlog';
import ShowBlog from './components/blogs/ShowBlog';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

class App extends Component {
  render() {
    return (
      <Router >
        <Switch>
          <Route exact path='/' component={ShowBlogList} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <ProtectedRoute path='/create-blog' component={CreateBlog} />
          <ProtectedRoute path='/edit-blog/:id' component={UpdateBlog} />
          <Route path='/show-blog/:id' component={ShowBlog} />
        </Switch>
      </Router>
    );
  }
}

export default App;
