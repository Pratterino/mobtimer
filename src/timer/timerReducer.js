import actions from '../actionTypes';
import { store } from './../store';
import { getParsedTimeRemaining } from '../helper/TimerHelper';
import { activeUserSelector } from './../user/userReducer';
import { speak } from './../helper/Speech';
import { closeNotification, showNotification } from '../NotificationManager';
import FirebaseManager from './../FirebaseManager';

let interval;
let speechTimeout;
let titleToggleInterval;

export const defaultTimerState = {
    active: false,
    sessionLength: 60 * 15,
    currentTime: 0,
    metadata: {
        todaysSessionLength: 0,
        todaysDate: new Date().getDate(),
    },
    leaderboard: {},
};

const timerIsDone = () => {
    // ALARM
    store.dispatch({
        type: actions.PLAY_FINISH_SOUND,
    });

    store.dispatch({
        type: actions.FINISH_TIMER,
    });

    // todo: thunk it =>
    store.dispatch({
        type: actions.NEXT_USER,
    });

    showNextUserNotification();
};

const showNextUserNotification = () => {
    const upNextUser = activeUserSelector(store.getState());
    showNotification(upNextUser);
    console.info('NOTIFICATION: ', upNextUser);
};

const stopTimerInterval = () => {
    clearInterval(interval);
    console.info('TIMER: CLEARED INTERVAL');
    return () => store.dispatch(updateState);
};

const updateState = (dispatch, getState) => {
    return FirebaseManager.updateState(getState());
};

const startTimerInterval = () => {
    clearTimeout(speechTimeout);
    clearInterval(titleToggleInterval);

    interval = setInterval(() => {
        let state = store.getState();
        if (state.timer.currentTime <= 0) {
            timerIsDone();
            store.dispatch({
                type: actions.RESET_TIMER,
            });
            return;
        }
        store.dispatch({
            type: actions.SECOND_DECREMENT_TIMER,
            user: activeUserSelector(state),
        });

        store.dispatch(updateState);
    }, 1000);
    console.info('TIMER: MOB SESSION STARTED!');
    closeNotification();
};

const timeoutToSpeech = (i = 0) => {
    if (i >= 3) {
        speak(`${i} minutes! I give up. I'll stop talking to you. Good bye, asshole`);
        showNextUserNotification();
        return clearTimeout(speechTimeout);
    } else {
        speechTimeout = setTimeout(() => {
            const state = store.getState();
            const activeUser = activeUserSelector(state);

            showNextUserNotification();
            speak(
                `It's ${activeUser.name}'s time! You've been idle for an entire ${
                    i >= 1 ? `${i + 1} minutes!` : 'minute!'
                }`,
            );
            return timeoutToSpeech(i + 1);
        }, 60 * 1000);
    }
    console.info(`TIMER: SPEECH COUNTDOWN 60s, iteration ${i + 1}`);
};

const toggleTitleOnFinish = () => {
    let interval = 0;
    titleToggleInterval = setInterval(() => {
        const state = store.getState();
        const activeUser = activeUserSelector(state);

        document.title = interval % 2 ? '⏰⏰⏰' : `${activeUser.name.toUpperCase()}`;
        interval++;
    }, 1000);
};

export default (state = defaultTimerState, action) => {
    switch (action.type) {
        case actions.SECOND_DECREMENT_TIMER:
            const seconds = state.currentTime - 1;
            document.title = `${getParsedTimeRemaining(seconds)}`; //TODO: useEffect()
            const leaderboardCurrentUserSeconds = state.leaderboard[action.user.name] || 0;
            return {
                ...state,
                currentTime: seconds,
                metadata: {
                    ...state.metadata,
                    todaysSessionLength: state.metadata.todaysSessionLength + 1,
                },
                leaderboard: {
                    ...state.leaderboard,
                    [action.user.name]: leaderboardCurrentUserSeconds + 1,
                },
            };

        case actions.RESET_TODAYS_SESSION_LENGTH:
            return {
                ...state,
                metadata: {
                    ...state.metadata,
                    todaysSessionLength: 0,
                },
                leaderboard: defaultTimerState.leaderboard,
            };

        case actions.START_TIMER:
            startTimerInterval();
            clearTimeout(speechTimeout);
            return {
                ...state,
                currentTime: state.sessionLength,
                active: true,
                metadata: {
                    ...state.metadata,
                    todaysDate: new Date().getDate(),
                },
            };

        case actions.FINISH_TIMER:
            // when a single timer cycle has completed
            stopTimerInterval();
            toggleTitleOnFinish();
            timeoutToSpeech();
            return {
                ...state,
                currentTime: state.sessionLength,
                active: false,
            };

        case actions.STOP_TIMER:
            stopTimerInterval();
            clearTimeout(speechTimeout);
            return {
                ...state,
                active: false,
            };

        case actions.PLAY_PAUSE_TIMER:
            if (state.currentTime === null) {
                // first time playing
            }
            if (state.active) {
                stopTimerInterval();
            } else {
                startTimerInterval();
            }

            clearTimeout(speechTimeout);

            return {
                ...state,
                currentTime: state.currentTime || state.sessionLength,
                active: !state.active,
                metadata: {
                    ...state.metadata,
                    todaysDate: new Date().getDate(),
                },
            };

        case actions.RESET_TIMER:
            stopTimerInterval();
            return {
                ...state,
                currentTime: state.sessionLength,
                active: false,
            };

        case actions.UPDATE_SESSION_LENGTH:
            stopTimerInterval();
            clearTimeout(speechTimeout);

            return {
                ...state,
                sessionLength: action.sessionLength,
            };

        default:
            return state;
    }
};
