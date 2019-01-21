import React from 'react';
import Input from './Input';
import {shallow} from 'jest';

const handleInputSubmit = jest.fn();
let wrapper;

describe("Input", () => {
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

    it('handleSubmit', () => {
        renderComponent();
        wrapper.instance().handleInputSubmit();

        expect(handleInputSubmit).toHaveBeenCalledTimes(1);
    });

    it('render should match snapshot', () => {
        const wrapper = renderComponent();
        expect(wrapper).toMatchSnapshot();
    });
});
