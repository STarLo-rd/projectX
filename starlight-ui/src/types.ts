/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RouteProps } from "react-router-dom";

export type IRoutes = RouteProps & {
    id: string;
    icon?: JSX.Element;
    name: string;
    breadcrumbs: string[];
};
export type CurrentUser = User;

// TO DO: below types are copy-pasted from the payload cms repo
export interface User {
    tenants: any;
    id: string;
    name?: string;
    // roles?: string[] | Role[];
    wallet: {
        address?: string;
        publicKey?: string;
        extendedPublicKey?: string;
    };
    enableAPIKey?: boolean;
    apiKey?: string;
    apiKeyIndex?: string;
    email: string;
    resetPasswordToken?: string;
    resetPasswordExpiration?: string;
    _verified?: boolean;
    _verificationToken?: string;
    loginAttempts?: number;
    lockUntil?: string;
    createdAt: string;
    updatedAt: string;
}


export type IResetPasswordInfo = {
    token: string;
    password: string;
};


export type IChangePasswordInfo = {
    token: string;
    password: string;
};