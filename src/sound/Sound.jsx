import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { playFinishedSound } from './soundActions';

class Sound extends Component {
    render() {
        const { timer } = this.props;
        return (
            <div>
                {timer.active ? (
                    <button onClick={this.props.stopTimer}>Pause timer</button>
                ) : (
                    <button onClick={this.props.startTimer}>Start timer</button>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    sound: state.sound,
});
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            playFinishedSound,
        },
        dispatch,
    );

export default connect(mapStateToProps, mapDispatchToProps)(Sound);
