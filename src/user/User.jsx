import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './User.css';
import {removeUser} from "./userActions";

class User extends Component {
    removeUser = (user) => {
        console.info("user: remove ", user);
        this.props.removeUser(user);
    };

    render() {
        const {name, image} = this.props.user;
        const style = {backgroundImage: `url(${image})`};
        return (
            <div className="user">
                <div className="user__image" style={style}/>
                <br/>
                <div className="user__name">{name}</div>
                <button onClick={this.removeUser.bind(null, this.props.user)}>Remove</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => bindActionCreators({
    removeUser,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(User);
