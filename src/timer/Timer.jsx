import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {playPauseTimer, startTimer, stopTimer} from "./timerActions";
import {getParsedTimeRemaining, lightenDarkenColor} from "./../helper/TimerHelper";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPause, faPlay} from '@fortawesome/free-solid-svg-icons'
import "./Timer.scss";
import "./TimerCircle.scss";

class Timer extends Component {
    getPercentageLeftOfTime = () => {
        const {currentTime, sessionLength} = this.props.timer;
        return (currentTime / sessionLength) * 100;
    };

    renderCircularProgressbar = () => {
        const circleGradient = this.props.timer.active ? "active" : "inactive";
        const headerColor = getComputedStyle(document.body).getPropertyValue('--header-color');
        const luminance = 0.3;

        return (
            <svg className="circle-chart"
                 viewBox="0 0 33.83098862 33.83098862"
                 width="180"
                 height="180"
                 xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="background" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={"#f3f3f3"} />
                        <stop offset="100%" stopColor={lightenDarkenColor("#f3f3f3", luminance)} />
                    </linearGradient>
                    <linearGradient id="inactive" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={headerColor} />
                        <stop offset="100%" stopColor={lightenDarkenColor(headerColor, luminance)} />
                    </linearGradient>
                    <linearGradient id="active" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#66cdaa" />
                        <stop offset="100%" stopColor={lightenDarkenColor("#66cdaa", luminance)} />
                    </linearGradient>
                    <linearGradient id="paused" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#d7d283" />
                        <stop offset="100%" stopColor={lightenDarkenColor("#d7d283", luminance)} />
                    </linearGradient>
                </defs>
                <circle className="circle-chart__background"
                        stroke="url(#background)"
                        strokeWidth="3"
                        fill="none"
                        cx="16.91549431"
                        cy="16.91549431"
                        r="15.91549431"
                />
                <circle className={`circle-chart__circle`}
                        stroke={`url(#${circleGradient})`}
                        strokeWidth="3"
                        strokeDasharray={`${this.getPercentageLeftOfTime() || 100},100`}
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
        const time = getParsedTimeRemaining(seconds);

        return (
            <div className="timer__time">
                <div className="timer__time--numbers">
                    {time}
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
            <section className="Timer">
                <div
                    className="timer pointer"
                    onClick={this.props.playPauseTimer.bind(null, this.props.timer)}
                >
                    {this.renderCircularProgressbar()}
                    {this.renderTimeRemaining(timer.currentTime)}
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => ({
    timer: state.timer,
});
const mapDispatchToProps = dispatch => bindActionCreators({
    stopTimer,
    playPauseTimer,
    startTimer,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Timer);
