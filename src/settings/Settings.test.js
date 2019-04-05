import React from 'react';
import {unwrapped as UnwrappedSettings} from './Settings';
import {shallow} from "enzyme";

describe('Settings', () => {
    let wrapper;

    const renderComponent = (props) => (
        wrapper = shallow(
            <UnwrappedSettings
                show
                settings={{
                    devMode: false,
                }}
                timer={{
                    sessionLength: 900
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
            renderComponent({devMode: true});
            expect(wrapper).toMatchSnapshot();
        });
    })
});
