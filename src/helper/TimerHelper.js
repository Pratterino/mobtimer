const addLeadingZeroToTime = (time) => {
    return time.toString().length === 1 ? `0${time}` : time;
};

export const getParsedTimeRemaining = (seconds) => {
    const parsedMinutes = addLeadingZeroToTime(Math.floor(seconds / 60));
    const parsedSeconds = addLeadingZeroToTime(seconds - parsedMinutes * 60);
    return `${parsedMinutes}:${parsedSeconds}`;
};
