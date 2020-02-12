import {
    addLeadingZeroToTime,
    changeFavicon,
    getParsedTimeRemaining,
    getPercentageLeftOfTime,
} from './TimerHelper';

describe('TimerHelper', () => {
    describe('addLeadingZeroToTime', () => {
        it(`should all have length of two`, () => {
            [0, 1, 20, 39, 60, 65].forEach(num => expect(addLeadingZeroToTime(num).toString()).toHaveLength(2));
        });

        it(`should place 0 first`, () => {
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(num => expect(addLeadingZeroToTime(num).toString()[0]).toBe('0'));
        });
    });

    describe('changeFavicon', () => {
        it(`should change favicon`, () => {
            const querySelectorSpy = jest.spyOn(document, 'querySelector');

            changeFavicon('bob');
            expect(querySelectorSpy).toHaveBeenCalledWith("link[rel*='icon']");
        });
    });
    describe('getPercentageLeftOfTime', () => {
        it('should be 100 percent', () => {
            const currentTime = 80;
            const sessionLength = 80;

            expect(getPercentageLeftOfTime(currentTime, sessionLength)).toBe(100);
        });

        it('should be 50 percent', () => {
            const currentTime = 40;
            const sessionLength = 80;

            expect(getPercentageLeftOfTime(currentTime, sessionLength)).toBe(50);
        });

        it('should be 0 percent', () => {
            const currentTime = 0;
            const sessionLength = 80;

            expect(getPercentageLeftOfTime(currentTime, sessionLength)).toBe(0);
        });
    });

    describe('getParsedTimeRemaining', () => {
        it(`should return a parsed time with minutes and seconds when only seconds in seconds passed`, () => {
            const seconds = 30;
            const timeRemaining = getParsedTimeRemaining(seconds);
            expect(timeRemaining).toMatchSnapshot();
        });

        it(`should return a parsed time with minutes and seconds when minutes in seconds passed`, () => {
            const minutes = 60 * 15.2;
            const timeRemaining = getParsedTimeRemaining(minutes);
            expect(timeRemaining).toMatchSnapshot();
        });

        it(`should return a parsed time with hours, minutes and seconds when hour in seconds passed`, () => {
            const hours = 60 * 60 * 2.3;
            const timeRemaining = getParsedTimeRemaining(hours);
            expect(timeRemaining).toMatchSnapshot();
        });
    });
});
