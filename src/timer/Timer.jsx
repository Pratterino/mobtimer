import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {playPauseTimer, startTimer, stopTimer} from "./timerActions";
import {getParsedTimeRemaining} from "./../helper/TimerHelper";
import {TimerCircle} from "./../timercircle/TimerCircle";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPause, faPlay} from '@fortawesome/free-solid-svg-icons'
import "./Timer.scss";
import "./TimerCircle.scss";

function Timer(props) {
    const {timer} = props;

    const renderTimeRemaining = (seconds) => {
        const time = getParsedTimeRemaining(seconds);

        return (
            <div className="timer__time">
                <div className="timer__time--numbers">
                    {time}
                </div>
                <div className="timer__time--icons">
                    <FontAwesomeIcon icon={timer.active ? faPause : faPlay}/>
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
                <TimerCircle timer={timer}/>
                {renderTimeRemaining(timer.currentTime)}
            </div>
        </section>
    );
}

const mapStateToProps = state => ({
    timer: state.timer,
});
const mapDispatchToProps = dispatch => bindActionCreators({
    stopTimer,
    playPauseTimer,
    startTimer,
}, dispatch);

export const unwrapped = Timer;
export default connect(mapStateToProps, mapDispatchToProps)(Timer);
