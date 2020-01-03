import React from 'react';
import { unwrapped as UnwrappedThemeButton } from './ThemeButton';
import { shallow } from 'enzyme';

describe('ThemeButton', () => {
    let wrapper;

    const renderComponent = props =>
        (wrapper = shallow(
            <UnwrappedThemeButton
                settings={{
                    theme: 'ducca-evening',
                }}
                {...props}
            />,
        ));

    beforeEach(() => {
        renderComponent();
    });

    describe('render', () => {
        it('should match snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
