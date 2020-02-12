interface IUser {
    name: string
    image: string
}

let notification: Notification;

const _renderNotification = (user: IUser) => {
    closeNotification();
    notification = new Notification('Mobtimer.com', {
        tag: 'mobtimer-notification',
        body: `It's ${user.name}'s turn!`,
        icon: user.image,
        silent: true,
        requireInteraction: true,
    });

    notification.onclick = e => {
        try {
            window.focus();
        } catch (e) {
            console.error(e);
        }
    };
};

const hasNotificationSupport = () => {
    return 'Notification' in window;
};

const askForNotificationPermission = (callback: Function) => {
    if (hasNotificationSupport()) {
        Notification.requestPermission().then(response => callback(response));
    }
};

const hasAcceptedNotifications = (): boolean => {
    return hasNotificationSupport() && Notification.permission === 'granted';
};

const closeNotification = () => {
    if (notification) {
        notification.close();
    }
};

const showNotification = (user: IUser) => {
    if (!hasNotificationSupport()) {
        throw new Error('Notification not supported!');
    }

    if (Notification.permission === 'granted') {
        _renderNotification(user);
    }
};

export {
    hasNotificationSupport,
    askForNotificationPermission,
    hasAcceptedNotifications,
    closeNotification,
    showNotification,
}
