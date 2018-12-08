import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toggleUser, removeUser} from "./userActions";
import classNames from 'classnames';
import './User.css';

class User extends Component {
    removeUser = (user) => {
        console.info("user: remove ", user);
        this.props.removeUser(user);
    };

    render() {
        // TODO: disabled should be able to be in user, why is it not updating if it is?
        const {name, image, active} = this.props.user;
        const classes = classNames("user", {
            disabled: this.props.disabled,
            active,
        });

        const style = {backgroundImage: `url(${image})`};
        return (
            <div className={classes}>
                <div
                    className="user__image pointer"
                    onClick={this.props.toggleUser.bind(null, this.props.user)}
                    style={style}
                />
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
    toggleUser,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(User);
