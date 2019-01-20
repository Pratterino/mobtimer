import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toggleUser, changeName, removeUser} from "./userActions";
import classNames from 'classnames';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import './User.scss';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.user.name,
        };
    }

    onChange = (event) => {
        this.setState({
            name: event.target.value
        });
    };

    updateName = (e) => {
        e.preventDefault();
        this.props.changeName(this.props.user, this.state.name);
        this.enterEditMode(false);
    };
    enterEditMode = (boolean = true) => {
        this.setState({editMode: boolean});
        if (this.input) {
            this.input.current.focus();
        }
    };

    render() {
        // TODO: disabled should be able to be in user, why is it not updating if it is?
        const {name, image, active} = this.props.user;
        const classes = classNames({
            disabled: this.props.disabled,
            active,
        });

        const backgroundImage = {backgroundImage: `url(${image})`};
        return (
            <div className="user">
                {active && <div className="user__crown"/>}
                <figure
                    className={`user__image pointer ${classes}`}
                    onClick={this.props.toggleUser.bind(null, this.props.user)}
                    style={backgroundImage}
                >
                    {!active &&
                    <div className="user__remove">
                        <FontAwesomeIcon
                            icon={faTimesCircle}
                            onClick={this.props.removeUser.bind(null, this.props.user)}
                        />
                    </div>
                    }
                </figure>
                <figcaption className="user__name">
                    <div className="user__name--text" onClick={this.enterEditMode}>
                        {this.state.editMode ?
                            <input
                                ref={this.input}
                                value={this.state.name}
                                onChange={this.onChange}
                                onBlur={this.updateName}
                            /> : name}
                    </div>
                </figcaption>
            </div>
        );
    }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => bindActionCreators({
    removeUser,
    toggleUser,
    changeName,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(User);
