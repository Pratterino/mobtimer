import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ThemeSelector from "./../themeselector/ThemeSelector";
import {clearState, updateSessionLengthTime} from "./../settings/settingsActions";
import {resetTimer} from "./../timer/timerActions";
import {faBeer, faDonate, faHeart} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
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

    const toggleSettings = () => {
        setIsOpen(!isOpen);
    };

    const {clearState, timer, settings} = props;
    return (
        <React.Fragment>
            <div className={`settings ${isOpen ? 'slideIn' : 'slideOut'}`}>
                <div className="settings__group">
                    <h3>Application</h3>
                    <li>
                        <a className="button" onClick={clearState}>Reset application state</a>
                    </li>
                    <li>
                    <a href="https://github.com/Pratterino/mobtimer"
                       target="__blank">https://github.com/Pratterino/mobtimer</a>
                    </li>
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
                    <h3>Help</h3>

                    <a href="https://paypal.me/pratterino" target="__blank">
                        Donate a beer <FontAwesomeIcon icon={faDonate}/> => <FontAwesomeIcon icon={faBeer}/>
                    </a>
                    <p>
                        If you enjoy this mob timer and want to support it.<br/>
                        A small donation would be really really appreciated!<br/>
                    </p>
                    <FontAwesomeIcon icon={faHeart}/> <FontAwesomeIcon icon={faHeart}/> <FontAwesomeIcon icon={faHeart}/>
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
