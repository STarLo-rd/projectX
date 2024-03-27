export interface User {
    id: string;
    lastLoggedInTenant?: (string | null)
    updatedAt: string;
    createdAt: string;
    enableAPIKey?: boolean | null;
    apiKey?: string | null;
    apiKeyIndex?: string | null;
    email: string;
    resetPasswordToken?: string | null;
    resetPasswordExpiration?: string | null;
    salt?: string | null;
    hash?: string | null;
    loginAttempts?: number | null;
    lockUntil?: string | null;
    password: string | null;
}