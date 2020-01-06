import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { playPauseTimer, startTimer, stopTimer } from './timerActions';
import { TimerCircle } from './../timercircle/TimerCircle';
import './Timer.scss';

function Timer(props) {
    const { timer } = props;
    return (
        <section className="Timer">
            <div className="pointer timer" onClick={() => props.playPauseTimer(timer)}>
                <TimerCircle timer={timer} />
            </div>
        </section>
    );
}

const mapStateToProps = state => ({
    timer: state.timer,
});
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            stopTimer,
            playPauseTimer,
            startTimer,
        },
        dispatch,
    );

export const unwrapped = Timer;
export default connect(mapStateToProps, mapDispatchToProps)(Timer);
