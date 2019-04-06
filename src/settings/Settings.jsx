import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ThemeSelector from "./../themeselector/ThemeSelector";
import {clearState, updateSessionLengthTime} from "./../settings/settingsActions";
import {resetTimer} from "./../timer/timerActions";
import "./Settings.scss";

function Settings(props) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        window.document.body.className = props.settings.theme || "";
    }, [props.settings.theme]);

    const handleTimerNumberChange = (e) => {
        props.updateSessionLengthTime(e.target.value);
        props.resetTimer();
    };

    const setTheme = (theme) => {
        props.setTheme(theme);
    };

    const toggleSettings = () => {
        setIsOpen(!isOpen);
    };

    const {clearState, timer, settings} = props;
    return (
        <React.Fragment>
            <div className={`settings ${isOpen ? 'slideIn' : 'slideOut'}`}>
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
                        onChange={handleTimerNumberChange}/>
                </div>

                <div className="settings__group">
                    <h3>Theme</h3>
                    <p className="settings__group-subtitle">(Current: {props.settings.theme})</p>
                    <ThemeSelector/>
                </div>

                <div className="settings__group">
                    <h3>Links</h3>
                    <a href="https://github.com/Pratterino/mobtimer" target="__blank"
                       style={{textTransform: "lowercase"}}>https://github.com/Pratterino/mobtimer</a>
                </div>
            </div>

            <div className={`settings__hamburger pointer ${isOpen ? 'change' : ''}`}
                 onClick={toggleSettings}>
                <div className="bar1"/>
                <div className="bar2"/>
                <div className="bar3"/>
            </div>
        </React.Fragment>
    );
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

Settings.propTypes = {
    timer: PropTypes.object.isRequired,
};

export const unwrapped = Settings;
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
