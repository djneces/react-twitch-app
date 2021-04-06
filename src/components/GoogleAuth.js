import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

class GoogleAuth extends Component {
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
          //passing current authentication status
          this.onAuthChange(this.auth.isSignedIn.get());
          //listening for the signIn status
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }
  //is called with boolean value
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      //we pass users id
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className='ui red google button'>
          <i className='google icon' />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className='ui red google button'>
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

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
