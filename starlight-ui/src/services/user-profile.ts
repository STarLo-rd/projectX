/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { notification } from "antd";
import { getAuthorizationHeader } from "../utils/utils";
import AxiosInstance from "./axios-instance";
import qs from 'qs'


interface UserProfilePayload {
    user: string;
    data: any;
    suggestedJobRole?: string;
    academicPerformanceOverall?: string;
}


const addUserInterests = async (payload: UserProfilePayload) => {
    try {
        const requestPayload: UserProfilePayload = {
            user: payload.user || "",
            data: payload || "",
            suggestedJobRole: payload.suggestedJobRole || "",
            academicPerformanceOverall: payload.academicPerformanceOverall || "",
        };


        const { data } = await AxiosInstance.post(
            "/user-profiles",
            requestPayload,
            {
                headers: getAuthorizationHeader(),
            }
        );
        console.log(data)
        return data;
    } catch (err: any) {
        notification.error({ message: err.message });
        return err;
    }
};


const modifyUserInterests = async (payload: UserProfilePayload) => {
    try {
        // Fetch the existing user profile
        const userProfile = await getUserProfileByUserId(payload.user);

        // Update the fields in the fetched user profile
        const updatedUserProfile = {
            ...userProfile,
            user: payload.user, // Set the user relationship using the userId
            data: payload || userProfile.data,
            suggestedJobRole: payload.suggestedJobRole || userProfile.suggestedJobRole,
            academicPerformanceOverall: payload.academicPerformanceOverall || userProfile.academicPerformanceOverall,
        };

        // Send a PUT request with the updated user profile data
        const { data } = await AxiosInstance.put(`/user-profiles/${userProfile.id}`, updatedUserProfile, {
            headers: getAuthorizationHeader(),
        });

        console.log(data);
        return data;
    } catch (err: any) {
        notification.error({ message: err.message });
        throw err;
    }
};
const getUserProfileByUserId = async (userId: string) => {
    try {
        const query = {
            user: {
                equals: userId
            }
        }
        const stringifiedQuery = qs.stringify(
            {
                where: query, // ensure that `qs` adds the `where` property, too!
            },
            { addQueryPrefix: true },
        )
        const { data } = await AxiosInstance.get(`/user-profiles${stringifiedQuery}`, {
            headers: getAuthorizationHeader(),
        });

        if (data.docs.length > 0) {
            console.log(data.docs)
            return data.docs[0];
        } else {
            throw new Error(`No user profile found for userId: ${userId}`);
        }
    } catch (err: any) {
        notification.error({ message: err.message });
        throw err;
    }
};
export { addUserInterests, modifyUserInterests, getUserProfileByUserId };
