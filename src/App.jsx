import React, {Component} from 'react';
import {connect} from "react-redux";

import Timer from './timer/Timer';
import {startTimer} from "./timer/timerActions"
import './App.css';
import {bindActionCreators} from "redux";

class Settings extends Component {
    render() {
        return (
            <div>
                <h3>Minutes</h3>
                <input
                    type="number"
                    value={this.props.minutes}
                    onChange={this.props.handleChange}
                />
            </div>
        );
    }
}

class App extends Component {
    startCountDown = () => {
        this.props.startTimer();
    };

    handleChange = (event) => {
        console.log("TODO: ", {minutes: event.target.value})
    };

    render() {
        return (
            <div>
                <div className="row">
                    <pre>{JSON.stringify(this.props.state)}</pre>

                    <Settings/>

                    <Timer/>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    state,
    timer: state.timer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    startTimer,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);

