import actions from "./../actionTypes";
import {userImages} from "./userImages";
import _ from "lodash";

const defaultUserState = {
    users: [{
        image: _.sample(userImages),
        active: false,
        disabled: false,
        name: "Chris",
    }, {
        image: _.sample(userImages),
        active: false,
        disabled: false,
        name: "Pär",
    }],
};

const getNextActiveUserIndex = (users) => {
    const nonDisabledUsers = users.filter(user => !user.disabled);

    const currentlyActiveIndex = _.findLastIndex(nonDisabledUsers, {active: true});
    let nextActiveIndex = currentlyActiveIndex + 1;

    if (nextActiveIndex >= nonDisabledUsers.length) {
        nextActiveIndex = 0;
    }
    return users.findIndex(user => user.name === nonDisabledUsers[nextActiveIndex].name)
};

export default (state = defaultUserState, action) => {
    let users;

    switch (action.type) {
        case actions.ADD_USER:
            users = [...state.users];

            // Username already in state.
            if (users.filter(user => (user.name === action.user.name)).length) {
                return {
                    ...state,
                }
            } else {
                users.push(action.user);
            }
            return {
                users: [...users],
            };

        case actions.REMOVE_USER:
            // TODO: cant remove if active
            return {
                users: [
                    ..._.reject(
                        [...state.users],
                        user => (user.name === action.user.name
                        ))
                ],
            };

        case actions.CHANGE_USER_NAME:
            let updatedUser = [...state.users].map(user => {
                if (user.name === action.user.name) {
                    user.name = action.name;
                }
                return user;
            });

            return {
                users: [...updatedUser],
            };

        case actions.UPDATE_USER_ORDER:
            return {
                users: [...action.users],
            };

        case actions.TOGGLE_USER:
            users = [...state.users].map((user) => {
                if (user.name === action.user.name) {
                    user.disabled = !user.disabled;
                }
                return user;
            });
            return {
                users,
            };

        case actions.NEXT_USER:
            const nextActiveUserIndex = getNextActiveUserIndex(state.users);

            // de-activate all users.
            users = [...state.users].map(user => {
                return {
                    ...user,
                    active: false,
                };
            });

            users[nextActiveUserIndex].active = true;


            return {
                users: [...users],
            };

        default:
            return state;
    }
}

export function usersSelector(state) {
    return state.users.users || defaultUserState;
}
