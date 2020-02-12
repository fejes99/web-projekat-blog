import React from 'react';
import axios from 'axios';
 
class Register extends React.Component {
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
    // the length of the session is 1h = 3600s
    sessionStorage.setItem("expire-time",  Math.round((new Date()).getTime() / 1000) + 3600);
  }
  
  handleLoginError = (error) => {}

  register = () => {
    const {username, password} = this.state;
    const { history } = this.props;
    
    axios.post("http://localhost:8082/api/users/register", {
      username,
      password
    })
    .then(res => this.storeToken(res.data.token))
    .then(() => history.push('/'))
    .catch(error => this.handleLoginError(error))
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <input onChange={e => this.setState({ username: e.target.value })} placeholder="username"></input>
        <input onChange={e => this.setState({ password: e.target.value })} type="password" placeholder="password"></input>
        <button onClick={this.register}>Register</button>
      </div>
    );
  }
}

export default Register;