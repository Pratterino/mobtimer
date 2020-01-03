import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setTheme } from './../settings/settingsActions';
import './ThemeButton.scss';

function ThemeButton(props) {
    return (
        <div className="theme-button">
            <button
                key={props.theme}
                className="theme-button__button"
                onMouseLeave={() => props.setTempTheme(null)}
                onMouseOver={() => props.setTempTheme(props.theme)}
                onClick={() => props.setTheme(props.theme)}>
                {props.theme}
            </button>
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

ThemeButton.propTypes = {
    setTheme: PropTypes.func.isRequired,
    setTempTheme: PropTypes.func.isRequired,
};

export const unwrapped = ThemeButton;
export default connect(mapStateToProps, mapDispatchToProps)(ThemeButton);
