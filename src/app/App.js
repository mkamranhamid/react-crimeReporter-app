import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from "react-redux";

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import { GitAction } from '../store/action/gitAction'

import './App.css';

const mapStateToProps = (state)=> {
  return {
    currentUser: state.counterReducer['currentUser']
  };
}
const mapDispatchToProps = (dispatch)=> {
  return {
    logOutUser: () => dispatch(GitAction.CallLogout())
  };
}

class App extends Component {
  constructor(props){
    super(props)
    if (!this.props.currentUser || !this.props.currentUser.email) {return}
    if (!this.props.currentUser || !this.props.currentUser.email) {
      browserHistory.push('/login');
      console.log('jks');
    }
  }
  state = {
    open: true,

  }
  handleHumberger() {
    this.setState({ open: !this.state.open }) 
  }
  handleMenu(routeName) {
    this.setState({ open: !this.state.open })
    browserHistory.push(`/${routeName}`)
  }
  handleLogout() {
    this.props.logOutUser()
    browserHistory.push('/')
  }
  render() {
    // if (this.props.currentUser && !this.props.currentUser.email) {
    //   browserHistory.push('/login')
    //   console.log('jks')
    // }
    var menuList = ['Signup', 'Login', 'Complains'];
    const buttonStyle = { color: 'white' };

    const drawerBeforeLogin = (
      <div>
        <MenuItem onTouchTap={this.handleMenu.bind(this, 'missingPerson')}>Missing Person</MenuItem>
        <MenuItem onTouchTap={this.handleMenu.bind(this, 'crime')}>Crime</MenuItem>
      </div>
    )
    const drawerAfterLogin = (
      <div>
        <MenuItem onTouchTap={this.handleMenu.bind(this, 'missingPerson')}>Missing Person</MenuItem>
        <MenuItem onTouchTap={this.handleMenu.bind(this, 'crime')}>Crime</MenuItem>
        <MenuItem onTouchTap={this.handleMenu.bind(this, 'complain')}>Complain</MenuItem>
        <MenuItem onTouchTap={this.handleMenu.bind(this, 'registercomplain')}>Register Complain</MenuItem>
      </div>
    )
    const showDrawerMenu = (this.props.currentUser && this.props.currentUser.email) ? drawerAfterLogin : drawerBeforeLogin;

    const beforeLogin = (
      <div className='Navbar-Main-Menu'>
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
    const humberger = (
      <IconButton onClick={this.handleHumberger.bind(this)}>
        <NavigationMenu />
      </IconButton>
    );
    const navbar = (this.props.currentUser && this.props.currentUser.email) ? (
      <div className='Navbar-Main-Menu'>
        <FlatButton
          label='Logout'
          style={buttonStyle}
          onClick={this.handleLogout.bind(this)}
          />
      </div>
    ) : beforeLogin;
    var paddingStyleBody = this.state.open ? { paddingLeft: '256px' } : { paddingRight: '0' };
    var leftAppbar = this.state.open ? { left: '256px' } : { left: '0' };
    return (
      <div className="App">
        <div>
          <AppBar iconElementLeft={humberger} iconElementRight={navbar} />
          <Drawer
            docked={false}
            width={250}
            open={this.state.open}
            onRequestChange={(open) => this.setState({ open })}>
            {showDrawerMenu}
          </Drawer>
        </div>
        <div> {this.props.children}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
