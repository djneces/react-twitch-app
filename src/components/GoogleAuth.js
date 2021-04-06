import React, { Component } from 'react';
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

class GoogleAuth extends Component {
  //null because we don't know whether user signed in or not
  state = { isSignedIn: null };
  componentDidMount() {
    //loading client portion of the google library, after that is complete -> callback
    window.gapi.load('client:auth2', () => {
      //returns promise
      window.gapi.client
        .init({
          clientId: CLIENT_ID,
          scope: 'email',
          //we can use then once gapi library inits
        })
        .then(() => {
          //instance
          this.auth = window.gapi.auth2.getAuthInstance();
          //isSignedIn.get() - func from the library, property on Auth object
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          //listening for the signIn status
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  onSignIn = () => {
    this.auth.signIn();
  };

  onSignOut = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <button onClick={this.onSignOut} className='ui red google button'>
          <i className='google icon' />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignIn} className='ui red google button'>
          <i className='google icon' />
          Sign In with Google
        </button>
      );
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth;
