import React, {Component} from 'react';
import {connect} from "react-redux";
import {startTimer, stopTimer} from "./timerActions"
import {bindActionCreators} from "redux";

class Timer extends Component {
    addLeadingZeroToTime = (time) => {
        return time.toString().length === 1 ? `0${time}` : time;
    };

    parseSecondsToTime = (seconds) => {
        const parsedMinutes = this.addLeadingZeroToTime(Math.floor(seconds / 60));
        const parsedSeconds = this.addLeadingZeroToTime(seconds - parsedMinutes * 60);

        return (
            <h2>{parsedMinutes}:{parsedSeconds}</h2>
        );
    };

    render() {
        const {timer} = this.props;
        return (
            <div>
                {this.parseSecondsToTime(timer.time)}
                {timer.active ?
                    <button onClick={this.props.stopTimer}>Pause timer</button> :
                    <button onClick={this.props.startTimer}>Start timer</button>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    timer: state.timer,
});
const mapDispatchToProps = dispatch => bindActionCreators({
    stopTimer,
    startTimer,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Timer);
