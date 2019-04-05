export const addLeadingZeroToTime = (time) => {
    return time.toString().length === 1 ? `0${time}` : time;
};

export const changeFavicon = (imageUrl) => {
    let selector = document.querySelector("link[rel*='icon']");
    if (selector && selector.href) {
        selector.setAttribute("href", imageUrl);
    }
};

export function getPercentageLeftOfTime(currentTime, sessionLength) {
    return (currentTime / sessionLength) * 100;
}

export const getParsedTimeRemaining = (seconds) => {
    const sec_num = parseInt(seconds, 10); // don't forget the second param
    const hour = Math.floor(sec_num / 3600);
    const minute = Math.floor((sec_num - (hour * 3600)) / 60);
    const second = sec_num - (hour * 3600) - (minute * 60);

    const parsedHours = addLeadingZeroToTime(hour);
    const parsedMinutes = addLeadingZeroToTime(minute);
    const parsedSeconds = addLeadingZeroToTime(second);

    if (parsedHours > 0) {
        return `${parsedHours}:${parsedMinutes}:${parsedSeconds}`;
    }

    return `${parsedMinutes}:${parsedSeconds}`;
};

export const lightenDarkenColor = (hex, lum = 0) => {
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    // convert to decimal and change luminosity
    let rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }
    return rgb;
};
