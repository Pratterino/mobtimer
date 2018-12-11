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
            <div className="app">
                {window.location.hostname === "localhost" &&
                <div className="hide">
                    <h3>ReduxState</h3>
                    <pre>{JSON.stringify(this.props.test, null, 2)}</pre>
                    <hr/>
                </div>
                }

                <h3> Users </h3>
                <Users/>

                <hr/>
                <h3>Settings</h3>
                <Settings/>

                <hr/>
                <h3>Timer</h3>
                <Timer/>
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

