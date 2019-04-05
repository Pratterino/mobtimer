import React from 'react';
import {unwrapped as UnwrappedSettings} from './Settings';
import {shallow} from "enzyme";

describe('Settings', () => {
    let wrapper;

    const renderComponent = (props) => (
        wrapper = shallow(
            <UnwrappedSettings
                settings={{
                    devMode: false,
                    theme: "",
                }}
                timer={{
                    sessionLength: 900,
                }}
                {...props}
            />
        )
    );

    beforeEach(() => {
        renderComponent();
    });

    describe('render', () => {
        it('should match snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('should match snapshot when devMode', () => {
            renderComponent({settings: {devMode: true}});
            expect(wrapper).toMatchSnapshot();
        });
    })
});
