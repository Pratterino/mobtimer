import actions from './../actionTypes';

const defaultSettingsState = {
    theme: 'ladies-night-theme',
    devMode: window.location.hostname === 'localhost',
};

export default (state = defaultSettingsState, action) => {
    switch (action.type) {
        case actions.CLEAR_STATE:
            localStorage.clear();
            window.location.reload();
            break;

        case actions.SET_THEME:
            let theme = action.theme;

            document.body.classList.toggle(theme);
            return {
                ...state,
                theme: theme,
            };

        default:
            return state;
    }
}


