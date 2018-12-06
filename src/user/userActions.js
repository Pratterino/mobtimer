import actionTypes from "./../actionTypes";

export const addUser = (name) => {
    const user = {
        name,
        image: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/12/11/naturo-monkey-selfie.jpg",
    };

    return {
        type: actionTypes.ADD_USER,
        user,
    }
};
