import React, { Component } from 'react';
import { connect } from "react-redux";
import { browserHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
    customWidth: {
        width: 200,
    },
};


import { GitAction } from '../../store/action/gitAction'
import '../../app/App.css';
import './services.component.css';


function mapStateToProps(state) {
    return {
        reported: state.counterReducer['report']
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fileAReport: (somedata) => dispatch(GitAction.CallFileAReport(somedata))
    };
}

class ServiceComponent extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this)
        this.OnSubmitLogin = this.OnSubmitLogin.bind(this);
    }
    state = {
        name: '',
        value: 'Complain',
        title: '',
        description: ''
    }
    OnSubmitLogin(e) {
        e.preventDefault();
        this.props.fileAReport(this.state)
        console.log(this.state)
    }
    handleChange = (event, index, value) => this.setState({ value });
    render() {
        const buttonStyle = { width: '100%' };
        if (this.props.reported && this.props.reported.value) {
            browserHistory.push('/complain')
        }
        return (
            <div className="App">
                <div className="App-header">
                    <h1>Complains</h1>
                </div>
                <Paper className='Login-Panel'>
                    <form style={{ padding: '16px', margin: '0px' }} className='LoginForm' onSubmit={this.OnSubmitLogin}>

                        <TextField
                            id="text-field-controlled"
                            hintText="Name"
                            value={this.state.name}
                            onChange={({ target }) => { this.setState({ name: target.value }) } } />
                        <br />
                        <TextField
                            id="text-field-controlled"
                            hintText="Title"
                            value={this.state.title}
                            onChange={({ target }) => { this.setState({ title: target.value }) } } />
                        <br />
                        <TextField
                            id="text-field-controlled1"
                            hintText="Add Description"
                            multiLine={true}
                            rows={2}
                            rowsMax={4}
                            value={this.state.description}
                            onChange={({ target }) => { this.setState({ description: target.value }) } } />
                        <br />
                        <div>
                            <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                                <MenuItem value={'Crime'} primaryText="Crime" />
                                <MenuItem value={'Missing Person'} primaryText="Missing Person" />
                                <MenuItem value={'Complain'} primaryText="Complain" />
                            </DropDownMenu>
                        </div>

                        <div className='LoginForm-Submit'>
                            <RaisedButton
                                label='Add'
                                primary
                                type='submit'
                                style={buttonStyle}
                                />
                        </div>
                    </form>
                </Paper>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceComponent);
