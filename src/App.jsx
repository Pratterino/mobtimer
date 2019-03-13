import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import Timer from './timer/Timer';
import {usersSelector} from "./user/userReducer";
import Users from "./user/Users";
import Notifications from "./notifications/Notifications";
import Settings from "./settings/Settings";
import {getParsedTimeRemaining} from "./helper/TimerHelper";
import SoundSelector from "./sound/SoundSelector";
import './App.scss';

class App extends Component {
    renderLeaderboard = () => {
        const {leaderboard} = this.props.timer;
        let sortedLeaderboard = this.sortProperties(leaderboard);
        return (
            <ol>
                {sortedLeaderboard.map((item, i) => (
                    <li>{item[0]} ({getParsedTimeRemaining(item[1])})</li>
                ))}
            </ol>
        );
    };

    sortProperties = (obj) => {
        const sortable = [];
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                sortable.push([key, obj[key]]);
            }
        }
        sortable.sort((a, b) => b[1] - a[1]);
        return sortable;
    };

    render() {
        return (
            <div className="app">
                {(this.props.settings.devMode && false) &&
                <div className="hide">
                    <h3>ReduxState</h3>
                    <pre>{JSON.stringify(this.props.test, null, 2)}</pre>
                </div>
                }

                <Notifications/>

                <Settings/>

                <Users/>

                <Timer/>

                <footer>
                    <div className="footer__item">
                        <h4>Today's leaderboard</h4>
                        {this.renderLeaderboard()}
                    </div>

                    <div className="footer__item center">
                        <h4>Today's active mob time</h4>
                        <p>{getParsedTimeRemaining(this.props.timer.metadata.todaysSessionLength)}</p>
                    </div>

                    <div className="footer__item"/>
                    <div className="footer__item"/>
                    <div className="footer__item center">
                        <h4>Finish sound</h4>
                        <SoundSelector />
                    </div>
                </footer>
            </div>
        );
    }
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

