import React, { Component } from 'react';
import { connect } from "react-redux";
import { browserHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {
  grey900,
  darkBlack
} from 'material-ui/styles/colors';

import {GitAction} from '../../store/action/gitAction'
import './about.component.css';
import '../../app/App.css';

function mapStateToProps(state) {
    return {
        currentUser: state.counterReducer['currentUser']
    };
}

function mapDispatchToProps(dispatch) {
    return {
      loginUser: (credentials) => dispatch(GitAction.CallLogin(credentials))
    };
}

const btnStyle = {
  color: grey900,
}


class AboutComponent extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this)
    this.OnSubmitLogin = this.OnSubmitLogin.bind(this)

  }
  state = {
    email: '',
    password: ''
  }

  OnSubmitLogin(e) {
    e.preventDefault();
    this.props.loginUser(this.state)
  }
  handleChange(e) {
    if (e.target.type == 'email') {
      this.setState({
        email: e.target.value
      })
    } else {
      this.setState({
        password: e.target.value
      })
    }
  }
  render() {
    if (this.props.currentUser && this.props.currentUser.email) {
      browserHistory.push('/complain')
    }
    const buttonStyle = { backgroundColor: this.props.muiTheme.palette.textColor, width: '100%' }

    return (
      <div className="App">
        
        <div>
            <Paper className='Login-Panel' style={{width: '800px',margin: '0 auto'}}>
            <h1>Login</h1>
                <form style={{ padding: '16px', margin: '0px' }} className='LoginForm' onSubmit={this.OnSubmitLogin}>
                        <TextField
                        id="text-field-controlled"
                        hintText="Email"
                        value={this.state.email}
                        type='text'
                        onChange={({ target }) => { this.setState({ email: target.value }) } } />
                    <br />
                    <TextField
                        id="text-field-controlled1"
                        hintText="Password"
                        value={this.state.password}
                        type='password'
                        onChange={({ target }) => { this.setState({ password: target.value }) } } />
                   
                    <div className='LoginForm-Submit' >
                        <RaisedButton
                            label='Sign-in'
                            primary
                            type='submit'
                            backgroundColor={this.props.muiTheme.palette.textColor}
                            />
                    </div>
                </form>
            </Paper>
        </div>
      </div>
    );
  }
}

export default (muiThemeable())(connect(mapStateToProps, mapDispatchToProps)(AboutComponent));
