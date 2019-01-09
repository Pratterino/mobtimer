let notification;

export const hasNotificationSupport = () => {
    return "Notification" in window;
};

export const askForNotificationPermission = () => {
    if (hasNotificationSupport()) {
        Notification.requestPermission();
    }
};

const _renderNotification = (user) => {
    notification = new Notification('Mobtimer', {
        tag: "mobtimer-notification",
        body: `It's ${user.name}'s turn!`,
        icon: user.image,
        silent: true,
        requireInteraction: true,
    });

    notification.onclick = (e) => {
        console.log(e, e.action);
        try {
            window.focus();
            closeNotification();
        } catch (e) {
            console.error(e);
        }
    }
};


export const closeNotification = () => {
    if (notification) {
        notification.close();
    }
};

export const showNotification = (user) => {
    if (!hasNotificationSupport()) {
        throw new Error("Notification not supported!");
    }

    if (Notification.permission === "granted") {
        _renderNotification(user);
    }
};
