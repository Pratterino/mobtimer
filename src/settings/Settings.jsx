import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {askForNotificationPermission, hasAcceptedNotifications} from "./../NotificationManager";
import {Emojione} from "react-emoji-render";
import "./Settings.scss";

class Settings extends Component {
    componentDidMount() {
        window.document.body.className = this.props.settings.theme || "";
        askForNotificationPermission();
    }

    render() {
        return (
            <div className="settings">
                {!hasAcceptedNotifications() && (
                    <div className="settings__permissions">
                        <Emojione
                            text=":information_source: :point_up: Please accept Notifications to get notified when the next user is due!"
                        />
                    </div>)}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings,
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
