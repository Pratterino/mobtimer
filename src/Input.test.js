import React from 'react';
import Input from './Input';
import { shallow } from 'enzyme';

describe('Input', () => {
    const handleInputSubmit = jest.fn();
    let wrapper;

    const renderComponent = props => {
        wrapper = shallow(<Input handleInputSubmit={handleInputSubmit} {...props} />);
    };

    beforeEach(() => {
        renderComponent();
    });

    //Todo: fix test. (hook replaced setState)
    xdescribe('handleSubmit', () => {
        it('should call handleInputSubmit', () => {
            const inputText = 'test';
            const mockFunction = jest.fn();
            let e = { preventDefault: mockFunction };

            wrapper.instance().setInputValue(inputText);
            wrapper.instance().handleSubmit(e);

            expect(mockFunction).toHaveBeenCalledTimes(1);
            expect(handleInputSubmit).toHaveBeenCalledTimes(1);
            expect(handleInputSubmit).toHaveBeenCalledWith(inputText);

            expect(wrapper.instance().state).toEqual({ text: '' });
        });
    });

    describe('render', () => {
        it('should match snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
