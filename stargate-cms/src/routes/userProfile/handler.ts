import { RequestHandler } from "express";
import { DefaultParams } from "../types";
import payload from "payload";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "../../config";

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

// Initialize GoogleGenerativeAI

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const getCareerPath = async (interest) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  console.log("interest", interest);
  const prompt = `

  I am a user interested in ${interest} within the field of computer science. 
  Please identify and generate a specific domain or field that closely matches my interest. 
  Provide only the name of the domain or field, such as "Web Development", "Game Development", "Data Science", etc.
  Make sure the domain is highly relevant to the specified interest.`;
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  return text;
};

const predictCarrerPath: RequestHandler<DefaultParams, any, any> = async (
  req,
  res,
  _next
) => {
  try {
    const { data } = req.body;
    console.log(data);
    if(!data) res.send("data is undefined")
    const predictedDomain =await getCareerPath(JSON.stringify(data));
    console.log(predictedDomain);

    res.status(200).send({
      domain: predictedDomain,
    });
  } catch (err) {
    payload.logger.error(err.message);
    return res.status(500).send(err.message);
  }
};

const addUserDetails: RequestHandler<DefaultParams, any, any> = async (
  req,
  res,
  _next
) => {
  try {
    const { user, data } = req.body as { user: string; data: UserProfileData };

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

export { addUserDetails, predictCarrerPath };
