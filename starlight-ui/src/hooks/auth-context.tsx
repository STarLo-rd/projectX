/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import authService, {
  IUserAuthInfo,
  getCurrentUser,
} from "../services/authentication";
import { CurrentUser, IChangePasswordInfo, IResetPasswordInfo } from "../types";
import darkImage from "../images/image.png";
import lightImage from "../images/image.png";
interface AuthContextType {
  user: CurrentUser;
  credit: number;
  isDarkMode: any;
  currentImage: any;
  handleToggle: (checked: any) => any;
  setCurrentUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<IUserAuthInfo>;
  loginSSO: (ssoToken) => Promise<IUserAuthInfo>;
  sendResetRequest: (email: string) => any;
  verifyResetToken: (token: string) => any;
  resetPassword: (data: IChangePasswordInfo) => any;
  logout: () => void;
  verifyAccount: (token: string) => any;
  refreshToken: () => void;
  sendRequestAccount: (data: any) => any;
  getUserById: (id: string) => any;
  changeUserPassword: (data: IResetPasswordInfo) => any;
  deduceCredit:any;
}

/**
 * Utilizing `Context` to pass values related to user auth status
 * through the components tree
 */
export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

/**
 * Provider function that'll pass the user’s auth 'status' to the tree below
 * `children` - refers to the children components
 */
export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<CurrentUser>({} as CurrentUser);
  const [credit, setCredit] = useState<number>(0);
  const [isDarkMode, setIsDarkMode] = useState<any>(false);
  const [currentImage, setCurrentImage] = useState<any>(
    isDarkMode ? darkImage : lightImage
  );
  useEffect(() => {
    setCurrentImage(isDarkMode ? darkImage : lightImage);
  }, [isDarkMode]);
  const refreshToken = async () => {
    const res = await authService.refreshToken();
    if (res.refreshedToken) {
      authService.setRefreshToken(res.refreshedToken);
    }
  };

  const login = async (email: string, password: string) => {
    const res = await authService.login(email, password);
    if (res.token) {
      authService.setAccessToken(res.token);
      await setCurrentUser();
    }
    return res;
  };

  const loginSSO = async (ssoToken) => {
    const res = await authService.loginSSO(ssoToken);
    if (res.token) {
      authService.setAccessToken(res.token);
      await setCurrentUser();
    }
    return res;
  };

  const sendResetRequest = async (email: string) => {
    const res = await authService.sendResetRequest({ email: email });
    return res;
  };

  const verifyResetToken = async (token: string) => {
    const res = await authService.verifyResetToken(token);
    return res;
  };

  const resetPassword = async (data: IChangePasswordInfo) => {
    const res = await authService.resetPassword(data);
    return res;
  };

  const handleToggle = (checked: boolean) => {
    setIsDarkMode(checked);
  };

  const logout = async () => {
    const res = await authService.logout();
    window.localStorage.clear();
    return res;
  };

  const setCurrentUser = async () => {
    const userData = await getCurrentUser();
    setUser(userData?.user);
    setCredit(userData?.user?.credits || 0);
  };

  const deduceCredit = async (deducedValue: number) => {
    const updatedCredit = credit - deducedValue;
    setCredit(updatedCredit);
  };

  const sendRequestAccount = async (data: any) => {
    const res = await authService.sendRequestAccount(data);
    return res;
  };

  const getUserById = async (id: string) => {
    const res = await authService.getUserById(id);
    return res;
  };

  const verifyAccount = async (token: string) => {
    const res = await authService.verifyAccount(token);
    return res;
  };

  const changeUserPassword = async (data: IResetPasswordInfo) => {
    const res = await authService.changeUserPassword(data);
    return res;
  };

  const value = {
    user,
    setCurrentUser,
    credit,
    deduceCredit,
    login,
    loginSSO,
    logout,
    sendResetRequest,
    verifyResetToken,
    resetPassword,
    refreshToken,
    sendRequestAccount,
    getUserById,
    verifyAccount,
    changeUserPassword,
    isDarkMode,
    handleToggle,
    currentImage,
  };

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}

/**
 * This allows any function component that is the child of the Provider
 * consumes the user's auth context object.
 */
export function useAuth(): AuthContextType {
  return useContext(AuthContext);
}

/**
 * Wrapper to protected routes.
 */
export function RequireAuth({ children }: { children: JSX.Element }): any {
  const accessToken = authService.getAccessToken();
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
