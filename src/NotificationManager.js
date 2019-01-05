export const hasNotificationSupport = () => {
    return "Notification" in window;
};

export const askForNotificationPermission = () => {
    Notification.requestPermission();
};

const _renderNotification = (user) => {
    const n = new Notification('Mobtimer', {
        tag: "mobtimer_notification",
        body: `It's ${user.name}'s turn!`,
        icon: user.image,
        silent: true,
        requireInteraction: true,
    });

    n.onclick = (e) => {
        console.log(e);
        try {
            window.focus();
        } catch (e) {
            console.error(e);
        }
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

// deprecated. not working.
//export const showNotification = (user) => {
//    if (!hasNotificationSupport()) {
//        throw new Error("Notification not supported!");
//    }
//    Notification.requestPermission().then((result) => {
//        if (result === 'granted') {
//            navigator.serviceWorker.ready.then((registration) => {
//                registration.showNotification('Mobtimer', {
//                    tag: "mobtimer_notification",
//                    body: `It's ${user.name}'s turn!`,
//                    icon: user.image,
//                    silent: true,
//                });
//            });
//        }
//    });
//};

