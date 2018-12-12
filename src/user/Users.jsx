import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {usersSelector} from "./userReducer";
import {addUser, nextUser, updateUserOrder} from "./userActions";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import User from "./User";
import "./Users.scss";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameValue: "",
            users: this.props.users,
        };
        this.grid = 8;
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.users !== this.state.users) {
            this.setState({users: nextProps.users});
        }
    }

    addUser = (event) => {
        event.preventDefault();
        this.props.addUser(event.target[0].value);
    };

    onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const users = this.reorder(
            this.state.users,
            result.source.index,
            result.destination.index
        );

        this.setState({
            users,
        });

        this.props.updateUserOrder(users);
    };

    getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: 'none',
        background: isDragging ? getComputedStyle(document.body).getPropertyValue('--highlight-color') : 'transparent',
        // styles we need to apply on draggables
        ...draggableStyle,
    });

    // css
    getListStyle = isDraggingOver => ({
        background: isDraggingOver ? 'rgba(0,0,0,0.2)' : '',
        display: 'inline-flex',
        overflow: 'auto',
    });

    reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };
    // end css

    render() {
        return (
            <Fragment>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable" direction="horizontal">
                        {(provided, snapshot) => (
                            <div
                                className="draggable-users"
                                ref={provided.innerRef}
                                style={this.getListStyle(snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                            >
                                {this.state.users.map((user, index) => (
                                    <Draggable key={user.name} draggableId={user.name} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={this.getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                            >
                                                <User
                                                    key={user.name}
                                                    user={user}
                                                    disabled={user.disabled}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <form onSubmit={this.addUser}>
                    <input placeholder="Name of new user"/>
                    <input type="submit" value="Add user"/>
                </form>
                <button onClick={this.props.nextUser}>Next user</button>
            </Fragment>
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
    updateUserOrder,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Users);
