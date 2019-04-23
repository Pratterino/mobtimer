import React, {useEffect, useState} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {LazyImage} from "react-lazy-images";

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
    const [unsplash, setUnsplash] = useState({});

    useEffect(() => {
        fetchBackgroundImage().then(unsplashed => setUnsplash(unsplashed));
    }, []);

    useEffect(() => {
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
        <>
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
                    <div className="footer__item center">
                        <h4>Finish sound</h4>
                        <SoundSelector/>
                    </div>
                    <div className="footer__item">
                        <div className="unsplashed-credits">Photo by <a href={unsplash.userLink}>{unsplash.username}</a> on <a
                            href={unsplash.unsplashedLink}>Unsplash</a></div>
                    </div>
                </footer>
            </div>

            <div id="bg-image">
                <LazyImage
                    src={unsplash.image}
                    alt="Image of a mountain landscape."
                    placeholder={
                        ({imageProps, ref}) => <img ref={ref} src={unsplash.imageSmall} alt={imageProps.alt}/>
                    }
                    actual={
                        ({imageProps}) => (
                            <img {...imageProps} alt=""/>
                        )
                    }
                />
            </div>
        </>
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

