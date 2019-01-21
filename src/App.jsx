import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import Timer from './timer/Timer';
import {startTimer} from "./timer/timerActions"
import {usersSelector} from "./user/userReducer";
import Users from "./user/Users";
import Notifications from "./notifications/Notifications";
import Settings from "./settings/Settings";
import './App.css';

class App extends Component {
    startCountDown = () => {
        this.props.startTimer();
    };

    render() {
        return (
            <div className="app">
                {false && window.location.hostname === "localhost" &&
                <div className="hide">
                    <h3>ReduxState</h3>
                    <pre>{JSON.stringify(this.props.test, null, 2)}</pre>
                </div>
                }

                <Notifications/>

                <Settings/>

                <Users/>

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

