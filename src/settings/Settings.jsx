import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {clearState, updateSessionLengthTime} from "./../settings/settingsActions";
import {resetTimer} from "./../timer/timerActions";
import "./Settings.scss";

class Settings extends Component {
    state = {
        show: false,
    };

    componentDidMount() {
        window.document.body.className = this.props.settings.theme || "";
    }

    handleTimerNumberChange = (e) => {
        this.props.updateSessionLengthTime(e.target.value);
        this.props.resetTimer();
    };

    toggleSettings = () => {
        this.setState({show: !this.state.show});
    };

    render() {
        const {clearState, timer} = this.props;
        return (
            <React.Fragment>
                <div className={`settings ${this.state.show ? 'slideIn' : 'slideOut'}`}>
                    <div className="settings__group">
                        <h3>Application</h3>
                        <a className="button" onClick={clearState}>Reset application</a>
                    </div>

                    <div className="settings__group">
                        <h3>Timer</h3>
                        <label htmlFor="sessionLength">Session length in minutes</label>
                        <input
                            name="sessionLength"
                            type="number"
                            min="1"
                            defaultValue={timer.sessionLength / 60}
                            onChange={this.handleTimerNumberChange}/>
                    </div>

                    <div className="settings__group">
                        <h3>Links</h3>
                        <a href="https://github.com/Pratterino/mobtimer" target="__blank" style={{textTransform: "lowercase"}}>https://github.com/Pratterino/mobtimer</a>
                    </div>
                </div>
                <div className={`settings__hamburger pointer ${this.state.show ? 'change' : ''}`} onClick={this.toggleSettings}>
                    <div className="bar1"/>
                    <div className="bar2"/>
                    <div className="bar3"/>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings,
    timer: state.timer,
});
const mapDispatchToProps = dispatch => bindActionCreators({
    clearState,
    updateSessionLengthTime,
    resetTimer,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
