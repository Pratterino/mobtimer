enum actions {
    // timer
    SECOND_DECREMENT_TIMER = 'SECOND_DECREMENT_TIMER',
    INCREMENT_TODAYS_SESSION_LENGTH = 'INCREMENT_TODAYS_SESSION_LENGTH',
    RESET_TODAYS_SESSION_LENGTH = 'RESET_TODAYS_SESSION_LENGTH',
    START_TIMER = 'START_TIMER',
    PLAY_PAUSE_TIMER = 'PLAY_PAUSE_TIMER',
    STOP_TIMER = 'STOP_TIMER',
    FINISH_TIMER = 'FINISH_TIMER',
    RESET_TIMER = 'RESET_TIMER',

    // user
    ADD_USER = 'ADD_USER',
    REMOVE_USER = 'REMOVE_USER',
    NEXT_USER = 'NEXT_USER',
    TOGGLE_USER = 'TOGGLE_USER',
    NOT_ALLOWED = 'NOT_ALLOWED',
    CHANGE_USER_IMAGE = 'CHANGE_USER_IMAGE',
    CHANGE_USER_NAME = 'CHANGE_USER_NAME',
    UPDATE_USER_ORDER = 'UPDATE_USER_ORDER',

    // sound
    PLAY_FINISH_SOUND = 'PLAY_FINISH_SOUND',
    ASSIGN_FINISH_SOUND = 'ASSIGN_FINISH_SOUND',

    // settings
    SET_THEME = 'SET_THEME',
    SET_UNSPLASHED_BACKGROUND_IMAGE = 'SET_UNSPLASHED_BACKGROUND_IMAGE',
    CLEAR_STATE = 'CLEAR_STATE',
    UPDATE_SESSION_LENGTH = 'UPDATE_SESSION_LENGTH',
}

export default actions;
