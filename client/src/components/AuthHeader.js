import React from 'react';

class AuthHeader extends React.Component {
  render() {
    const username = sessionStorage.getItem('username');

    return (
      <div>
        <p className="navbar-text navbar-right">
        {username ? <p>Hello {username}</p> : <p>Please log in</p>}	        
      </p>		
      </div>
    )
  }
}

export default AuthHeader;