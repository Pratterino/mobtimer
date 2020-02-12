
interface IImage {
    full: string
    small: string
}

interface IUser {
    name: string
    links: {
        html: string
    }
}

const mapper = (image: IImage, user: IUser) => ({
    image: image.full,
    imageSmall: image.small,
    username: user.name,
    userLink: `${user.links.html}?utm_source=pratterino_mobtimer&utm_medium=referral`,
    unsplashedLink: 'https://unsplash.com/?utm_source=pratterino_mobtimer&utm_medium=referral',
});

export const fallbackImage = () =>
    mapper(
        {
            full: './assets/images/bg-image.jpg',
            small: './assets/images/bg-image.jpg',
        },
        {
            name: 'Rob Bates',
            links: { html: 'https://unsplash.com/@inksurgeon' },
        },
    );

export async function fetchBackgroundImage() {
    const id = '8feb602c1ac889bc9e527db6150a857ec3f7f970dc0fc9444a8287417fc3b117';
    try {
        const response = await fetch(
            `https://api.unsplash.com/photos/random?query=mountain&orientation=landscape&count=1&featured&client_id=${id}&auto=format&fit=crop&w=1080`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Client-ID ${id}`,
                    'Content-Type': 'application/json',
                },
            },
        ).then(response => response.json());
        return mapper(response[0].urls, response[0].user);
    } catch (e) {
        return fallbackImage();
    }
}
