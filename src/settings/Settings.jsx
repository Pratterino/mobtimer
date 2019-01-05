import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {askForNotificationPermission} from "./../NotificationManager";

class Settings extends Component {
    componentDidMount() {
        window.document.body.className = this.props.settings.theme || "";
        askForNotificationPermission();
    }

    render() {
        return (
            <div></div>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings,
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
