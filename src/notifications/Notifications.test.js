import React from 'react';
import { unwrapped as UnwrappedNotifications } from './Notifications';
import { shallow } from 'enzyme';

describe('Notifications', () => {
    let wrapper;

    const renderComponent = props => (wrapper = shallow(<UnwrappedNotifications {...props} />));

    beforeEach(() => {
        renderComponent();
    });

    describe('render', () => {
        it('should match snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
