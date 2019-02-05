import React from 'react';
import {unwrapped} from './App';
import {shallow} from "enzyme";

describe('App', () => {
    let wrapper;

    const renderComponent = (props) => (
        wrapper = shallow(<unwrapped {...props}/>)
    );

    beforeEach(() => {
        renderComponent();
    });

    describe('render', () => {
        it('should match snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });
    })
});
