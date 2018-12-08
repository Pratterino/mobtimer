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
    return {
        type: actionTypes.TOGGLE_USER,
        user,
    }
};
