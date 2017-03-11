import React, { Component } from 'react';
import { connect } from "react-redux";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import { GitAction } from '../../store/action/gitAction'
import '../../app/App.css';
import '../../assets/common.css';


function mapStateToProps(state) {
    return {
        allcrimes: state.counterReducer['crimes']
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

        let crimes = this.props.allcrimes ? Object.keys(this.props.allcrimes).map((key) => { return this.props.allcrimes[key] }) : {};
        if (crimes.length > 0) {
            var crimeCard = crimes.map((d, i) => {
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
                    {crimeCard}
                </div>
            )
        }

        return (
            <div className="App">
                <div>
                    <h1>Crimes</h1>
                </div>
                {crimes.length > 0 ? allComplainsCards : <div className="loader"></div>}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CrimeComponent);
