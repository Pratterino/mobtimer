const access = "8feb602c1ac889bc9e527db6150a857ec3f7f970dc0fc9444a8287417fc3b117";

const mapper = (image, user) => ({
    image,
    username: user.name,
    userLink: `${user.links.html}?utm_source=pratterino_mobtimer&utm_medium=referral`,
    unsplashedLink: 'https://unsplash.com/?utm_source=pratterino_mobtimer&utm_medium=referral',
});

export async function fetchBackgroundImage() {
    try {
        const response = await fetch("https://api.unsplash.com/photos/random?query=mountain&orientation=landscape&count=1&featured&client_id=8feb602c1ac889bc9e527db6150a857ec3f7f970dc0fc9444a8287417fc3b117", {
            method: "GET",
            headers: {
                Authorization: `Client-ID ${access}`,
                "Content-Type": "application/json",
            },
        }).then(response => response.json());
        return mapper(response[0].urls.full, response[0].user);
    } catch (e) {
        return mapper("https://images.unsplash.com/photo-1528920304568-7aa06b3dda8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80", {
            name: 'Rob Bates',
            links: {html: 'https://unsplash.com/@inksurgeon'},
        });
    }
}
