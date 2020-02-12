import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ThemeSelector from './../themeselector/ThemeSelector';
import { clearState, updateSessionLengthTime } from './settingsActions';
import { faBeer, faDonate, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { resetTimer } from './../timer/timerActions';
import { geoCountryCodeOfUser } from '../DonationHelper';
import './Settings.scss';

const swishQrImage = require('./../assets/payment/swish.svg');

function Settings({ settings, timer, updateSessionLengthTime, resetTimer, clearState }) {
    const [isOpen, setIsOpen] = useState(false);
    const [userCountry, setUserCountry] = useState();

    useEffect(() => {
        window.document.body.className = settings.theme || '';
        geoCountryCodeOfUser().then(country => setUserCountry(country));
    }, [settings.theme]);

    const handleTimerNumberChange = e => {
        updateSessionLengthTime(e.target.value);
        resetTimer();
    };

    const toggleSettings = () => {
        setIsOpen(!isOpen);
    };

    return (
        <React.Fragment>
            <div className={`settings ${isOpen ? 'slideIn' : 'slideOut'}`}>
                <div className="settings__group">
                    <h3>Application</h3>
                    <li>
                        <button className="button" onClick={clearState}>
                            Reset application state
                        </button>
                    </li>
                    <li>
                        <a href="https://github.com/Pratterino/mobtimer" target="__blank">
                            https://github.com/Pratterino/mobtimer
                        </a>
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
                        onChange={handleTimerNumberChange}
                    />
                </div>

                <div className="settings__group">
                    <h3>Theme</h3>
                    <p className="settings__group-subtitle">(Current: {settings.theme})</p>
                    <ThemeSelector />
                </div>

                <div className="settings__group">
                    <h3>Help</h3>
                    <div>
                        <a href="https://paypal.me/pratterino" target="__blank">
                            Donate a beer <FontAwesomeIcon icon={faDonate} /> => <FontAwesomeIcon icon={faBeer} />
                        </a>
                    </div>
                    {userCountry === 'SE' && [
                        <br />,
                        'Or donate via Swish',
                        <div className="half">
                            <img src={swishQrImage} alt="Swish QR code for donations" />
                        </div>,
                    ]}
                    <p>
                        If you enjoy this mobtimer and want to keep it alive!
                        <br />
                        Even the smallest of donations is really really appreciated!
                        <br />
                    </p>
                    <FontAwesomeIcon icon={faHeart} /> <FontAwesomeIcon icon={faHeart} />
                </div>
            </div>

            <div className={`settings__hamburger pointer ${isOpen ? 'change' : ''}`} onClick={toggleSettings}>
                <div className="bar1" />
                <div className="bar2" />
                <div className="bar3" />
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = state => ({
    settings: state.settings,
    timer: state.timer,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            clearState,
            updateSessionLengthTime,
            resetTimer,
        },
        dispatch,
    );
};

Settings.propTypes = {
    timer: PropTypes.object,
    settings: PropTypes.object,
};

export const unwrapped = Settings;
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
