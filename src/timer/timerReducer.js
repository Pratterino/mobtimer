import actions from "./../actionTypes";
import store from "./../store";

let interval;
const defaultTimerState = {
    active: false,
    time: 10,
};

const startTimerInterval = () => {
    interval = setInterval(() => {
        if (store.getState().timer.time <= 0) {
            store.dispatch({
                type: actions.RESET_TIMER,
            });
            // TODO: NEXT USER / ALARM
            //store.dispatch({
            //    type: actions.NEXT_USER,
            //});
        }
        store.dispatch({
            type: actions.SECOND_DECREMENT_TIMER,
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
        case actions.SECOND_DECREMENT_TIMER:
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
        case actions.RESET_TIMER:
            stopTimerInterval();
            return {
                ...state,
                time: defaultTimerState.time + 1,
                active: false,
            };
        default:
            return state
    }
}
