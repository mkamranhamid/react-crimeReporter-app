import React, { Component } from 'react';
import { connect } from "react-redux";
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import firebase from 'firebase';
import FontIcon from 'material-ui/FontIcon';



import { GitAction } from '../../store/action/gitAction'
import '../../app/App.css';
import './complain.component.css';
import '../../assets/common.css';


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
    handleReviewBtn(e) {
        console.log(e)
        var keyToHit = '';
        for (var key in this.props.allcomplains) {
            let someOnj = this.props.allcomplains[key];
            if (someOnj.name == e.name) {
                keyToHit = key;
            }
        }
        firebase.database().ref('/').child(`complain/${keyToHit}`).update({ status: 'reviewd' })
    }
    render() {

        let complains = this.props.allcomplains ? Object.keys(this.props.allcomplains).map((key) => { return this.props.allcomplains[key] }) : {};
        let reviewBtn = this.props.currentUser.role == 'admin' ? <FlatButton label="Review it" style={{ 'float': 'right' }} onClick={this.handleReviewBtn.bind(this)} /> : <div></div>
        // Admin button
        // {this.props.currentUser.role == 'admin' ? <FlatButton label="Review it" style={{ 'float': 'right' }} onClick={this.handleReviewBtn.bind(this, d)} /> : <div></div>}
        if (complains.length > 0) {
            var complainCard = complains.map((d, i) => {
                return (<div className="col-xs-6" key={i}>
                    <div className="box">
                        <Card>
                            <CardHeader
                                title={d.title}
                                subtitle={d.status}
                                showExpandableButton={true}
                                />
                            <CardText expandable>
                                {d.description}
                            </CardText>
                        </Card>
                    </div>
                </div>)
            })
            var allComplainsCards = (
                <div className="row">
                    {complainCard}
                </div>
            )
        }
        return (
            <div className="App">
                <div className="">
                    <h1>Complains</h1>
                </div>
                {(complains.length > 0) ? allComplainsCards : <div className="loader"></div>}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceComponent);
