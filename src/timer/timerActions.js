import actionTypes from './../actionTypes';
import { store } from './../store';

export const startTimer = () => ({
    type: actionTypes.START_TIMER,
});

export const playPauseTimer = timer => {
    if (timer.metadata.todaysDate !== new Date().getDate()) {
        store.dispatch({
            type: actionTypes.RESET_TODAYS_SESSION_LENGTH,
        });
    }

    return {
        type: actionTypes.PLAY_PAUSE_TIMER,
    };
};

export const stopTimer = () => ({
    type: actionTypes.STOP_TIMER,
});

export const resetTimer = () => ({
    type: actionTypes.RESET_TIMER,
});
