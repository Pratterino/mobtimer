import actions from "./../actionTypes";
import {userImages} from "./userImages";
import _ from "lodash";

const defaultUserState = {
    users: [{
        image: _.sample(userImages),
        name: "Sten",
    }, {
        image: _.sample(userImages),
        name: "Pär",
    }],
};

export default (state = defaultUserState, action) => {
    switch (action.type) {
        case actions.ADD_USER:
            const withNewUser = [...state.users];

            // Username already in state.
            if (withNewUser.filter(user => (user.name === action.user.name)).length) {
                return {
                    ...state,
                }
            } else {
                withNewUser.push(action.user);
            }
            return {
                users: [...withNewUser],
            };
        case actions.REMOVE_USER:
            const withoutUser = [...state.users];
            return {
                users: [..._.reject(withoutUser, user => (user.name === action.user.name))],
            };

        default:
            return state;
    }
}

export function usersSelector(state) {
    return state.users.users || defaultUserState;
}
