import React from 'react';
import {unwrapped as UnwrappedUser} from './User';
import {shallow} from 'enzyme';

describe("User", () => {
    let wrapper;
    let changeNameSpy;

    const renderComponent = (props) => {
        changeNameSpy = jest.fn();

        wrapper = shallow(
            <UnwrappedUser
                user={{name: "John"}}
                removeUser={jest.fn()}
                toggleUser={jest.fn()}
                changeName={changeNameSpy}
                changeUserImage={jest.fn()}
                {...props}
            />
        );
    };

    beforeEach(() => {
        renderComponent();
    });

    describe('onChange', () => {
        it('should setState', () => {
            const e = {
                target: {
                    value: "Kurt",
                }
            };
            expect(wrapper.state('name')).toEqual('John');
            wrapper.instance().onChange(e);
            expect(wrapper.state('name')).toEqual('Kurt');
        });
    });

    describe('updateName', () => {
        it('should call changeName', () => {
            const e = {
                preventDefault: jest.fn(),
            };

            wrapper.instance().updateName(e);
            expect(changeNameSpy).toHaveBeenCalledTimes(1);
            expect(wrapper.state('editMode')).toEqual(false);
        });
    });

    describe('enterEditMode', () => {
        it('should set editMode to true by default', () => {
            wrapper.instance().enterEditMode();
            expect(wrapper.state('editMode')).toBe(true);
        });
        it('should set editMode to false', () => {
            wrapper.instance().enterEditMode(false);
            expect(wrapper.state('editMode')).toBe(false);
        });
        it('should set editMode to true', () => {
            wrapper.instance().enterEditMode(true);
            expect(wrapper.state('editMode')).toBe(true);
        });
    });

    describe('render', () => {
        it('should match snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
