const geoCountryCodeOfUser = async (): Promise<string> => {
    try {
        return await fetch('https://extreme-ip-lookup.com/json/')
            .then(res => res.json())
            .then(response => response.countryCode);
    } catch (e) {
        return 'N/A';
    }
};

export { geoCountryCodeOfUser };
