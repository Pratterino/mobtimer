export const addLeadingZeroToTime = (time: number) => {
    return time.toString().length === 1 ? `0${time}` : time;
};

export const changeFavicon = (imageUrl: string) => {
    let selector: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
    if (selector && selector.href) {
        selector.setAttribute('href', imageUrl);
    }
};

export function getPercentageLeftOfTime(currentTime: number, sessionLength: number): number {
    return (currentTime / sessionLength) * 100;
}

export const getParsedTimeRemaining = (seconds: number): string => {
    const sec_num = parseInt(String(seconds), 10);
    const hour = Math.floor(sec_num / 3600);
    const minute = Math.floor((sec_num - hour * 3600) / 60);
    const second = sec_num - hour * 3600 - minute * 60;

    const parsedHours = addLeadingZeroToTime(hour);
    const parsedMinutes = addLeadingZeroToTime(minute);
    const parsedSeconds = addLeadingZeroToTime(second);

    if (parsedHours > 0) {
        return `${parsedHours}:${parsedMinutes}:${parsedSeconds}`;
    }

    return `${parsedMinutes}:${parsedSeconds}`;
};

export function getValueFromCSSVariable(variable: string): string {
    return getComputedStyle(document.body).getPropertyValue(variable);
}

export const lightenDarkenColor = (hex: string, lum: number = 0): string => {
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    // convert to decimal and change luminosity
    let rgb = '#',
        c,
        i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
        rgb += ('00' + c).substr(c.length);
    }
    return rgb;
};
