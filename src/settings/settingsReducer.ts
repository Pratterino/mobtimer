import actions from '../actionTypes';
import { fallbackImage } from '../unsplashedActions';
import { uniqueId } from '../helper/Utils';

const defaultSettingsState = {
    sessionId: uniqueId(),
    theme: 'ladies-night-theme',
    devMode: window.location.hostname === 'localhost',
    unsplashed: fallbackImage(),
};

export default (state = defaultSettingsState, action: any) => {
    switch (action.type) {
        case actions.CLEAR_STATE:
            localStorage.clear();
            window.location.reload();
            return defaultSettingsState;

        case actions.SET_THEME:
            document.body.classList.toggle(action.theme);
            return {
                ...state,
                theme: action.theme,
            };
        case actions.SET_UNSPLASHED_BACKGROUND_IMAGE:
            return {
                ...state,
                unsplashed: action.unsplashed,
            };

        default:
            return state;
    }
};
