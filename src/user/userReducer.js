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
            const newUsers = [...state.users];

            // Username already in state.
            if (newUsers.filter(user => (user.name === action.user.name)).length) {
                return {
                    ...state,
                }
            } else {
                newUsers.push(action.user);
            }
            return {
                users: [...newUsers],
            };
        default:
            return state;
    }
}

export function usersSelector(state) {
    return state.users.users || defaultUserState;
}
