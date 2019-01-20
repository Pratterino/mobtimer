import actionTypes from "./../actionTypes";

export const clearState = () => ({
    type: actionTypes.CLEAR_STATE,
});

export const updateSessionLengthTime = (sessionLengthMinutes) => ({
    type: actionTypes.UPDATE_SESSION_LENGTH,
    sessionLength: +sessionLengthMinutes * 60,
});
