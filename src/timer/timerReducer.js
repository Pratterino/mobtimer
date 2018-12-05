import actions from "./../actionTypes";
import store from "./../store";

let interval;
const defaultTimerState = {
    active: false,
    time: 60,
};

const startTimerInterval = () => {
    interval = setInterval(() => {
        store.dispatch({
            type: actions.SECOND_INCREMENT_TIMER,
        });
    }, 1000);
    console.info("TIMER: A SECOND PASSED")
};

const stopTimerInterval = () => {
    clearInterval(interval);
    console.info("TIMER: CLEARED INTERVAL")
};

export default (state = defaultTimerState, action) => {
    switch (action.type) {
        case actions.SECOND_INCREMENT_TIMER:
            let time = state.time - 1;
            document.title = time;
            return {
                ...state,
                time,
            };
        case actions.START_TIMER:
            startTimerInterval();
            return {
                ...state,
                active: true,
            };
        case actions.STOP_TIMER:
            stopTimerInterval();
            return {
                ...state,
                active: false,
            };
        case actions.PAUSE_TIMER:
            state.active ? stopTimerInterval() : startTimerInterval();
            let active = !state.active;
            return {
                ...state,
                active: active,
            };
        default:
            return state
    }
}
