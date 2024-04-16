/* eslint-disable @typescript-eslint/no-explicit-any */
import { notification } from "antd";
import AxiosInstance from "./axios-instance";
import { getAuthorizationHeader } from "../utils/utils";
import qs from "qs";

interface RoadmapData {
  user: string;
  data: string;
}

interface RoadmapResponse {
  id: string;
  data: RoadmapData;
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
    if (data.docs.length > 0) {
      return data.docs[0];
    }
    return null;
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
}

async function saveRoadmap(user: { email: string }, treeData: string): Promise<RoadmapResponse> {
  try {
    const userRoadmap = await getUserRoadmap(user.email);
    const hasRoadmap = !!userRoadmap;

    const requestData: RoadmapData = { user: user.email, data: treeData };

    const endpoint = hasRoadmap ? `/roadmaps/${userRoadmap?.id}` : '/roadmaps';
    const requestMethod = hasRoadmap ? AxiosInstance.put : AxiosInstance.post;

    const { data } = await requestMethod(endpoint, requestData, { headers: getAuthorizationHeader() });
    return data;
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
}

function handleRequestError(error: any) {
  notification.error({ message: error.response.data.error });
}

export { generateRoadmap, saveRoadmap, getUserRoadmap };
