import React, { Component } from 'react';
import { connect } from "react-redux";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import { GitAction } from '../../store/action/gitAction'
import '../../app/App.css';
import '../../assets/common.css';


function mapStateToProps(state) {
    return {
        allMissings: state.counterReducer['missings']
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getallcomplains: () => dispatch(GitAction.CallAllMissings())
    };
}

class MissingPersonComponent extends Component {
    constructor(props) {
        super(props);
        this.props.getallcomplains()
    }
    render() {

        let missingPersons = this.props.allMissings ? Object.keys(this.props.allMissings).map((key) => { return this.props.allMissings[key] }) : {};
        if (missingPersons.length > 0) {
            var missingPersonCard = missingPersons.map((d, i) => {
                return (<div className="col-xs-6" key={i}>
                    <div className="box">
                        <Card>
                            <CardHeader
                                title={d.title}
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
                    {missingPersonCard}
                </div>
            )
        }
        return (
            <div className="App">
                <div>
                    <h1>Missing Persons</h1>
                </div>

                {missingPersons.length > 0 ? allComplainsCards : <div className="loader"></div>}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MissingPersonComponent);
