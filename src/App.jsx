import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import Timer from './timer/Timer';
import Settings from './settings/Settings';
import {startTimer} from "./timer/timerActions"
import {usersSelector} from "./user/userReducer";
import Users from "./user/Users";
import './App.css';

class App extends Component {
    startCountDown = () => {
        this.props.startTimer();
    };

    render() {
        return (
            <div>
                <div className="row">
                    State
                    <pre>{JSON.stringify(this.props.test, null, 2)}</pre>
                    <hr/>
                    Users
                    <Users/>

                    <hr/>
                    Settings
                    <Settings/>

                    <hr/>
                    Timer
                    <Timer/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    test: state,
    timer: state.timer,
    users: usersSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    startTimer,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);

