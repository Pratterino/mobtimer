import * as firebase from "firebase";
import secret from "./secret/secret";

let db: firebase.database.Database;
let app: firebase.app.App;

function init() {
    if (firebase.apps.length === 0) {
        try {
            app = firebase.initializeApp(secret.FIREBASE_CONFIG);
            //firebase.analytics();
        } catch (e) {
            console.error('Something went wrong connection to firebase.');
        }
    }
}

function updateState(state: any) {
    const sessionId = state.settings.sessionId;
    const { users, timer, settings } = state;
    firebase
        .database()
        .ref(`/sessions/${sessionId}`)
        .set({
            timer,
            users: users.users || users,
            settings,
        })
        .then(() => console.info('state-published'));
}

function subscribeToDbChanges(sessionId: string, callback: Function) {
    firebase
        .database()
        .ref(`/sessions/${sessionId}/users`)
        .on('value', (snapshot: firebase.database.DataSnapshot) => {
            callback(snapshot.val());
            console.log('firebase-users-updated: ', snapshot.val());
        })
}

function unsubscribeToDbChanges(sessionId: string) {
}

export default {
    init,
    updateState,
    subscribeToDbChanges,
    unsubscribeToDbChanges,
};
