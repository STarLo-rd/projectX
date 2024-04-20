/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { PROJECTX_API_URL } from "../constants/global";
import {
  apiUrls,
  homeUrl,
  loginUrl,
  NOTIFY_DURATION,
  signupUrl,
  TOKEN,
} from "../constants/constant-values";
import authService, { refreshToken } from "./authentication";
import { notification } from "antd";

const baseURL = PROJECTX_API_URL;
let isNotificationShown = false;

const AxiosInstance = axios.create({
  baseURL,
});

interface DecodedToken {
  exp: number;
}

const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<DecodedToken>(token);
    return Date.now() >= exp * 1000; // Check if the current time is greater than the expiration time
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return true; // Assume expired if there's a decoding error
  }
};

AxiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem(TOKEN) || "";
    if (apiUrls.includes(config.url as string)) {
      return config;
    }

    if (
      isTokenExpired(token) &&
      token &&
     ( window.location.pathname !== loginUrl && window.location.pathname !== signupUrl )
    ) {
      if (!isNotificationShown) {
        isNotificationShown = true;
        notification.error({
          message: "Session expired. Please log in again.",
          duration: NOTIFY_DURATION,
        });
        authService.logout(); // Assuming logout will clear localStorage and handle cleanup
        setTimeout(() => (window.location.href = loginUrl), 2000);
        // return Promise.reject(new Error("Token expired"));
      }
    } else {
      // Token is about to expire, refresh it
      const { exp } = jwtDecode<DecodedToken>(token || "");
      const timeLeft = exp * 1000 - Date.now();
      if (timeLeft < 300000 && timeLeft > 0 ) {
        // Less than 5 minutes remaining
        try {
          const { refreshedToken } = await refreshToken();
          authService.setAccessToken(refreshedToken || "");
          AxiosInstance.defaults.headers.common[
            "Authorization"
          ] = `JWT ${refreshedToken}`;
        } catch (error) {
          console.error("Failed to refresh token:", error);
          return Promise.reject(error);
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

export default AxiosInstance;
