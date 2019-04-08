import {combineReducers} from 'redux';
import timer from './timer/timerReducer';
import settings from './settings/settingsReducer';
import users from './user/userReducer';
import sounds from './sound/soundReducer';
import toasters from './toaster/toasterReducer';

export default combineReducers({
    settings,
    timer,
    users,
    sounds,
    toasters,
});
