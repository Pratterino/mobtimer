import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setTheme } from './../settings/settingsActions';
import './ThemeButton.scss';

function ThemeButton({ theme, setTempTheme, setTheme }) {
    return (
        <div className="theme-button">
            <button
                key={theme}
                className="theme-button__button"
                onMouseLeave={() => setTempTheme(null)}
                onMouseOver={() => setTempTheme(theme)}
                onClick={() => setTheme(theme)}>
                {theme}
            </button>
        </div>
    );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            setTheme,
        },
        dispatch,
    );

ThemeButton.propTypes = {
    theme: PropTypes.string.isRequired,
    setTheme: PropTypes.func.isRequired,
    setTempTheme: PropTypes.func.isRequired,
};

export const unwrapped = ThemeButton;
export default connect(mapStateToProps, mapDispatchToProps)(ThemeButton);
