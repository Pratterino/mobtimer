import actionTypes from '../actionTypes';
import { store } from './../store';
import FirebaseManager from '../FirebaseManager';

export const startTimer = () => {
    store.dispatch({
        type: actionTypes.START_TIMER,
    });

    return (dispatch, getState) => {
        FirebaseManager.updateState(getState());
    };
};

export const playPauseTimer = timer => {
    if (timer.metadata.todaysDate !== new Date().getDate()) {
        store.dispatch({
            type: actionTypes.RESET_TODAYS_SESSION_LENGTH,
        });
    }

    store.dispatch({
        type: actionTypes.PLAY_PAUSE_TIMER,
    });

    return (dispatch, getState) => {
        FirebaseManager.updateState(getState());
    };
};

export const stopTimer = () => {
    store.dispatch({
        type: actionTypes.STOP_TIMER,
    });
    return (dispatch, getState) => {
        FirebaseManager.updateState(getState());
    };
};

export const resetTimer = () => {
    store.dispatch({
        type: actionTypes.RESET_TIMER,
    });
    return (dispatch, getState) => {
        FirebaseManager.updateState(getState());
    };
};
