import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {usersSelector} from "./userReducer";
import {addUser, nextUser} from "./userActions";
import User from "./User";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameValue: "",
        };
    }

    addUser = () => {
        this.props.addUser(this.nameValue);
        this.setState({
            nameValue: "",
        });
    };

    onChangeName = (e) => {
        this.setState({
            nameValue: e.target.value,
        });
    };

    render() {
        return (
            <div>
                <p>User list</p>
                {this.props.users && this.props.users.map(user => (
                    <User
                        key={user.name}
                        user={user}
                    />
                ))}
                <input value={this.state.nameValue} onChange={this.onChangeName}/>
                <button onClick={this.addUser}>Add user</button>
                <button onClick={this.props.nextUser}>Next user</button>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    timer: state.timer,
    users: usersSelector(state),
});
const mapDispatchToProps = dispatch => bindActionCreators({
    addUser,
    nextUser,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Users);
