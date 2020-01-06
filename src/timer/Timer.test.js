import React from 'react';
import { unwrapped as UnwrappedTimer } from './Timer';
import { shallow } from 'enzyme';

describe('Timer', () => {
    let wrapper;

    const renderComponent = props => {
        wrapper = shallow(
            <UnwrappedTimer
                timer={{
                    active: false,
                    currentTime: 100,
                    sessionLength: 100,
                }}
                stopTimer={jest.fn()}
                playPauseTimer={jest.fn()}
                startTimer={jest.fn()}
                {...props}
            />,
        );
    };

    beforeEach(() => {
        renderComponent();
    });

    describe('renderTimeRemaining', () => {});

    describe('render', () => {
        it('should match snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
