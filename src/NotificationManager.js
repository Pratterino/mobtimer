let notification;

export const hasNotificationSupport = () => {
    return 'Notification' in window;
};

export const askForNotificationPermission = callback => {
    if (hasNotificationSupport()) {
        Notification.requestPermission().then(response => callback(response));
    }
};

export const hasAcceptedNotifications = () => {
    return hasNotificationSupport() && Notification.permission === 'granted';
};

const _renderNotification = user => {
    closeNotification();
    notification = new Notification('Mobtimer', {
        tag: 'mobtimer-notification',
        body: `It's ${user.name}'s turn!`,
        icon: user.image,
        silent: true,
        requireInteraction: true,
    });

    notification.onclick = e => {
        console.log(e, e.action);
        try {
            window.focus();
        } catch (e) {
            console.error(e);
        }
    };
};

export const closeNotification = () => {
    if (notification) {
        notification.close();
    }
};

export const showNotification = user => {
    if (!hasNotificationSupport()) {
        throw new Error('Notification not supported!');
    }

    if (Notification.permission === 'granted') {
        _renderNotification(user);
    }
};
