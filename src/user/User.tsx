import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { changeName, changeUserImage, removeUser, toggleUser } from './userActions';
import './User.scss';

interface IProps {
    user: {
        name: string,
        image: string,
        disabled: boolean,
        active: boolean,
    }
    removeUser: Function,
    toggleUser: Function,
    changeUserImage: Function,
    changeName: Function,
}

interface IInput {
    current: {
        focus: Function
    }
}

class User extends Component<IProps> {
    input = createRef<HTMLDivElement>();
    state = {
        name: this.props.user.name,
        editMode: false,
    };

    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            name: event.target.value,
        });
    };

    updateName = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.props.changeName(this.props.user, this.state.name);
        this.enterEditMode(false);
    };

    enterEditMode = (boolean = true) => {
        this.setState({ editMode: boolean });
        if (this.input.current) {
            this.input.current.focus();
        }
    };

    render() {
        // TODO: disabled should be able to be in user, why is it not updating if it is?
        const { name, image, disabled, active } = this.props.user;
        const classes = classNames({ active, disabled });
        const backgroundImage = { backgroundImage: `url(${image})` };

        return (
            <div className="user">
                {active && <div className="user__crown" />}
                {!active && (
                    <div className="user__remove">
                        <FontAwesomeIcon
                            icon={faTimesCircle}
                            onClick={this.props.removeUser.bind(null, this.props.user)}
                        />
                    </div>
                )}
                <figure
                    className={`user__image pointer ${classes}`}
                    onDoubleClick={this.props.changeUserImage.bind(null, this.props.user)}
                    onClick={this.props.toggleUser.bind(null, this.props.user)}
                    style={backgroundImage}>
                    {active && <div className="shine" />}
                </figure>
                <figcaption className="user__name">
                    <div className={classNames('user__name--text', { active })} onClick={() => this.enterEditMode(true)}>
                        {this.state.editMode ? (
                            <input
                                ref={this.input as any}
                                value={this.state.name}
                                onChange={this.onChange}
                                onBlur={this.updateName}
                            />
                        ) : (
                            name
                        )}
                    </div>
                </figcaption>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            removeUser,
            toggleUser,
            changeName,
            changeUserImage,
        },
        dispatch,
    );

export default connect(null, mapDispatchToProps)(User);

export const unwrapped = User;
