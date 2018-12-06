import {combineReducers} from 'redux';
import timer from './timer/timerReducer';
import users from './user/userReducer';

export default combineReducers({
    timer,
    users,
});


