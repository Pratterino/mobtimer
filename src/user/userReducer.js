import actions from "./../actionTypes";

const defaultUserState = {
    users: [],
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
