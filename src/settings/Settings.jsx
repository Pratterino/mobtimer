import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {addUser} from "./../user/userActions";

class Settings extends Component {
    addUser = (inputText) => {
        this.props.addUser(inputText);
    };

    componentDidMount() {
        window.document.body.className = this.props.settings.theme || "";
    }

    render() {
        return (
            <div>
                <form onSubmit={(e) => e.preventDefault()}>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings,
});
const mapDispatchToProps = dispatch => bindActionCreators({
    addUser,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Settings);
