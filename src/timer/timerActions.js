import actionTypes from "./../actionTypes";

export const startTimer = () => ({
    type: actionTypes.START_TIMER,
});

export const stopTimer = () => ({
    type: actionTypes.STOP_TIMER,
});

export const toggleTimer = () => ({
    type: actionTypes.PAUSE_TIMER,
});
