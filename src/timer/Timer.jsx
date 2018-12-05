import React, {Component} from 'react';
import {connect} from "react-redux";
import {toggleTimer} from "./timerActions"
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
        return (
            <div>
                <h1>{this.props.minutes}:{this.props.seconds}</h1>
                <button onClick={this.props.toggleTimer}>Pause timer</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => bindActionCreators({
    toggleTimer,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Timer);
