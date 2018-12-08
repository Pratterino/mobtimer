import {combineReducers} from 'redux';
import timer from './timer/timerReducer';
import users from './user/userReducer';
import sounds from './sound/soundReducer';

export default combineReducers({
    timer,
    users,
    sounds,
});


