import React from 'react';
import Input from './Input';
import {shallow} from 'enzyme';

describe("Input", () => {
    const handleInputSubmit = jest.fn();
    let wrapper;

    const renderComponent = (props) => {
        wrapper = shallow(
            <Input
                handleInputSubmit={handleInputSubmit}
                {...props}
            />
        );
    };

    beforeEach(() => {
        renderComponent();
    });

    describe('handleSubmit', () => {
        it('should call handleInputSubmit', () => {
            let mockFunction = jest.fn();
            let e = {preventDefault: mockFunction};

            wrapper.instance().handleSubmit(e);

            expect(mockFunction).toHaveBeenCalledTimes(1);
            expect(handleInputSubmit).toHaveBeenCalledTimes(1);
            expect(wrapper.instance().state).toEqual({text: ""});
        });
    });

    describe('render', () => {
        it('should match snapshot', () => {
            //expect(wrapper).toMatchSnapshot();
        });
    });
});
