import actions from "./../actionTypes";

const defaultToasterState = {
    dismissedDate: null,
    releases: [],
};



export default (state = defaultToasterState, action) => {
    switch(action.type) {
        case actions.FETCH_RELEASE_COMMITS_SUCCESS:
            return {
                ...state,
                releases: action.commits,
            };
        case actions.REMOVE_TOASTER:
            return {
                ...state,
                releases: [
                    ...state.releases.filter(release => release.sha !== action.sha),
                ],
            };

        default:
            return state;
    }
}
