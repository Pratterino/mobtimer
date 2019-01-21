import React from 'react';
import {unwrapped} from './App';

const renderComponent = (props) => (
    <unwrapped {...props}/>
);

describe('App', () => {
    test('render should match snapshot', () => {
        const wrapper = renderComponent();
        expect(wrapper).toMatchSnapshot();
    });
});
