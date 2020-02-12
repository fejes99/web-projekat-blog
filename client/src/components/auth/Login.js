import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


class Login extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  // the security of this is not the best
  storeToken = (token) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("username", this.state.username);
    // the length of the session is 1h = 3600s
    sessionStorage.setItem("expire-time",  Math.round((new Date()).getTime() / 1000) + 3600);
    console.log(this.props)

    // sessionStorage.setItem("location", this.props.location.state.last);
  }

  handleLoginError = (error) => {}

  login = () => {
    const {username, password} = this.state;
    const { history } = this.props;

    axios.post("http://localhost:8082/api/users/login", {
      username,
      password
    })
    .then(res => this.storeToken(res.data.token))
    .then(() => {
      const path = this.props.location && this.props.location.state && this.props.location.state.last || '/';
      history.push(path);
    })
    .catch(error => this.handleLoginError(error));
  }

  render() {
    return (
      <div>
        <p>Login</p>
        <label>Username</label>
        <input onChange={e => this.setState({ username: e.target.value })} placeholder="username"/><br />
        <label>Password</label>
        <input type="password" onChange={e => this.setState({ password: e.target.value })} placeholder="password"/><br />
        <button onClick={this.login}>Login</button>
      </div>  
    );
  }
    
}
export default withRouter(Login);