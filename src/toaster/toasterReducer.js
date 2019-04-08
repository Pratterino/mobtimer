import actions from "./../actionTypes";
import moment from "moment";

export const numberOfMonthsToasterLives = 1;
export const aMonthAgo = moment().subtract(numberOfMonthsToasterLives, 'months');

const defaultToasterState = {
    dismissedDate: aMonthAgo.toISOString(),
    releases: [],
};

export default (state = defaultToasterState, action) => {
    switch (action.type) {
        case actions.FETCH_RELEASE_COMMITS_SUCCESS:
            return {
                ...state,
                releases: [
                    ...action.commits
                        .filter(commit => {
                            return (
                                moment(commit.date).isAfter(moment(state.dismissedDate)) &&
                                (moment.duration(moment(commit.date).diff(aMonthAgo)).asMonths() / numberOfMonthsToasterLives) > 0
                            );
                        })
                ],
            };
        case actions.REMOVE_TOASTER:
            return {
                ...state,
                dismissedDate: moment(action.date).toISOString(),
                releases: [
                    ...state.releases.filter(release => release.sha !== action.sha),
                ],
            };

        default:
            return state;
    }
}
