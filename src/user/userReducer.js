import actions from "./../actionTypes";
import {userImages} from "./userImages";
import _ from "lodash";

const defaultUserState = {
    users: [{
        image: _.sample(userImages),
        active: false,
        name: "Chris",
    }, {
        image: _.sample(userImages),
        active: false,
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
            // TODO: cant remove if active
            const withoutUser = [...state.users];
            return {
                users: [
                    ..._.reject(withoutUser, user => (user.name === action.user.name))
                ],
            };

        case actions.NEXT_USER:
            let activeIndex = _.findLastIndex(state.users, {active: true});
            let nextActiveUserIndex = (activeIndex >= 0 ? activeIndex : -1) + 1;

            if (nextActiveUserIndex > state.users.length - 1) {
                nextActiveUserIndex = 0;
            }

            let _users = [...state.users].map(user => {
                return {
                    ...user,
                    active: false,
                };
            });
            _users[nextActiveUserIndex].active = true;

            return {
                users: [..._users],
            };

        default:
            return state;
    }
}

export function usersSelector(state) {
    return state.users.users || defaultUserState;
}
