import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {playPauseTimer, startTimer, stopTimer} from "./timerActions";
import {getParsedTimeRemaining, getPercentageLeftOfTime, lightenDarkenColor} from "./../helper/TimerHelper";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPause, faPlay} from '@fortawesome/free-solid-svg-icons'
import "./Timer.scss";
import "./TimerCircle.scss";

function Timer(props) {
    const {timer} = props;

    const renderCircularProgressbar = () => {
        const circleGradient = props.timer.active ? "active" : "inactive";
        const backgroundShadowColor = "rgba(25, 25, 25, 0.5)";
        const backgroundColor = getComputedStyle(document.body).getPropertyValue('--background');
        const activeColor = getComputedStyle(document.body).getPropertyValue('--active-timer-color');
        const stopColor = getComputedStyle(document.body).getPropertyValue('--stopped-timer-color');
        const luminance = 0.5;

        return (
            <svg className="circle-chart"
                 viewBox="0 0 33.83098862 33.83098862"
                 width="220"
                 height="220"
                 xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="background-shadow" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={backgroundShadowColor}/>
                    </linearGradient>
                    <linearGradient id="background" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={backgroundColor}/>
                        <stop offset="100%" stopColor={lightenDarkenColor(backgroundColor, luminance)}/>
                    </linearGradient>
                    <linearGradient id="inactive" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={stopColor}/>
                        <stop offset="100%" stopColor={lightenDarkenColor(stopColor, luminance)}/>
                    </linearGradient>
                    <linearGradient id="active" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={activeColor}/>
                        <stop offset="100%" stopColor={lightenDarkenColor(activeColor, luminance)}/>
                    </linearGradient>
                </defs>
                <circle className="circle-chart__background-shadow"
                        stroke="url(#background-shadow)"
                        strokeWidth="4"
                        fill="none"
                        cx="16.91549431"
                        cy="16.91549431"
                        r="15.91549431"
                />
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
                        strokeDasharray={`${getPercentageLeftOfTime(timer.currentTime, timer.sessionLength) || 100},100`}
                        strokeLinecap="round"
                        fill="none"
                        cx="16.91549431"
                        cy="16.91549431"
                        r="15.91549431"
                />
            </svg>
        );
    };

    const renderTimeRemaining = (seconds) => {
        const time = getParsedTimeRemaining(seconds);

        return (
            <div className="timer__time">
                <div className="timer__time--numbers">
                    {time}
                </div>
                <div className="timer__time--icons">
                    <FontAwesomeIcon icon={props.timer.active ? faPause : faPlay}/>
                </div>
            </div>
        );
    };

    return (
        <section className="Timer">
            <div
                className="timer pointer"
                onClick={() => props.playPauseTimer(timer)}
            >
                {renderCircularProgressbar()}
                {renderTimeRemaining(timer.currentTime)}
            </div>
        </section>
    );
}

const mapStateToProps = state => ({
    settings: state.settings,
    timer: state.timer,
});
const mapDispatchToProps = dispatch => bindActionCreators({
    stopTimer,
    playPauseTimer,
    startTimer,
}, dispatch);

export const unwrapped = Timer;
export default connect(mapStateToProps, mapDispatchToProps)(Timer);
