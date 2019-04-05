import React from 'react';
import {unwrapped as UnwrappedUsers} from './Users';
import {shallow} from 'enzyme';

describe("Users", () => {
    let wrapper;
    let addUserSpy;
    const users = [{
        name: "Bob Ducca",
    }, {
        name: "Dabney Coleperson",
    }, {
        name: "Llarn Bleb-Raag",
    }];

    const renderComponent = (props) => {
        addUserSpy = jest.fn();
        wrapper = shallow(
            <UnwrappedUsers
                users={users}
                addUser={addUserSpy}
                nextUser={jest.fn()}
                resetTimer={jest.fn()}
                updateUserOrder={jest.fn()}
                {...props}
            />
        );
    };

    beforeEach(() => {
        renderComponent();
    });

    describe('componentWillReceiveProps', () => {
        it('should not update local state', () => {
            let state = {
                users,
            };

            wrapper.instance().componentWillReceiveProps(state);
            expect(wrapper.state('users')).toEqual(users);
        });

        it('should update local state', () => {
            const newUsers = [...users, {name: "Jenny"}];

            let newState = {
                users: newUsers,
            };

            wrapper.instance().componentWillReceiveProps(newState);
            expect(wrapper.state('users')).toEqual(newUsers);
        });
    });

    describe('addUser', () => {
        it('should call setState', () => {
            const e = {
                preventDefault: jest.fn(),
                target: [{
                    value: "Kurt",
                }]
            };
            expect(wrapper.state('users')).toEqual(users);
            wrapper.instance().addUser(e);

            expect(addUserSpy).toHaveBeenCalledWith('Kurt');
        });
    });

    describe('onDragEnd', () => {
        it('should reset order when no destination', () => {
            const result = {};

            wrapper.instance().onDragEnd(result);
            let user_1 = wrapper.state('users')[0];
            let user_2 = wrapper.state('users')[1];
            let user_3 = wrapper.state('users')[2];

            expect(user_1.name).toEqual("Bob Ducca");
            expect(user_2.name).toEqual("Dabney Coleperson");
            expect(user_3.name).toEqual("Llarn Bleb-Raag");
        });

        it('should keep same order', () => {
            const result = {
                source: {
                    index: 0,
                },
                destination: {
                    index: 0,
                },
            };

            wrapper.instance().onDragEnd(result);
            let user_1 = wrapper.state('users')[0];
            let user_2 = wrapper.state('users')[1];
            let user_3 = wrapper.state('users')[2];

            expect(user_1.name).toEqual("Bob Ducca");
            expect(user_2.name).toEqual("Dabney Coleperson");
            expect(user_3.name).toEqual("Llarn Bleb-Raag");
        });

        it('should swap order', () => {
            const result = {
                source: {
                    index: 0,
                },
                destination: {
                    index: 1,
                },
            };

            wrapper.instance().onDragEnd(result);
            let user_1 = wrapper.state('users')[0];
            let user_2 = wrapper.state('users')[1];
            let user_3 = wrapper.state('users')[2];

            expect(user_1.name).toEqual("Dabney Coleperson");
            expect(user_2.name).toEqual("Bob Ducca");
            expect(user_3.name).toEqual("Llarn Bleb-Raag");
        });
    });

    describe('getItemStyle', () => {
        it('should return when dragging', () => {
            let draggableStyle = {
                boxSizing: "border-box",
                pointerEvents: "none",
                position: "fixed",
                transition: "opacity 0.2s cubic-bezier(0.2, 0, 0, 1)",
                zIndex: 5000,
            };

            let itemStyle = wrapper.instance().getItemStyle(true, draggableStyle);
            expect(itemStyle.background).toBe("var(--highlight-color)");
            expect(itemStyle).toMatchSnapshot();
        });

        it('should return when not dragging', () => {
            let draggableStyle = {
                boxSizing: "border-box",
                pointerEvents: "none",
                position: "fixed",
                transition: "opacity 0.2s cubic-bezier(0.2, 0, 0, 1)",
                zIndex: 5000,
            };

            let itemStyle = wrapper.instance().getItemStyle(false, draggableStyle);
            expect(itemStyle.background).toBe("transparent");
            expect(itemStyle).toMatchSnapshot();
        });
    });

    describe('getListStyle', () => {
        it('should return when isDraggingOver', () => {
            let listStyle = wrapper.instance().getListStyle(true);

            expect(listStyle.background).toBe("rgba(0,0,0,0.2)");
            expect(listStyle).toMatchSnapshot();
        });

        it('should return when not isDraggingOver', () => {
            let listStyle = wrapper.instance().getListStyle(false);

            expect(listStyle.background).toBe("");
            expect(listStyle).toMatchSnapshot();
        });
    });

    describe('reOrder', () => {
        it('move from 0 to 1', () => {
            let reOrdered = wrapper.instance().reOrder(users, 0, 1);
            expect(reOrdered).toMatchSnapshot();
        });

        it('move from 1 to 2', () => {
            let reOrdered = wrapper.instance().reOrder(users, 1, 2);
            expect(reOrdered).toMatchSnapshot();
        });

        it('move from 2 to 0', () => {
            let reOrdered = wrapper.instance().reOrder(users, 2, 0);
            expect(reOrdered).toMatchSnapshot();
        });
    });

    describe('render', () => {
        it('should match snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
