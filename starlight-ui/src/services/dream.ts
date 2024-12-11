/* eslint-disable @typescript-eslint/no-explicit-any */
import { message, notification } from "antd";
import { getAuthorizationHeader } from "../utils/utils";
import AxiosInstance from "./axios-instance";
import qs from "qs";

// Function to check if a string is valid JSON
function isValidJSON(jsonString: string) {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return false;
  }
}

async function generateDream(dream: string, deduceCredit?: any) {
  try {
    const response = await AxiosInstance.post(
      "/dream/process-dream",
      { dream },
      {
        headers: getAuthorizationHeader(),
      }
    );
    const { data } = response;
    if (isValidJSON(data.result)) {
      const jsonObject = JSON.parse(data.result);
      if (deduceCredit) deduceCredit(1); // Deduct 1 credit when generating a roadmap
      return jsonObject[0];
    } else {
      if (data.roadmap.length > 500) message.warning("please try again");
      else message.warning(data.result);
      return null;
    }
  } catch (error) {
    handleRequestError(error);
  }
}

async function getUserDream(userEmail: string): Promise<any | null> {
  try {
    const query = qs.stringify(
      { where: { user: { equals: userEmail } } },
      { addQueryPrefix: true }
    );
    const { data } = await AxiosInstance.get(`/dreams/${query}`, {
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

const getCurrentDay = () => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDate = new Date();
  const currentDayIndex = currentDate.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  return daysOfWeek[currentDayIndex];
};

async function saveHistory(user: { email: string }, habit): Promise<any> {
  try {
    const userDream = await getUserDream(user.email);
    // console.log("userdream", userDream);
    const hasDream = !!userDream;

    if (hasDream) {
      // Update the existing dream data with the new history array
      const currentDay = getCurrentDay();
      const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in the format 'YYYY-MM-DD'
      console.log("hasdream", hasDream);
      // Check if an entry for the current date already exists
      console.log("history", userDream.history);
      const existingHistoryIndex = userDream.history.findIndex(
        (entry) => entry.date.split("T")[0] === currentDate
      );

      console.log("existingIndex", existingHistoryIndex);
      if (existingHistoryIndex == -1) {
        const updatedHistory = [...userDream.history];
        const existingHabits =
          updatedHistory[0].habits || [];

        if (!existingHabits.includes(habit)) {
          updatedHistory[0].habits = [
            ...existingHabits,
            habit,
          ];
        }

        const updatedDreamData = {
          ...userDream,
          history: updatedHistory,
        };

        const requestData = { dreams: [updatedDreamData] };
        console.log(requestData)
        // const { data } = await AxiosInstance.put(
        //   `/dreams/${userDream.id}`,
        //   requestData,
        //   {
        //     headers: getAuthorizationHeader(),
        //   }
        // );
        return "data";
      } else {
        return;
      }
    }
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
}
async function saveDream(
  user: { email: string },
  dream: string,
  dreamData: string
): Promise<any> {
  try {
    // Fetch the existing roadmap for the user
    const userDream = await getUserDream(user.email);
    const hasDream = !!userDream;

    // Prepare the interest to be added or updated
    const newInterest = { dream: dream, data: dreamData };
    // If a roadmap exists, modify the existing interests or add a new one
    if (hasDream) {
      // Check if the interest already exists
      const existingInterestIndex = userDream.dreams.findIndex(
        (i) => i.title === dream
      );
      if (existingInterestIndex !== -1) {
        // Update existing interest
        userDream.interests[existingInterestIndex].data = dreamData;
      } else {
        // Add new interest if there are less than 5
        if (userDream.dreams.length < 5) {
          userDream.dreams.push(newInterest);
        } else {
          throw new Error("Maximum of 5 interests allowed per user.");
        }
      }
      // Prepare request to update the existing roadmap

      const requestData = { dreams: userDream.dreams };
      const { data } = await AxiosInstance.put(
        `/dreams/${userDream.id}`,
        requestData,
        { headers: getAuthorizationHeader() }
      );
      notification.success({message: "Dream saved"})
      return data;
    } else {
      // Create a new roadmap with the initial interest
      const requestData = { user: user.email, dreams: [newInterest] };
      const { data } = await AxiosInstance.post("/dreams", requestData, {
        headers: getAuthorizationHeader(),
      });
      return data;
    }
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
}

async function deleteDream(
  userEmail: string,
  interestTitle: string
): Promise<void> {
  try {
    // Fetch the existing roadmap
    const roadmapResponse = await getUserDream(userEmail);
    if (!roadmapResponse) {
      throw new Error("No roadmap found for the specified user.");
    }
    if (!roadmapResponse.dreams || roadmapResponse.dreams.length === 0) {
      throw new Error("No roadmap found for the specified user.");
    }

    const roadmap = roadmapResponse;
    // Filter out the interest to be deleted
    const updatedInterests = roadmap.dreams.filter(
      (interest) => interest.dream !== interestTitle
    );

    // Update the roadmap with the new interests array
    let updateResponse;
    if (updatedInterests.length == 0) {
      updateResponse = await AxiosInstance.delete(`/dreams/${roadmap.id}`, {
        headers: getAuthorizationHeader(),
      });
    } else {
      console.log(
        "called from there ",
        144,
        updatedInterests.length,
        interestTitle
      );
      updateResponse = await AxiosInstance.patch(
        `/dreams/${roadmap.id}`,
        {
          dreams: updatedInterests,
        },
        {
          headers: getAuthorizationHeader(),
        }
      );
    }

    notification.success({ message: "dream deleted successfully" });
    return updateResponse.data;
  } catch (error) {
    notification.error({
      message: (error as Error).message || "Failed to delete the interest",
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

export { generateDream, saveDream, getUserDream, deleteDream, saveHistory };
