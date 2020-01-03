import React from 'react';
import timerReducer, { defaultTimerState } from './timerReducer';
import actions from './../actionTypes';

describe('timerReducer', () => {
    const getDefaultState = props => ({
        ...defaultTimerState,
        ...{
            metadata: {
                ...defaultTimerState.metadata,
                ...{
                    todaysDate: 1,
                },
            },
        },
        ...props,
    });

    beforeEach(() => {
        jest.useFakeTimers();
    });

    //TODO: Test these "private" methods.
    describe('timerIsDone', () => {});
    describe('stopTimerInterval', () => {});
    describe('startTimerInterval', () => {});
    describe('timeoutToSpeech', () => {});
    describe('toggleTitleOnFinish', () => {});

    describe('SECOND_DECREMENT_TIMER', () => {
        let state;
        let action;

        beforeEach(() => {
            state = getDefaultState({
                currentTime: 1050,
            });
            state.metadata.todaysSessionLength = 41;

            action = {
                type: actions.SECOND_DECREMENT_TIMER,
                user: {
                    name: 'Ulla',
                },
            };
        });

        it('should decrement currentTime and increment todaysSessionLength', () => {
            let unknownState = timerReducer(state, { type: 'UNKNOWN' });
            let newState = timerReducer(state, action);

            expect(unknownState.currentTime).toBe(1050);
            expect(newState.currentTime).toBe(1049);
            expect(document.title).toBe('17:29');

            expect(unknownState.metadata.todaysSessionLength).toBe(41);
            expect(newState.metadata.todaysSessionLength).toBe(42);
        });
    });

    describe('RESET_TODAYS_SESSION_LENGTH', () => {
        let state;
        let action;

        beforeEach(() => {
            state = getDefaultState();
            state.metadata.todaysSessionLength = 500;

            action = {
                type: actions.RESET_TODAYS_SESSION_LENGTH,
            };
        });

        it('should reset todaysSessionLength to zero', () => {
            let unknownState = timerReducer(state, { type: 'UNKNOWN' });
            let newState = timerReducer(state, action);

            expect(unknownState.metadata.todaysSessionLength).toBe(500);
            expect(newState.metadata.todaysSessionLength).toBe(0);
        });
    });

    describe('START_TIMER', () => {
        let state;
        let action;

        beforeEach(() => {
            state = getDefaultState({
                active: true,
                currentTime: 62,
                sessionLength: 5000,
            });
            action = {
                type: actions.START_TIMER,
            };
        });

        it('should start interval and clear timeout', () => {
            let newState = timerReducer(state, action);

            expect(clearTimeout).toHaveBeenCalledTimes(2);
            expect(clearInterval).toHaveBeenCalledTimes(1);
            expect(newState.active).toBe(true);
            expect(newState.currentTime).toBe(state.sessionLength);
            expect(newState.metadata.todaysDate).toBe(new Date().getDate());
        });
    });

    describe('FINISH_TIMER', () => {
        let state;
        let action;

        beforeEach(() => {
            state = getDefaultState({
                active: true,
                currentTime: 62,
                sessionLength: 5000,
            });
            action = {
                type: actions.FINISH_TIMER,
            };
        });

        it('should call clearInterval', () => {
            let newState = timerReducer(state, action);

            expect(clearTimeout).not.toHaveBeenCalled();
            expect(clearInterval).toHaveBeenCalledTimes(1);
            expect(newState.active).toBe(false);
            expect(newState.currentTime).toBe(state.sessionLength);
        });

        it('should match snapshot', () => {
            let newState = timerReducer(state, action);
            expect(newState).toMatchSnapshot();
        });
    });

    describe('STOP_TIMER', () => {
        let state;
        let action;

        beforeEach(() => {
            state = getDefaultState({
                active: true,
            });
            action = {
                type: actions.STOP_TIMER,
            };
        });

        it('should call clearInterval and clearTimeout', () => {
            let newState = timerReducer(state, action);

            expect(clearTimeout).toHaveBeenCalledTimes(1);
            expect(clearInterval).toHaveBeenCalledTimes(1);

            expect(newState.active).toBe(false);
        });

        it('should match snapshot', () => {
            let newState = timerReducer(state, action);
            expect(newState).toMatchSnapshot();
        });
    });

    describe('PLAY_PAUSE_TIMER', () => {
        let state;
        let action;

        beforeEach(() => {
            action = {
                type: actions.PLAY_PAUSE_TIMER,
            };
        });

        it('should stop if active', () => {
            state = getDefaultState({
                currentTime: 43,
                active: true,
            });
            let newState = timerReducer(state, action);

            expect(clearTimeout).toHaveBeenCalledTimes(1);
            expect(clearInterval).toHaveBeenCalledTimes(1);

            expect(newState.active).toBe(false);
        });

        it('should start if not active', () => {
            state = getDefaultState({
                currentTime: 43,
                active: false,
            });
            let newState = timerReducer(state, action);

            expect(clearTimeout).toHaveBeenCalledTimes(2);
            expect(clearInterval).toHaveBeenCalledTimes(1);

            expect(newState.active).toBe(true);
        });

        describe('should match snapshots', function() {
            it('when active', () => {
                state = getDefaultState({
                    currentTime: 40,
                    active: true,
                });

                let newState = timerReducer(state, action);
                expect(newState.metadata.todaysDate).toBe(new Date().getDate());
                expect(newState.active).toBe(false);
            });

            it('when not active', () => {
                state = getDefaultState({
                    currentTime: 50,
                    active: false,
                });
                state.metadata.todaysDate = 12;

                let newState = timerReducer(state, action);
                expect(newState.metadata.todaysDate).toBe(new Date().getDate());
                expect(newState.active).toBe(true);
            });
        });
    });

    describe('RESET_TIMER', () => {
        let state;
        let action;

        beforeEach(() => {
            state = getDefaultState({
                active: true,
                currentTime: 60,
                sessionLength: 5000,
            });
            action = {
                type: actions.RESET_TIMER,
            };
        });

        it('should call clearInterval', () => {
            let newState = timerReducer(state, action);

            expect(clearTimeout).not.toHaveBeenCalled();
            expect(clearInterval).toHaveBeenCalledTimes(1);

            expect(newState.active).toBe(false);
            expect(newState.currentTime).toBe(5000);
        });

        it('should match snapshot', () => {
            let newState = timerReducer(state, action);
            expect(newState).toMatchSnapshot();
        });
    });

    describe('UPDATE_SESSION_LENGTH', () => {
        let state;

        beforeEach(() => {
            state = getDefaultState({
                sessionLength: 60,
            });
        });

        it('should call clearInterval and clearTimeout', () => {
            const action = {
                type: actions.UPDATE_SESSION_LENGTH,
                sessionLength: 120,
            };
            let newState = timerReducer(state, action);

            expect(clearTimeout).toHaveBeenCalledTimes(1);
            expect(clearInterval).toHaveBeenCalledTimes(1);

            expect(newState.sessionLength).toBe(120);
        });

        it('should update sessionLength and match snapshot', () => {
            const action = {
                type: actions.UPDATE_SESSION_LENGTH,
                sessionLength: 2000,
            };
            let newState = timerReducer(state, action);

            expect(newState.sessionLength).toBe(2000);
            expect(newState).toMatchSnapshot();
        });
    });

    describe('DEFAULT', () => {
        it('should return defaultState', function() {
            const action = {
                type: 'ACTION MAN',
            };
            let newState = timerReducer(undefined, action);
            expect(newState).toEqual(defaultTimerState);
        });
    });
});
