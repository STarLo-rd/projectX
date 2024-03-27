import { RequestHandler } from "express";
import { DefaultParams } from "../types";
import payload from "payload";

interface UserProfileData {
    user: string; // Reference to the User collection
    workingHoursPerDay: number;
    interestedBooks: string[];
    salaryRange: string;
    relationship: boolean;
    behavior: string;
    workPreference: string;
    salaryOrWorkHard: string;
    teamworkExperience: boolean;
    introvert: boolean;
}

const addUserDetails: RequestHandler<DefaultParams, any, any> = async (
    req,
    res,
    _next
) => {
    try {
        const { user, data } = req.body as { user: string; data: UserProfileData };
        console.log(user, data);

        // Check if a user profile already exists for the provided user ID
        const existingProfile = await payload.find({
            collection: "user-profiles",
            where: {
                id: {
                    equals: user,
                },
            },
        });

        if (existingProfile.docs.length) {
            // Update existing profile
            const updatedProfile = await payload.update({
                collection: "user-profiles",
                id: existingProfile[0].id,
                data: {
                    data,
                },
            });
            return res
                .status(200)
                .send({ data: "User profile updated successfully" });
        } else {
            // Create a new profile
            const newProfile = await payload.create({
                collection: "user-profiles",
                data: { user, ...data },
            });
            return res
                .status(201)
                .send({ data: "User profile created successfully" });
        }
    } catch (err) {
        payload.logger.error(err.message);
        payload.logger.error(err.data);
        return res.status(500).send(err.message);
    }
};

export { addUserDetails };
