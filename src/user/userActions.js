import actionTypes from "./../actionTypes";
import {userImages} from "./userImages";
import _ from "lodash";

export const addUser = (name) => {
    const user = {
        name,
        active: false,
        image: _.sample(userImages),
    };

    return {
        type: actionTypes.ADD_USER,
        user,
    }
};

export const removeUser = (user) => {
    return {
        type: actionTypes.REMOVE_USER,
        user,
    }
};

export const nextUser = () => {
    return {
        type: actionTypes.NEXT_USER,
    }
};

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

export const changeName = (user, name) => {
    return {
        type: actionTypes.CHANGE_USER_NAME,
        user,
        name,
    }
};

export const updateUserOrder = (users) => {
    return {
        type: actionTypes.UPDATE_USER_ORDER,
        users,
    }
};
