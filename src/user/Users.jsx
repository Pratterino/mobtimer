import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {usersSelector} from "./userReducer";
import {addUser} from "./userActions";
import User from "./User";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameValue: "",
        };
    }

    addUser = () => {
        this.props.addUser(this.state.nameValue);
    };

    onChangeName = (e) => {
        this.setState({
            nameValue: e.target.value,
        });
    };

    render() {
        console.info(this.props.users);
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
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Users);
