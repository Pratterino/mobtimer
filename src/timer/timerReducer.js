import actions from "./../actionTypes";
import {store} from "./../store";
import {getParsedTimeRemaining} from "./../helper/TimerHelper";
import {getActiveUser} from "./../user/userReducer";
import {speak} from "./../helper/Speech";
import {showNotification, closeNotification} from "./../NotificationManager";

let interval;
let speechTimeout;
let titleToggleInterval;

const defaultTimerState = {
    active: false,
    sessionLength: 60 * 15,
    currentTime: null,
};

const timerIsDone = () => {
    // ALARM
    store.dispatch({
        type: actions.PLAY_FINISHED_SOUND,
    });

    store.dispatch({
        type: actions.FINISH_TIMER,
    });

    // todo: thunk it =>
    store.dispatch({
        type: actions.NEXT_USER,
    });

    const users = store.getState().users.users;
    const upNextUser = getActiveUser(users);
    showNotification(upNextUser);
};

const stopTimerInterval = () => {
    clearInterval(interval);
    console.info("TIMER: CLEARED INTERVAL")
};

const startTimerInterval = () => {
    clearTimeout(speechTimeout);
    clearInterval(titleToggleInterval);

    interval = setInterval(() => {
        if (store.getState().timer.currentTime <= 0) {
            timerIsDone();
            store.dispatch({
                type: actions.RESET_TIMER,
            });
            return;
        }
        store.dispatch({
            type: actions.SECOND_DECREMENT_TIMER,
        });
    }, 1000);
    console.info("TIMER: MOB SESSION STARTED!");
    closeNotification();
};

const timeoutToSpeech = (i = 0) => {
    if (i >= 3) {
        speak(`${i} minutes! I give up. I'll stop talking to you. Good bye, asshole`);
        return clearTimeout(speechTimeout);
    } else {
        speechTimeout = setTimeout(() => {
            const users = store.getState().users.users;
            const activeUser = getActiveUser(users);
            speak(`It's ${activeUser.name}'s time! You've been idle for an entire ${i >= 1 ? `${i + 1} minutes!` : "minute!"}`);
            console.info("TIMER: SPEECH!");
            return timeoutToSpeech(i + 1);
        }, 60 * 1000);
    }
    console.info(`TIMER: SPEECH COUNTDOWN 60s, iteration ${i + 1}`);
};

const toggleTitleOnFinish = () => {
    let interval = 0;
    titleToggleInterval = setInterval(() => {
        const users = store.getState().users.users;
        const activeUser = getActiveUser(users);

        document.title = (interval % 2) ? "⏰⏰⏰" : `${activeUser.name.toUpperCase()}`;
        console.info(`TIMER: title iteration ${interval}`);
        interval++;
    }, 1000);
    console.info(`TIMER: TITLE CHANGE!`)
};

export default (state = defaultTimerState, action) => {
    switch (action.type) {
        case actions.SECOND_DECREMENT_TIMER:
            let seconds = state.currentTime - 1;
            document.title = `${getParsedTimeRemaining(seconds)}`;
            return {
                ...state,
                currentTime: seconds,
            };
        case actions.START_TIMER:
            startTimerInterval();
            clearTimeout(speechTimeout);
            return {
                ...state,
                currentTime: state.sessionLength,
                active: true,
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
        case actions.PAUSE_TIMER:
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
            };
        case actions.RESET_TIMER:
            stopTimerInterval();
            return {
                ...state,
                currentTime: state.sessionLength,
                active: false,
            };
        default:
            return state;
    }
}
