/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { PROJECTX_API_URL } from "../constants/global";
import { apiUrls, homeUrl, loginUrl, NOTIFY_DURATION, TOKEN } from "../constants/constant-values";
import authService, { refreshToken } from "./authentication";
import { notification } from "antd";


const baseURL = PROJECTX_API_URL;
let isNotificationShown = false;


const AxiosInstance = axios.create({
    baseURL,
});


const checkJWTExpired = () => {
    const jwt = localStorage.getItem(TOKEN);
    if (!jwt) {
        return false;
    }

    const payload: any = jwtDecode(jwt);
    const expired = Date.now() >= payload.exp * 1000;
    return expired;
};

AxiosInstance.interceptors.request.use(
    async (config) => {
        const jwt = localStorage.getItem(TOKEN);
        console.log(jwt)
        if (apiUrls.includes(config.url as string)) {
            return config;
        }
        if (
            jwt &&
            window.location.pathname !== loginUrl &&
            window.location.pathname !== homeUrl
        ) {
            const payload: any = jwtDecode(jwt);
            const isExpired: any = payload.exp * 1000 - Date.now();
            if (isExpired < 300000) {
                try {
                    const data = await refreshToken();
                    console.log("refreshToken triggered", data);
                    authService.setAccessToken(data.refreshedToken || "");
                    AxiosInstance.defaults.headers.common[
                        "Authorization"
                    ] = `JWT ${data.refreshedToken}`;
                } catch (error) {
                    console.error("Refresh Token failed:", error);
                }
            }
        }
        return config;
    },
    (error) => {
        console.error("Error in API request:", error);
        return Promise.reject(error);
    }
);

AxiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (
            (error.response.status === 401 || error.response.status === 403) &&
            checkJWTExpired()
        ) {
            if (!isNotificationShown) {
                isNotificationShown = true;
                notification.error({
                    message: "Session was expired, Please login again",
                    duration: NOTIFY_DURATION,
                });
            }
            window.localStorage.clear();
            setTimeout(() => {
                window.location.replace("/login");
            }, 2000);
        }
        return Promise.reject(error);
    }
);

export default AxiosInstance;



