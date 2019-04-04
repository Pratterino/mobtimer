import React from 'react';
import {UnwrappedTimer} from './Timer';
import {shallow} from 'enzyme';

xdescribe("Timer", () => {
    let wrapper;

    const renderComponent = (props) => {
        const timerState = {
            active: false,
            currentTime: 100,
            sessionLength: 100,
        };

        wrapper = shallow(
            <UnwrappedTimer
                timer={timerState}
                stopTimer={jest.fn()}
                playPauseTimer={jest.fn()}
                startTimer={jest.fn()}
                {...props}
            />
        );
    };

    beforeEach(() => {
        renderComponent();
    });

    describe('getPercentageLeftOfTime', () => {
        it('should be 100 percent', () => {
            renderComponent({
                timer: {
                    currentTime: 80,
                    sessionLength: 80,
                },
            });

            let percentageLeftOfTime = wrapper.instance().getPercentageLeftOfTime();
            expect(percentageLeftOfTime).toBe(100);
        });

        it('should be 50 percent', () => {
            renderComponent({
                timer: {
                    currentTime: 40,
                    sessionLength: 80,
                },
            });

            let percentageLeftOfTime = wrapper.instance().getPercentageLeftOfTime();
            expect(percentageLeftOfTime).toBe(50);
        });

        it('should be 0 percent', () => {
            renderComponent({
                timer: {
                    currentTime: 0,
                    sessionLength: 80,
                },
            });

            let percentageLeftOfTime = wrapper.instance().getPercentageLeftOfTime();
            expect(percentageLeftOfTime).toBe(0);
        });
    });

    describe('renderCircularProgressbar', () => {});

    describe('renderTimeRemaining', () => {
    });

    describe('render', () => {
        it('should match snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
