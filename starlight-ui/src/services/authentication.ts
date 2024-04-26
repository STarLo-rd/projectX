/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { CurrentUser, IChangePasswordInfo, IResetPasswordInfo } from "../types";
import { LOCAL_API_URL } from "../constants/global";
import AxiosInstance from "./axios-instance";
import { REFRESH_TOKEN, TOKEN } from "../constants/constant-values";
import qs from "qs";

interface ILoginInfo {
  email: string;
  password: string;
}

export interface IUserAuthInfo {
  token?: string | null;
  accessToken?: string | null;
  refreshedToken?: string | null;
  error?: string;
}

/**
 * Get AccessToken
 * return accessToken from localStorage
 */
export const getAccessToken = (): string | null => {
  return window.localStorage.getItem(TOKEN);
};

/**
 * Set AccessToken
 */
export const setAccessToken = (token: string): void => {
  window.localStorage.setItem(TOKEN, token);
};

export const setRefreshToken = (refreshToken: string): void => {
  window.localStorage.setItem(REFRESH_TOKEN, refreshToken);
};

export const getRefreshToken = (): string | null => {
  return window.localStorage.getItem(REFRESH_TOKEN);
};
/**
 * Handle the user authentication on login.
 * On successful auth, user `token` is returned from the backend otherwise an error.
 */
export const login = async (
  email: ILoginInfo["email"],
  password: ILoginInfo["password"]
): Promise<IUserAuthInfo> => {
  try {
    const { data } = await AxiosInstance.post(
      `/users/login`,
      { email: email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  } catch (err) {
    throw new Error("Login failed");
  }
};

export const loginSSO = async (ssoToken): Promise<IUserAuthInfo> => {
  try {
    const { data } = await AxiosInstance.post(
      `/auth/sso`,
      { ssoToken: ssoToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (err) {
    throw new Error("Login failed");
  }
};

/**
 * Destroy the session data.
 */
export const logout = async () => {
  try {
    const token = localStorage.getItem(TOKEN);
    const { data } = await axios.post<any>(
      `${LOCAL_API_URL}/users/logout`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      }
    );
    return data;
  } catch (err) {
    console.error("Logout error: ", err);
  }
};

/**
 * Refresh AccessToken with refreshToken
 */
export const refreshToken = async (): Promise<IUserAuthInfo> => {
  const token = localStorage.getItem(TOKEN);
  if (token) {
    try {
      const { data } = await axios.post<any>(
        `${LOCAL_API_URL}/users/refresh-token`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        }
      );
      console.log("refresh token", data);
      return data;
    } catch (err) {
      throw new Error("Refresh Token failed");
    }
  }
  return {
    token: null,
    refreshedToken: null,
    error: "You should re-login.",
  };
};

export const sendResetRequest = async (data: { email: string }) => {
  return await axios.post(`${LOCAL_API_URL}/users/forgot-password`, data, {
    // headers: getXTenantHeader(),
  });
};

export const verifyResetToken = async (id: string) => {
  return await axios.post(`${LOCAL_API_URL}/users/verify/${id}`, {
    // headers: getXTenantHeader(),
  });
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem(TOKEN);
  if (token) {
    const { data } = await AxiosInstance.get<{
      user: CurrentUser;
    }>(`/users/me`, {
      headers: {
        Authorization: `JWT ${token}`,
        Accept: "application/json",
        // ...getXTenantHeader(),
      },
    });
    return data;
  }
  return { user: {} as CurrentUser };
};

export const sendRequestAccount = async (data: any) => {
  return await AxiosInstance.post(`/request-account`, data, {
    headers: {
      Accept: "application/json",
      // ...getXTenantHeader(),
    },
  });
};

export const getUserById = async (id: string) => {
  const { data } = await axios.get(`${LOCAL_API_URL}/users/${id}`, {
    headers: {
      Accept: "application/json",
      // ...getXTenantHeader(),
    },
  });
  return data;
};

export const changeUserPassword = async (payload: IResetPasswordInfo) => {
  const { data } = await AxiosInstance.post(`/users/reset-password`, payload, {
    headers: {
      Accept: "application/json",
      // ...getXTenantHeader(),
    },
  });
  return data;
};

export const verifyAccount = async (id: string) => {
  return await AxiosInstance.post(`/users/verify/${id}`, {
    // Headers: getXTenantHeader(),
  });
};

export const resetPassword = async (payload: IChangePasswordInfo) => {
  const { data } = await AxiosInstance.post(`/users/reset-password`, payload, {
    headers: {
      Accept: "application/json",
      // ...getXTenantHeader(),
    },
  });
  return data;
};

const fetchUserByEmail = async (userEmail) => {
  try {
    const query = {
      email: {
        equals: userEmail,
      },
    };
    const stringifiedQuery = qs.stringify(
      {
        where: query, // ensure that `qs` adds the `where` property, too!
      },
      { addQueryPrefix: true }
    );
    const { data } = await AxiosInstance.get(`/users${stringifiedQuery}`);

    if (data.docs.length > 0) {
      console.log(data.docs);
      console.log(data.docs[0].password);
      return data.docs[0];
    } else {
      throw new Error(`No user found for email: ${userEmail}`);
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
const authService = {
  getAccessToken,
  setAccessToken,
  setRefreshToken,
  getRefreshToken,
  refreshToken,
  login,
  loginSSO,
  sendResetRequest,
  verifyResetToken,
  resetPassword,
  logout,
  sendRequestAccount,
  getUserById,
  changeUserPassword,
  verifyAccount,
  fetchUserByEmail,
};

export default authService;
