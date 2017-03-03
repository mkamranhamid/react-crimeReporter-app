import React, { Component } from 'react';
import { connect } from "react-redux";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import { GitAction } from '../../store/action/gitAction'
import '../../app/App.css';


function mapStateToProps(state) {
    return {
        allcomplains: state.counterReducer['crimes']
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getallcomplains: () => dispatch(GitAction.CallAllCrime())
    };
}

class CrimeComponent extends Component {
    constructor(props) {
        super(props);
        this.props.getallcomplains()
    }
    render() {

        let complains = this.props.allcomplains ? Object.keys(this.props.allcomplains).map((key) => { return this.props.allcomplains[key] }) : {};
        if (complains.length > 0) {
            var complainCard = complains.map((d, i) => {
                return <div key={i} className="card">
                    <div className="container">
                        <h4><b>{d.title}</b></h4>
                        <p>{d.description}</p>
                    </div>
                </div>
            })
        }
        return (
            <div className="App">
                <div className="App-header">
                    <h1>Crime</h1>
                </div>
                {complains?complainCard:complains}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CrimeComponent);
