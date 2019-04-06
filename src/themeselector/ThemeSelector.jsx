import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ThemeButton from "./../themebutton/ThemeButton";
import "./ThemeSelector.scss";

function ThemeSelector(props) {
    const [tempTheme, setTempTheme] = useState(props.settings.theme);
    const themes = ["ladies-night-theme", "sublime-theme"];

    useEffect(() => {
        window.document.body.className = tempTheme || props.settings.theme;
    }, [props.settings.theme, tempTheme]);

    return (
        <div className="theme-selector">
            {themes.map(theme =>
                <ThemeButton
                    theme={theme}
                    key={theme}
                    setTempTheme={setTempTheme}
                    className="theme-selector__button"
                />
            )}
        </div>
    );
}

const mapStateToProps = state => ({
    settings: state.settings,
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

ThemeSelector.propTypes = {
    setTheme: PropTypes.func.isRequired,
};

export const unwrapped = ThemeSelector;
export default connect(mapStateToProps, mapDispatchToProps)(ThemeSelector);
