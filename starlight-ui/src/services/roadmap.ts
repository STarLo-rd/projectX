/* eslint-disable @typescript-eslint/no-explicit-any */
import { notification } from "antd";
import AxiosInstance from "./axios-instance";
import { getAuthorizationHeader } from "../utils/utils";
import qs from "qs";

interface RoadmapData {
  interests: [];
  user: string;
  // data: string;
}

interface RoadmapResponse {
  id: string;
  // data: RoadmapData;
  interest: []
}

async function generateRoadmap(interest: string) {
  try {
    const response = await AxiosInstance.post("/roadmap/generate", { interest }, {
      headers: getAuthorizationHeader(),
    });
    const { data } = response;
    const jsonObject = data ? JSON.parse(data.text) : null;
    return jsonObject;
  } catch (error) {
    handleRequestError(error);
  }
}

async function getUserRoadmap(userEmail: string): Promise<RoadmapData | null> {
  try {
    const query = qs.stringify({ where: { user: { equals: userEmail } } }, { addQueryPrefix: true });
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

async function saveRoadmap(user: { email: string }, interestTitle: string, interestData: string): Promise<RoadmapResponse> {
  try {
    // Fetch the existing roadmap for the user
    const userRoadmap = await getUserRoadmap(user.email);
    const hasRoadmap = !!userRoadmap;

    // Prepare the interest to be added or updated
    const newInterest = { title: interestTitle, data: interestData };
    // If a roadmap exists, modify the existing interests or add a new one
    if (hasRoadmap) {
      // Check if the interest already exists
      const existingInterestIndex = userRoadmap.interests.findIndex(i => i.title === interestTitle);
      if (existingInterestIndex !== -1) {
        // Update existing interest
        userRoadmap.interests[existingInterestIndex].data = interestData;
      } else {
        // Add new interest if there are less than 5
        if (userRoadmap.interests.length < 5) {
          userRoadmap.interests.push(newInterest);
        } else {
          throw new Error('Maximum of 5 interests allowed per user.');
        }
      }
      // Prepare request to update the existing roadmap
      const requestData = { interests: userRoadmap.interests };
      console.log(requestData)
      const { data } = await AxiosInstance.put(`/roadmaps/${userRoadmap.id}`, requestData, { headers: getAuthorizationHeader() });
      return data;
    } else {
      // Create a new roadmap with the initial interest
      const requestData = { user: user.email, interests: [newInterest] };
      const { data } = await AxiosInstance.post('/roadmaps', requestData, { headers: getAuthorizationHeader() });
      return data;
    }
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
}


async function deleteRoadmapInterest(userEmail: string, interestTitle: string): Promise<void> {
  try {
    // Fetch the existing roadmap
    const roadmapResponse = await getUserRoadmap(userEmail);
    console.log(roadmapResponse)
    
    if (!roadmapResponse.interests || roadmapResponse.interests.length === 0) {
      throw new Error('No roadmap found for the specified user.');
    }

    const roadmap = roadmapResponse;
    // Filter out the interest to be deleted
    const updatedInterests = roadmap.interests.filter(interest => interest.title !== interestTitle);

    console.log(updatedInterests)
    // Update the roadmap with the new interests array
    const updateResponse = await AxiosInstance.patch(`/roadmaps/${roadmap.id}`, {
      interests: updatedInterests
    }, {
      headers: getAuthorizationHeader(),
    });

    notification.success({ message: 'Interest deleted successfully' });
    return updateResponse.data;
  } catch (error) {
    notification.error({ message: error.message || 'Failed to delete the interest' });
    console.error('Failed to delete interest:', error);
  }
}

function handleRequestError(error: any) {
  notification.error({ message: error.message});
}

export { generateRoadmap, saveRoadmap, getUserRoadmap, deleteRoadmapInterest };
