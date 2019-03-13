import _ from "lodash";
import actions from "./../actionTypes";
import {userImages} from "./userImages";
import {changeFavicon} from "./../helper/TimerHelper";

const images = userImages;

const getRandomImageUrl = () => {
    const index = Math.floor(Math.random() * images.length);
    const image = images[index];
    images.splice(index, 1);
    return image;
};

const getARandomImageUrl = (currentImage) => {
    const index = Math.floor(Math.random() * images.length);
    const image = images[index];
    if (image === currentImage) {
        getRandomImageUrl();
    }
    return image;
};

export const defaultUserState = {
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

const getActiveUser = (users) => {
    return users.filter(user => user.active === true)[0];
};

const userExistInState = (users, name) => {
    return !!users.filter(user => (user.name.toLowerCase() === name.toLowerCase())).length
};

export default (state = defaultUserState, action) => {
    let users;

    switch (action.type) {
        case actions.ADD_USER:
            users = [...state.users];

            // Username already in state.
            if (userExistInState(state.users, action.user.name)) {
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
            if (action.user && action.user.active) {
                return {
                    users: [...state.users]
                }
            }
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

        case actions.CHANGE_USER_IMAGE:
            let updatedUserImage = [...state.users].map(user => {
                if (user.name === action.user.name) {
                    user.image = getARandomImageUrl(action.user.image);
                }
                return user;
            });

            return {
                users: [...updatedUserImage],
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
            changeFavicon(users[nextActiveUserIndex].image);

            return {
                users: [...users],
            };

        default:
            return state;
    }
}

export function usersSelector(state) {
    return state.users.users || defaultUserState.users;
}

export function activeUserSelector(state) {
    return getActiveUser(usersSelector(state));
}
