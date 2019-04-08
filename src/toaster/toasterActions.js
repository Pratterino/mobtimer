import actionTypes from "./../actionTypes";
import moment from "moment";

function mapToToasterMessage(commit) {
    return {
        date: moment(commit.commit.committer.date).toISOString(),
        message: commit.commit.message,
        sha: commit.sha,
    };
}

async function fetchReleaseIdsFromGithub() {
    const releases = await fetch("https://api.github.com/repos/pratterino/mobtimer/tags");
    let tags = await releases.json().then(tag => tag);
    return tags.map(tag => tag.commit.sha);
}

async function fetchReleaseCommitsFromGithub() {
    const idsFromGithub = await fetchReleaseIdsFromGithub();
    const commitsRequest = await fetch("https://api.github.com/repos/Pratterino/mobtimer/commits");
    const commits = await commitsRequest.json().then(data => data);
    const filteredCommits = commits.filter(commit => idsFromGithub.includes(commit.sha));
    return filteredCommits
        .map(mapToToasterMessage)
        .sort((a, b) => a.date > b.date);
}

export const fetchReleaseCommits = () => (dispatch) =>{
    fetchReleaseCommitsFromGithub()
        .then(commits =>
            dispatch(releaseCommitsFetchSuccess(commits)));
};

export const removeToaster = (commit) => ({
    type: actionTypes.REMOVE_TOASTER,
    date: commit.date,
    sha: commit.sha,
});

const releaseCommitsFetchSuccess = (commits) => ({
    type: actionTypes.FETCH_RELEASE_COMMITS_SUCCESS,
    commits,
});
