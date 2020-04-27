import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import classNames from 'classnames';
import { usersSelector } from './userReducer';
import { addUser, nextUser, updateUserOrder } from './userActions';
import { resetTimer } from './../timer/timerActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFastForward } from '@fortawesome/free-solid-svg-icons';
import User from './User';
import Input from '../Input';
import './Users.scss';

class Users extends Component {
    state = {
        nameValue: '',
        users: this.props.users,
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.users !== this.state.users) {
            this.setState({ users: nextProps.users });
        }
    }

    addUser = event => {
        event.preventDefault();
        this.props.addUser(event.target[0].value);
    };

    onDragEnd = result => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const users = this.reOrder(this.state.users, result.source.index, result.destination.index);

        this.setState({
            users,
        });

        this.props.updateUserOrder(users);
    };

    getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: 'none',
        background: isDragging ? 'var(--highlight-color)' : 'transparent',
        // styles we need to apply on draggables
        ...draggableStyle,
    });

    getListStyle = isDraggingOver => ({
        background: isDraggingOver ? 'rgba(0,0,0,0.2)' : '',
        display: 'inline-flex',
        overflow: 'auto',
    });

    reOrder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    render() {
        return (
            <div className={classNames('Users', { active: this.props.timer.active })}>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable" direction="horizontal">
                        {(provided, snapshot) => (
                            <div
                                className="draggable-users"
                                ref={provided.innerRef}
                                style={this.getListStyle(snapshot.isDraggingOver)}
                                {...provided.droppableProps}>
                                {this.state.users.map((user, index) => {
                                    console.log(user);
                                    return (
                                        <Draggable key={user.name + user.index} draggableId={user.name} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={this.getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style,
                                                    )}>
                                                    <User key={user.name} user={user} disabled={user.disabled} />
                                                </div>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                                <form className="user__add" onSubmit={e => e.preventDefault()}>
                                    <Input handleInputSubmit={text => this.props.addUser(text)}>Add user</Input>
                                </form>
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                <section className="users__footer">
                    <FontAwesomeIcon
                        icon={faFastForward}
                        size="2x"
                        title="Next user!"
                        className={classNames('pointer icon-shadow', this.props.timer.active ? 'active' : 'inactive')}
                        onClick={() => {
                            this.props.nextUser();
                            this.props.resetTimer();
                        }}
                    />
                </section>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    timer: state.timer,
    users: usersSelector(state),
});
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            addUser,
            nextUser,
            resetTimer,
            updateUserOrder,
        },
        dispatch,
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
export const unwrapped = Users;
