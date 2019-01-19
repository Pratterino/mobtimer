import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import "./Settings.scss";
import {clearState} from "./../settings/settingsActions";

class Settings extends Component {
    componentDidMount() {
        window.document.body.className = this.props.settings.theme || "";
    }

    render() {
        return (
            <div className="settings">
                <h3>Application</h3>
                <a className="button" onClick={this.props.clearState}>Reset application</a>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings,
});
const mapDispatchToProps = dispatch => bindActionCreators({
    clearState,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
