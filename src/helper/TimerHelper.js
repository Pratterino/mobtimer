const addLeadingZeroToTime = (time) => {
    return time.toString().length === 1 ? `0${time}` : time;
};

export const getParsedTimeRemaining = (seconds) => {
    const parsedMinutes = addLeadingZeroToTime(Math.floor(seconds / 60));
    const parsedSeconds = addLeadingZeroToTime(seconds - parsedMinutes * 60);
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
