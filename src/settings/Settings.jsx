import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {addUser} from "./../user/userActions";

class Settings extends Component {
    addUser = (event) => {
        event.preventDefault();
        this.props.addUser(event.target[0].value);
    };

    componentDidMount() {
        window.document.body.className = this.props.settings.theme || "";
    }

    render() {
        return (
            <div>
                <form onSubmit={this.addUser}>
                    <input placeholder="Name of new user"/>
                    <input type="submit" value="Add user"/>
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
