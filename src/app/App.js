import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from "react-redux";

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton'

import './App.css';

function mapStateToProps(state) {
  return {
    currentUser: state.counterReducer['currentUser']
  };
}

class App extends Component {
  render() {
    var menuList = ['Signup', 'Login', 'Complains'];
    const buttonStyle = { color: 'white' };

    var linkList = menuList.map((d, i) => {
      return <li key={i}><Link to={d.toLowerCase()}>{d}</Link></li>
    })
    const beforeLogin = (
      <div className='Navbar-Main-Menu'>
        <FlatButton
          label='Missing Persons'
          style={buttonStyle}
          onClick={() => browserHistory.push('/missingPerson')}
          />
          <FlatButton
          label='Crimes'
          style={buttonStyle}
          onClick={() => browserHistory.push('/crime')}
          />
        <FlatButton
          label='Sign Up'
          style={buttonStyle}
          onClick={() => browserHistory.push('/signup')}
          />
        <FlatButton
          label='Login'
          style={buttonStyle}
          onClick={() => browserHistory.push('/login')}
          />
      </div>
    );
    const navbar = (this.props.currentUser && this.props.currentUser.email) ? (
      <div className='Navbar-Main-Menu'>
        <FlatButton
          label='Missing Persons'
          style={buttonStyle}
          onClick={() => browserHistory.push('/missingPerson')}
          />
          <FlatButton
          label='Crimes'
          style={buttonStyle}
          onClick={() => browserHistory.push('/crime')}
          />
          <FlatButton
          label='Complains'
          style={buttonStyle}
          onClick={() => browserHistory.push('/complain')}
          />
        <FlatButton
          label='Register Complain'
          style={buttonStyle}
          onClick={() => browserHistory.push('/registercomplain')}
          />
      </div>
    ) : beforeLogin;
    return (
      <div className="App">
        <div>
          <AppBar title="Crime Reporter" iconClassNameRight="muidocs-icon-navigation-expand-more" iconElementRight={navbar} />
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(App);
