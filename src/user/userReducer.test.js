import React from 'react';
import actions from '../actionTypes';
import userReducer, { activeUserSelector, usersSelector } from './../user/userReducer';
import * as TimerHelper from '../helper/TimerHelper';

describe('userReducer', () => {
    const getDefaultState = props => ({
        users: [
            {
                image: 'randomImageUrl1',
                active: true,
                disabled: false,
                name: 'Sean',
            },
            {
                image: 'randomImageUrl2',
                active: false,
                disabled: false,
                name: 'Hayes',
            },
        ],
    });

    //TODO: Test these "private" methods.
    describe('getNextActiveUserIndex', () => {});
    describe('getActiveUser', () => {});
    describe('userExistInState', () => {});

    describe('ADD_USER', () => {
        let state;
        let action;

        beforeEach(() => {
            state = getDefaultState();
        });

        it('should not add user to state if name exists', () => {
            action = {
                type: actions.ADD_USER,
                user: {
                    image: 'randomImageUrl',
                    active: false,
                    disabled: false,
                    name: 'sean',
                },
            };
            const newState = userReducer(state, action);
            expect(newState.users).toHaveLength(2);
            expect(newState.users).not.toContainEqual(action.user);
        });

        it('should add user to state', () => {
            action = {
                type: actions.ADD_USER,
                user: {
                    image: 'randomImageUrl',
                    active: false,
                    disabled: false,
                    name: 'Scott',
                },
            };
            const newState = userReducer(state, action);
            expect(newState.users).toHaveLength(3);
            expect(newState.users[2]).toBe(action.user);
        });
    });

    describe('REMOVE_USER', () => {
        let state;
        let action;

        beforeEach(() => {
            state = getDefaultState();
        });

        it('should remove user if exists in state', () => {
            action = {
                type: actions.REMOVE_USER,
                user: {
                    image: '',
                    active: false,
                    disabled: false,
                    name: 'Hayes',
                },
            };

            const newState = userReducer(state, action);
            expect(newState.users).toHaveLength(1);
            expect(newState.users).not.toContainEqual(action.user);
        });

        it('should not remove user if it does not exist in state', () => {
            action = {
                type: actions.REMOVE_USER,
                user: {
                    image: '',
                    active: false,
                    disabled: false,
                    name: 'Hodor',
                },
            };

            const newState = userReducer(state, action);
            expect(newState.users).toHaveLength(2);
            expect(newState.users).not.toContainEqual(action.user);
        });

        it('should not remove an active user from state', () => {
            action = {
                type: actions.REMOVE_USER,
                user: {
                    image: '',
                    active: true,
                    disabled: false,
                    name: 'Sean',
                },
            };

            const newState = userReducer(state, action);
            expect(newState.users).toHaveLength(2);
            expect(newState.users).not.toContainEqual(action.user);
        });
    });

    describe('CHANGE_USER_NAME', () => {
        let state;
        let action;

        beforeEach(() => {
            state = getDefaultState();
        });

        it('should change a users name if it exists in state', () => {
            action = {
                type: actions.CHANGE_USER_NAME,
                name: 'Tony',
                user: {
                    image: '',
                    active: false,
                    disabled: false,
                    name: 'Sean',
                },
            };

            const newState = userReducer(state, action);
            expect(newState.users).toHaveLength(2);
            expect(newState.users[0].name).toBe('Tony');
            expect(newState.users).not.toContainEqual(action.user);
        });

        it('should not change a users name if it does not exists in state', () => {
            action = {
                type: actions.CHANGE_USER_NAME,
                name: 'George Maharis',
                user: {
                    image: '',
                    active: false,
                    disabled: false,
                    name: 'George Michael Bluth',
                },
            };

            const newState = userReducer(state, action);
            expect(newState.users).toHaveLength(2);
            expect(newState.users).not.toContainEqual(action.user);
        });
    });

    describe('UPDATE_USER_ORDER', () => {
        let state;
        let action;

        beforeEach(() => {
            state = getDefaultState();
        });

        it('should return the default order of users', () => {
            action = {
                type: actions.UPDATE_USER_ORDER,
                users: getDefaultState().users,
            };

            const newState = userReducer(state, action);
            expect(newState.users[0].name).toBe('Sean');
            expect(newState.users[1].name).toBe('Hayes');
            expect(newState.users).toEqual(action.users);
        });

        it('should set state to the order of the users passed', () => {
            action = {
                type: actions.UPDATE_USER_ORDER,
                users: getDefaultState().users.reverse(),
            };

            const newState = userReducer(state, action);
            expect(newState.users[0].name).toBe('Hayes');
            expect(newState.users[1].name).toBe('Sean');
            expect(newState.users).toEqual(action.users);
        });
    });

    describe('TOGGLE_USER', () => {
        let state;
        let action;

        beforeEach(() => {
            state = getDefaultState();
        });

        it('should toggle disabled property of user', () => {
            action = {
                type: actions.TOGGLE_USER,
                user: {
                    image: '',
                    active: false,
                    disabled: false,
                    name: 'Sean',
                },
            };

            const newState = userReducer(state, action);
            expect(newState.users[0].name).toBe('Sean');
            expect(newState.users[0].disabled).toBe(true);
            expect(newState.users).not.toContainEqual(action.user);

            const newState2 = userReducer(state, action);
            expect(newState2.users[0].name).toBe('Sean');
            expect(newState2.users[0].disabled).toBe(false);
        });
    });

    describe('NEXT_USER', () => {
        let state;
        let action;

        beforeEach(() => {
            state = getDefaultState();
        });

        it('should activate the next user', () => {
            action = {
                type: actions.NEXT_USER,
            };
            let changeFaviconSpy = jest.spyOn(TimerHelper, 'changeFavicon');

            const newState = userReducer(state, action);
            expect(newState.users[0].name).toBe('Sean');
            expect(newState.users[0].active).toBe(false);
            expect(newState.users[1].name).toBe('Hayes');
            expect(newState.users[1].active).toBe(true);
            expect(changeFaviconSpy).toHaveBeenCalledWith('randomImageUrl2');

            const newState2 = userReducer(newState, action);
            expect(newState2.users[0].name).toBe('Sean');
            expect(newState2.users[0].active).toBe(true);
            expect(newState2.users[1].name).toBe('Hayes');
            expect(newState2.users[1].active).toBe(false);
            expect(changeFaviconSpy).toHaveBeenCalledWith('randomImageUrl1');

            const newState3 = userReducer(newState2, action);
            expect(newState3.users[0].name).toBe('Sean');
            expect(newState3.users[0].active).toBe(false);
            expect(newState3.users[1].name).toBe('Hayes');
            expect(newState3.users[1].active).toBe(true);
            expect(changeFaviconSpy).toHaveBeenCalledWith('randomImageUrl2');
        });
    });

    describe('usersSelector', () => {
        let state;

        beforeEach(() => {
            state = {
                users: getDefaultState(),
            };
        });

        it('should return users from state', function() {
            let users = usersSelector(state);
            expect(users).toHaveLength(2);
            expect(users[0].name).toBe('Sean');
            expect(users[1].name).toBe('Hayes');
        });
    });

    describe('activeUserSelector', () => {
        let state;

        beforeEach(() => {
            state = {
                users: getDefaultState(),
            };
        });

        it('should return active user', function() {
            let users = activeUserSelector(state);
            expect(users.name).toEqual('Sean');
        });
    });

    describe('DEFAULT', () => {
        it('should return defaultState', function() {
            const action = {
                type: 'HOLLYWOOD_HANDBOOK',
            };
            let newState = userReducer(undefined, action);
            expect(newState.users).toHaveLength(1);
        });
    });
});
