/* eslint-disable @typescript-eslint/no-explicit-any */
import { message, notification } from "antd";
import AxiosInstance from "./axios-instance";
import { getAuthorizationHeader } from "../utils/utils";
import qs from "qs";
import { useAuth } from "../hooks/auth-context";

interface RoadmapData {
  interests: [];
  user: string;
  // data: string;
}

interface RoadmapResponse {
  id: string;
  // data: RoadmapData;
  interest: [];
}

// Function to check if a string is valid JSON
function isValidJSON(jsonString: string) {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return false;
  }
}
async function generateRoadmap(interest: string, deduceCredit?: any) {
  try {
    const response = await AxiosInstance.post(
      "/roadmap/generate",
      { interest },
      {
        headers: getAuthorizationHeader(),
      }
    );
    const { data } = response;
    if (isValidJSON(data.roadmap)) {
      const jsonObject = JSON.parse(data.roadmap);
      if (deduceCredit) deduceCredit(1); // Deduct 1 credit when generating a roadmap
      return jsonObject;
    } else {
      if (data.roadmap.length > 500) message.warning("please try again");
      else message.warning(data.roadmap);
      return null;
    }
  } catch (error) {
    handleRequestError(error);
  }
}

async function getUserRoadmap(userEmail: string): Promise<RoadmapData | null> {
  try {
    console.log(userEmail);
    const query = qs.stringify(
      { where: { user: { equals: userEmail } } },
      { addQueryPrefix: true }
    );
    const { data } = await AxiosInstance.get(`/roadmaps/${query}`, {
      headers: getAuthorizationHeader(),
    });
    if (data.docs && data.docs.length > 0) {
      return data.docs[0];
    }
    return null;
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
}

async function saveRoadmap(
  user: { email: string },
  interestTitle: string,
  interestData: string
): Promise<RoadmapResponse> {
  try {
    // Fetch the existing roadmap for the user
    const userRoadmap = await getUserRoadmap(user.email);
    const hasRoadmap = !!userRoadmap;

    // Prepare the interest to be added or updated
    const newInterest = { title: interestTitle, data: interestData };
    // If a roadmap exists, modify the existing interests or add a new one
    if (hasRoadmap) {
      // Check if the interest already exists
      const existingInterestIndex = userRoadmap.interests.findIndex(
        (i) => i.title === interestTitle
      );
      if (existingInterestIndex !== -1) {
        // Update existing interest
        userRoadmap.interests[existingInterestIndex].data = interestData;
      } else {
        // Add new interest if there are less than 5
        if (userRoadmap.interests.length < 5) {
          userRoadmap.interests.push(newInterest);
        } else {
          throw new Error("Maximum of 5 interests allowed per user.");
        }
      }
      // Prepare request to update the existing roadmap
      const requestData = { interests: userRoadmap.interests };
      const { data } = await AxiosInstance.put(
        `/roadmaps/${userRoadmap.id}`,
        requestData,
        { headers: getAuthorizationHeader() }
      );
      return data;
    } else {
      // Create a new roadmap with the initial interest
      const requestData = { user: user.email, interests: [newInterest] };
      const { data } = await AxiosInstance.post("/roadmaps", requestData, {
        headers: getAuthorizationHeader(),
      });
      return data;
    }
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
}

async function deleteRoadmapInterest(
  userEmail: string,
  interestTitle: string
): Promise<void> {
  try {
    // Fetch the existing roadmap
    const roadmapResponse = await getUserRoadmap(userEmail);

    if (!roadmapResponse.interests || roadmapResponse.interests.length === 0) {
      throw new Error("No roadmap found for the specified user.");
    }

    const roadmap = roadmapResponse;
    // Filter out the interest to be deleted
    const updatedInterests = roadmap.interests.filter(
      (interest) => interest.title !== interestTitle
    );

    // Update the roadmap with the new interests array
    let updateResponse;
    if (updatedInterests.length == 0) {
      updateResponse = await AxiosInstance.delete(`/roadmaps/${roadmap.id}`, {
        headers: getAuthorizationHeader(),
      });
    } else {
      updateResponse = await AxiosInstance.patch(
        `/roadmaps/${roadmap.id}`,
        {
          interests: updatedInterests,
        },
        {
          headers: getAuthorizationHeader(),
        }
      );
    }

    notification.success({ message: "Interest deleted successfully" });
    return updateResponse.data;
  } catch (error) {
    notification.error({
      message: error.message || "Failed to delete the interest",
    });
    console.error("Failed to delete interest:", error);
  }
}

function handleRequestError(error: any) {
  if (
    error.response &&
    error.response?.data &&
    error.response.data.error === "Insufficient credits" &&
    error.response.statusText === "Payment Required"
  ) {
    notification.error({
      message: "You don't have sufficient credits to complete this action.",
      duration: 5,
    });
  } else if (
    error &&
    error.code === "ERR_NETWORK" &&
    error.message === "Network Error"
  ) {
    notification.error({
      message:
        "Apologies, our server is currently experiencing technical difficulties. Please try again later.",
      duration: 5,
    });
  } else if (error.response && error.response.status === 500) {
    notification.error({
      message:
        "Apologies, our server is currently experiencing technical difficulties. Please try again later.",
      duration: 5,
    });
  } else {
    notification.error({
      message:
        "Oops! Something went wrong while processing your request. Please try again later.",
      duration: 5,
    });
  }
}

export { generateRoadmap, saveRoadmap, getUserRoadmap, deleteRoadmapInterest };
