import actionTypes from "./../actionTypes";
import {userImages} from "./userImages";
import _ from "lodash";

export const addUser = (name) => {
    if (!name || !name.length) {
        return {
            type: actionTypes.NOT_ALLOWED,
        }
    }

    return ({
        type: actionTypes.ADD_USER,
        user: {
            name,
            active: false,
            image: _.sample(userImages),
        },
    });
};

export const removeUser = (user) => ({
    type: actionTypes.REMOVE_USER,
    user,
});

export const nextUser = () => ({
    type: actionTypes.NEXT_USER,
});

export const toggleUser = (user) => {
    if (user.active) {
        return {
            type: actionTypes.NOT_ALLOWED,
        }
    }
    return {
        type: actionTypes.TOGGLE_USER,
        user,
    }
};

export const changeName = (user, name = "") => {
    if (!name || !name.length) {
        return {
            type: actionTypes.NOT_ALLOWED,
        }
    }
    return ({
        type: actionTypes.CHANGE_USER_NAME,
        user,
        name,
    });
};

export const updateUserOrder = (users) => ({
    type: actionTypes.UPDATE_USER_ORDER,
    users,
});
