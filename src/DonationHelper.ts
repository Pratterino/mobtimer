const geoCountryCodeOfUser = async () => {
    return await fetch('https://extreme-ip-lookup.com/json/')
        .then(res => res.json())
        .then(response => response.countryCode);
};

export {
    geoCountryCodeOfUser,
};