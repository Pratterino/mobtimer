import actions from "./../actionTypes";
import store from "./../store";

let interval;
const defaultTimerState = {
    active: false,
    sessionLength: 30,
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

    store.dispatch({
        type: actions.NEXT_USER,
    });
};

const stopTimerInterval = () => {
    clearInterval(interval);
    console.info("TIMER: CLEARED INTERVAL")
};

const startTimerInterval = () => {
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
    console.info("TIMER: A SECOND PASSED")
};

export default (state = defaultTimerState, action) => {
    switch (action.type) {
        case actions.SECOND_DECREMENT_TIMER:
            let time = state.currentTime - 1;
            document.title = time;
            return {
                ...state,
                currentTime: time,
            };
        case actions.START_TIMER:
            startTimerInterval();
            return {
                ...state,
                currentTime: state.sessionLength,
                active: true,
            };
        case actions.FINISH_TIMER:
            stopTimerInterval();
            return {
                ...state,
                currentTime: state.sessionLength,
                active: false,
            };
        case actions.STOP_TIMER:
            stopTimerInterval();
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
