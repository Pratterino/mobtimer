import React, {useEffect, useState} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import Timer from './timer/Timer';
import {usersSelector} from "./user/userReducer";
import Users from "./user/Users";
import Notifications from "./notifications/Notifications";
import Settings from "./settings/Settings";
import {getParsedTimeRemaining} from "./helper/TimerHelper";
import SoundSelector from "./sound/SoundSelector";
import {fetchBackgroundImage} from "./unsplashedActions";
import './App.scss';

function App(props) {
    const background = document.querySelector("#bg-image");
    const [unsplash, setUnsplash] = useState({});

    useEffect(() => {
        fetchBackgroundImage().then(unsplashed => setUnsplash(unsplashed));
    }, []);

    useEffect(() => {
        if (unsplash.image === 'https://images.unsplash.com/photo-1528920304568-7aa06b3dda8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80') {
            return;
        }

        background.style.backgroundImage = `url(${unsplash.image})`;
    }, [unsplash]);

    const renderLeaderboard = () => {
        const {leaderboard} = props.timer;
        let sortedLeaderboard = sortProperties(leaderboard);
        return (
            <ol>
                {sortedLeaderboard.map((item, i) => (
                    <li>{item[0]} ({getParsedTimeRemaining(item[1])})</li>
                ))}
            </ol>
        );
    };

    const sortProperties = (obj) => {
        const sortable = [];
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                sortable.push([key, obj[key]]);
            }
        }
        sortable.sort((a, b) => b[1] - a[1]);
        return sortable;
    };

    return (
        <div className="app">
            {(props.settings.devMode && false) &&
            <div className="hide">
                <h3>ReduxState</h3>
                <pre>{JSON.stringify(props.test, null, 2)}</pre>
            </div>
            }

            <Notifications/>
            <Settings/>
            <Users/>
            <Timer/>

            <div className="unsplashed-credits">Photo by <a href={unsplash.userLink}>{unsplash.username}</a> on <a
                href={unsplash.unsplashedLink}>Unsplash</a></div>

            <footer>
                <div className="footer__item">
                    <h4>Today's leaderboard</h4>
                    {renderLeaderboard()}
                </div>

                <div className="footer__item center">
                    <h4>Today's active mob time</h4>
                    <p>{getParsedTimeRemaining(props.timer.metadata.todaysSessionLength)}</p>
                </div>

                <div className="footer__item"/>
                <div className="footer__item"/>
                <div className="footer__item center">
                    <h4>Finish sound</h4>
                    <SoundSelector/>
                </div>
            </footer>
        </div>
    );
}

const mapStateToProps = state => ({
    test: state,
    settings: state.settings,
    timer: state.timer,
    users: usersSelector(state),
});


const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export const unwrapped = App;
export default connect(mapStateToProps, mapDispatchToProps)(App);

