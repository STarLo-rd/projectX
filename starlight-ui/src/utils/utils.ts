import { TOKEN } from "../constants/constant-values";

export const getAuthorizationHeader = () => {
    const token = localStorage.getItem(TOKEN);
    console.log(token);
    if (!token) {
        throw new Error("Could not find access token");
    }
    return {
        Authorization: `JWT ${token}`,
    };
};
