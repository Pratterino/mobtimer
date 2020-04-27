import { sample } from 'lodash';
import actionTypes from '../actionTypes';
import { userImages } from './userImages';
import { store } from './../store';
import FirebaseManager from '../FirebaseManager';
import { uniqueId } from './../helper/Utils';

export const addUser = name => {
    if (!name || !name.length) {
        return {
            type: actionTypes.NOT_ALLOWED,
        };
    }

    store.dispatch({
        type: actionTypes.ADD_USER,
        user: {
            id: uniqueId(),
            name,
            active: false,
            image: sample(userImages),
        },
    });

    return (dispatch, getState) => {
        FirebaseManager.updateState(getState());
    };
};

export const removeUser = user => {
    store.dispatch({
        type: actionTypes.REMOVE_USER,
        user,
    });

    return (dispatch, getState) => {
        FirebaseManager.updateState(getState());
    };
};

export const nextUser = () => {
    store.dispatch({
        type: actionTypes.NEXT_USER,
    });
    return (dispatch, getState) => {
        FirebaseManager.updateState(getState());
    };
};

export const toggleUser = user => {
    if (user.active) {
        return {
            type: actionTypes.NOT_ALLOWED,
        };
    }
    store.dispatch({
        type: actionTypes.TOGGLE_USER,
        user,
    });

    return (dispatch, getState) => {
        FirebaseManager.updateState(getState());
    };
};

export const changeUserImage = user => {
    if (!user) {
        return {
            type: actionTypes.NOT_ALLOWED,
        };
    }
    return {
        type: actionTypes.CHANGE_USER_IMAGE,
        user,
    };
};

export const changeName = (user, name = '') => {
    if (!name || !name.length) {
        return {
            type: actionTypes.NOT_ALLOWED,
        };
    }
    store.dispatch({
        type: actionTypes.CHANGE_USER_NAME,
        user,
        name,
    });

    return (dispatch, getState) => {
        FirebaseManager.updateState(getState());
    };
};

export const updateUserOrder = users => {
    store.dispatch({
        type: actionTypes.UPDATE_USER_ORDER,
        users,
    });

    return (dispatch, getState) => {
        FirebaseManager.updateState(getState());
    };
};

export const updateUsersFromFirebase = users => {
    if (users) {
        store.dispatch({
            type: actionTypes.UPDATE_USERS_FROM_FIREBASE,
            users,
        });
    }

    return (dispatch, getState) => {
        // FirebaseManager.updateState(getState());
    };
};
