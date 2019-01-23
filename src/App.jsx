import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import Timer from './timer/Timer';
import {usersSelector} from "./user/userReducer";
import Users from "./user/Users";
import Notifications from "./notifications/Notifications";
import Settings from "./settings/Settings";
import {getParsedTimeRemaining} from "./helper/TimerHelper";
import './App.scss';

class App extends Component {
    render() {
        return (
            <div className="app">
                {false && window.location.hostname === "localhost" &&
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
                        <h4>Today's overall mob time</h4>
                        <p>
                            {getParsedTimeRemaining(this.props.timer.metadata.todaysSessionLength)}
                        </p>
                    </div>
                </footer>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    test: state,
    timer: state.timer,
    users: usersSelector(state),
});


const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export const unwrapped = App;
export default connect(mapStateToProps, mapDispatchToProps)(App);

