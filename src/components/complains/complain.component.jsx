import React, { Component } from 'react';
import { connect } from "react-redux";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import firebase from 'firebase';


import { GitAction } from '../../store/action/gitAction'
import '../../app/App.css';
import './complain.component.css';


function mapStateToProps(state) {
    return {
        allcomplains: state.counterReducer['complains'],
        currentUser: state.counterReducer['currentUser']
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getallcomplains: () => dispatch(GitAction.CallAllComplains())
    };
}

class ServiceComponent extends Component {
    constructor(props) {
        super(props);
        this.props.getallcomplains()
    }
    handleReviewBtn(e){
        console.log(e)
        var keyToHit = '';
        for(var key in this.props.allcomplains){
            let someOnj = this.props.allcomplains[key];
            if(someOnj.name == e.name){
                keyToHit = key;
            }
        }
        firebase.database().ref('/').child(`complain/${keyToHit}`).update({status: 'reviewd'})
    }
    render() {

        let complains = this.props.allcomplains ? Object.keys(this.props.allcomplains).map((key) => { return this.props.allcomplains[key] }) : {};
        let reviewBtn = this.props.currentUser.role == 'admin'?<FlatButton label="Review it" style={{'float': 'right'}} onClick={this.handleReviewBtn.bind(this)}/>:<div></div>
        if (complains.length > 0) {
            var complainCard = complains.map((d, i) => {
                return <div key={i} className="card">
                    <div className="container">
                        <div>
                            <h4 style={{ 'display': 'inline-block' }}><b>{d.title}</b></h4>
                            <strong style={{'color':'#c6df3e','float':'right'}}>{d.status}</strong>
                            {this.props.currentUser.role == 'admin'?<FlatButton label="Review it" style={{'float': 'right'}} onClick={this.handleReviewBtn.bind(this,d)}/>:<div></div>}
                        </div>
                        <p>{d.description}</p>
                    </div>
                </div>
            })
        }
        return (
            <div className="App">
                <div className="App-header">
                    <h1>Complains</h1>
                </div>
                {complains?complainCard:complains}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceComponent);
