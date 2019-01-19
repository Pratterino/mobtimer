import actions from "./../actionTypes";
import {store} from "./../store";

const defaultSettingsState = {
    theme: "ladies-night",
};

export default (state = defaultSettingsState, action) => {
    switch (action.type) {
        case actions.CLEAR_STATE:
            localStorage.clear();
            window.location.reload();
            break;
        default:
            return state;
    }
}


