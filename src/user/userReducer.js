import actions from "./../actionTypes";
import {userImages} from "./userImages";
import _ from "lodash";

const images = userImages;

const getRandomImageUrl = () => {
    const index = Math.floor(Math.random() * images.length);
    const image = images[index];
    images.splice(index, 1);
    return image;
};

const defaultUserState = {
    users: [
        {
            image: getRandomImageUrl(),
            active: true,
            disabled: false,
            name: "Jane Doe",
        }
    ],
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

export const getActiveUser = (users) => {
    return users.filter(user => user.active === true)[0];
};

export default (state = defaultUserState, action) => {
    let users;

    switch (action.type) {
        case actions.ADD_USER:
            users = [...state.users];

            // Username already in state.
            if (users.filter(user => (user.name.toLowerCase() === action.user.name.toLowerCase())).length) {
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
            console.info(state);


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
