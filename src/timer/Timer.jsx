import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {startTimer, stopTimer, pauseTimer} from "./timerActions";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPause, faPlay} from '@fortawesome/free-solid-svg-icons'
import "./Timer.scss";
import "./TimerCircle.css";

class Timer extends Component {
    addLeadingZeroToTime = (time) => {
        return time.toString().length === 1 ? `0${time}` : time;
    };

    getPercentageLeftOfTime = () => {
        const {currentTime, sessionLength} = this.props.timer;
        return (currentTime / sessionLength) * 100;
    };

    renderCircularProgressbar = () => {
        let percentDone = this.getPercentageLeftOfTime();
        console.info(percentDone);

        return (
            <svg className="circle-chart"
                 viewBox="0 0 33.83098862 33.83098862"
                 width="180"
                 height="180"
                 xmlns="http://www.w3.org/2000/svg">
                <circle className="circle-chart__background"
                        stroke="#f3f3f3"
                        strokeWidth="3"
                        fill="none"
                        cx="16.91549431"
                        cy="16.91549431"
                        r="15.91549431"
                />
                <circle className="circle-chart__circle"
                        stroke="#00acc1"
                        strokeWidth="3"
                        strokeDasharray={`${percentDone || 100},100`}
                        strokeLinecap="round"
                        fill="none"
                        cx="16.91549431"
                        cy="16.91549431"
                        r="15.91549431"
                />
            </svg>
        );
    };

    renderTimeRemaining = (seconds) => {
        const parsedMinutes = this.addLeadingZeroToTime(Math.floor(seconds / 60));
        const parsedSeconds = this.addLeadingZeroToTime(seconds - parsedMinutes * 60);

        return (
            <div className="timer__time">
                <div className="timer__time--numbers">
                    {parsedMinutes}:{parsedSeconds}
                </div>
                <div className="timer__time--icons">
                    <FontAwesomeIcon icon={this.props.timer.active ? faPause : faPlay}/>
                </div>
            </div>
        );
    };

    render() {
        const {settings, timer} = this.props;
        return (
            <div>
                <div
                    className="timer pointer"
                    onClick={this.props.pauseTimer}
                >
                    {this.renderCircularProgressbar()}
                    {this.renderTimeRemaining(timer.currentTime)}
                </div>
                {timer.active ? "Pause timer" : "Start timer"}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    timer: state.timer,
});
const mapDispatchToProps = dispatch => bindActionCreators({
    stopTimer,
    pauseTimer,
    startTimer,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Timer);
