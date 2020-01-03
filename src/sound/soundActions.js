import actionTypes from './../actionTypes';

export const playFinishedSound = () => ({
    type: actionTypes.PLAY_FINISH_SOUND,
});

export const setFinishedSound = (filename) => ({
    type: actionTypes.ASSIGN_FINISH_SOUND,
    filename,
});
