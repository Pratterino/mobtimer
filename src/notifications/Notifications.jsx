import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Emojione} from "react-emoji-render";
import {askForNotificationPermission, hasAcceptedNotifications} from "./../NotificationManager";
import {fetchBackgroundImage} from "./../unsplashedActions";
import "./Notifications.scss";

class Notifications extends Component {
    reRender = () => {
        this.forceUpdate();
    };

    componentDidMount() {
        askForNotificationPermission(this.reRender);
        fetchBackgroundImage()
    }

    render() {
        return (
            <div className="notifications">
                {!hasAcceptedNotifications() && (
                    <div className="notifications__permissions">
                        <Emojione
                            text=":information_source: :point_up: Please accept Notifications to get notified when the next user is due!"
                        />
                    </div>)}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    notifications: state.notifications,
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export const unwrapped = Notifications;
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
