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


// types.ts
export interface AcademicPerformance {
    operatingSystems: number;
    algorithms: number;
    programmingConcepts: number;
    softwareEngineering: number;
    computerNetworks: number;
    electronics: number;
    computerArchitecture: number;
    mathematics: number;
    communicationSkills: number;
}

export interface UserProfileData {
    academicPerformances: AcademicPerformance;
    workingHoursPerDay: number;
    interestedBooks: string[];
    salaryRange: string;
    relationship: boolean;
    behavior: string;
    workPreference: string;
    salaryOrWorkHard: string;
    teamworkExperience: boolean;
    introvert: boolean;
    suggestedJobRole?: string;
}

// GET response from the Payload CMS API when using queries
export type PaginatedDocs<T = any> = {
    docs: T[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
};

export type PatchResponse<T = any> = {
    message: string;
    doc: T;
};

export type PostResponse<T = any> = PatchResponse<T>;

export type DeepPartial<T> = T extends object
    ? {
        [P in keyof T]?: DeepPartial<T[P]>;
    }
    : T;