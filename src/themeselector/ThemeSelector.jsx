import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setTheme } from '../settings/settingsActions';
import ThemeButton from './../themebutton/ThemeButton';
import './ThemeSelector.scss';

function ThemeSelector({ settings, setTheme }) {
    const [tempTheme, setTempTheme] = useState(settings.theme);
    const themes = ['ladies-night-theme', 'sublime-theme'];

    useEffect(() => {
        window.document.body.className = tempTheme || settings.theme;
    }, [settings.theme, tempTheme]);

    return (
        <div className="theme-selector">
            {themes.map(theme => (
                <ThemeButton
                    theme={theme}
                    key={theme}
                    setTempTheme={(theme) => setTempTheme(theme)}
                    setTheme={(theme) => setTheme(theme)}
                    className="theme-selector__button"
                />
            ))}
        </div>
    );
}

const mapStateToProps = state => ({
    settings: state.settings,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            setTheme,
        },
        dispatch,
    );

ThemeSelector.propTypes = {
    settings: PropTypes.object,
    setTheme: PropTypes.func,
};

export const unwrapped = ThemeSelector;
export default connect(mapStateToProps, mapDispatchToProps)(ThemeSelector);
