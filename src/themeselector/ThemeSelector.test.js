import React from 'react';
import {unwrapped as UnwrappedThemeSelector} from './ThemeSelector';
import {shallow} from "enzyme";

describe('ThemeSelector', () => {
    let wrapper;

    const renderComponent = (props) => (
        wrapper = shallow(
            <UnwrappedThemeSelector
                settings={{
                    theme: "ducca-evening",
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
    })
});
