import actionTypes from '../actionTypes';

export const clearState = () => ({
    type: actionTypes.CLEAR_STATE,
});

export const setTheme = (theme: string) => ({
    type: actionTypes.SET_THEME,
    theme,
});

interface Unsplash {
    userLink: string;
    username: string;
    unsplashedLink: string;
    image: string;
    imageSmall: string;
}
export const setBackgroundImage = (backgroundImage: Unsplash) => ({
    type: actionTypes.SET_UNSPLASHED_BACKGROUND_IMAGE,
    backgroundImage,
});

export const updateSessionLengthTime = (sessionLengthMinutes: number) => ({
    type: actionTypes.UPDATE_SESSION_LENGTH,
    sessionLength: +sessionLengthMinutes * 60,
});
