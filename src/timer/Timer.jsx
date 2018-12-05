import React, {Component} from 'react';
import {connect} from "react-redux";
import {startTimer, toggleTimer} from "./timerActions"
import {bindActionCreators} from "redux";

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minutes: 10,
            seconds: 0,
        };
    }

    render() {
        const {timer} = this.props;
        return (
            <div>
                <h1>{this.props.minutes}:{this.props.seconds}</h1>
                {timer.active ?
                    <button onClick={this.props.toggleTimer}>Pause timer</button> :
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
    toggleTimer,
    startTimer,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Timer);
