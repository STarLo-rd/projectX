import { useEffect, useState } from "react";
import IntroSection from "../../components/templates/intro-section";
import {
  deleteDream,
  generateDream,
  getUserDream,
  saveDream,
} from "../../services/dream";
import { useAuth } from "../../hooks/auth-context";

import UserDreams from "./userDreams";
import { Button, notification, Select, Spin } from "antd";
import DreamTodo from "./dream-todo";

const Dream = () => {
  const [typedInterest, setTypedInterest] = useState(""); // For input field
  const [showHeading, setShowHeading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [dreamdata, setDreamdata] = useState([]);
  const [dreams, setDreams] = useState([]);
  const [selectedInterest, setSelectedInterest] = useState(""); // For dropdown selection

  const [isLoading, setIsLoading] = useState(false);
  // {
  //     "dream": "dream title",
  //     "habits": [
  //       {
  //         "habit": "Read technical articles and whitepapers related to rocket engineering",
  //         "days": [
  //           "Monday",
  //           "Wednesday",
  //           "Friday"
  //         ]
  //       },
  //       {
  //         "habit": "Attend webinars or online courses on rocket propulsion",
  //         "days": [
  //           "Tuesday",
  //           "Thursday"
  //         ]
  //       },
  //       {
  //         "habit": "Practice writing technical reports on rocket design concepts",
  //         "days": [
  //           "Sunday"
  //         ]
  //       },
  //       {
  //         "habit": "Network with professionals in the aerospace industry",
  //         "days": [
  //           "Wednesday"
  //         ]
  //       },
  //       {
  //         "habit": "Engage in community service related to STEM education",
  //         "days": [
  //           "Saturday"
  //         ]
  //       }
  //     ],
  //     "tasks": [
  //       {
  //         "task": "Complete a research project on a specific aspect of rocket engineering",
  //         "deadline": "3 months"
  //       },
  //       {
  //         "task": "Build a small-scale rocket model as a practical demonstration of rocketry principles",
  //         "deadline": "2 months"
  //       },
  //       {
  //         "task": "Obtain certification in a relevant aerospace engineering software",
  //         "deadline": "1 month"
  //       },
  //       {
  //         "task": "Secure an internship or research opportunity in the rocket engineering field",
  //         "deadline": "6 months"
  //       }
  //     ],
  //     "notes": [
  //       "Staying informed about industry developments is crucial for staying abreast of the latest advancements in rocket engineering.",
  //       "Community service allows you to apply your knowledge to make a positive impact while also expanding your network.",
  //       "Networking is essential for building connections and exploring potential opportunities in the field.",
  //       "Remember that becoming a rocket engineer requires dedication, perseverance, and a continuous pursuit of knowledge and skill development."
  //     ]
  //   }
  const { user, deduceCredit } = useAuth();

  const handleDreams = async () => {
    setLoading(true);
    const data = await generateDream(typedInterest, deduceCredit);
    setLoading(false);
    if (data) {
      setDreamdata(data);
    }
  };

  // Handler for dropdown change
  const handleInterestChange = (selectedDream) => {
    setSelectedInterest(selectedDream);
    const interestData = dreams.find(
      (interest) => interest.dream === selectedDream
    );
    if (interestData) {
      setDreamdata(JSON.parse(interestData.data));
    }
  };

  const fetchDreams = async () => {
    setLoading(true);
    const dreamData = await getUserDream(user.email);
    if (dreamData && dreamData.dreams) {
      setDreams(dreamData.dreams);
      if (!selectedInterest && dreamData.dreams.length > 0) {
        setSelectedInterest(dreamData.dreams[0].dream);
        setDreamdata(JSON.parse(dreamData.dreams[0].data));
      }
    }
    setLoading(false);
  };

  // Load interests on component mount
  useEffect(() => {
    fetchDreams();
  }, [user]);

  const addRoadmap = async () => {
    try {
      setIsLoading(true); // Set loading to true when save starts
      const data = await saveDream(
        user,
        typedInterest,
        JSON.stringify(dreamdata)
      );
      console.log("data", data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleDeleteDream = async (interestTitle) => {
    await deleteDream(user.email, interestTitle);
    // Update local state to reflect the change
    const updatedRoadmaps = dreams.filter(
      (item) => item.dream !== interestTitle
    );
    setDreams(updatedRoadmaps);
    // Reset selected interest if it was the one deleted
    if (selectedInterest === interestTitle) {
      setSelectedInterest(
        updatedRoadmaps.length > 0 ? updatedRoadmaps[0].dream : ""
      );
      setDreamdata(
        updatedRoadmaps.length > 0 ? JSON.parse(updatedRoadmaps[0].data) : []
      );
    }
  };

  return (
    <>
      <IntroSection
        title="AI-made dream"
        description="Start your dream- AI will plan"
        placeholder="enter your dream"
        value={typedInterest}
        onChange={setTypedInterest}
        // onSubmit={() => handleRoadmap(interest)}
        onSubmit={handleDreams}
        showHeading={showHeading}
        isLoading={loading}
      />
      {isLoading && (
        <div className="fixed top-4 right-4 z-50">
          <Spin size="large" />
        </div>
      )}
      <div className="p-5">
        <Select
          className="w-full max-w-md my-4"
          value={selectedInterest}
          onChange={handleInterestChange}
          placeholder="Select an dream"
          dropdownRender={(menu) => (
            <div>
              {menu}
              <div style={{ padding: "8px", textAlign: "center" }}>
                <Button type="text" onClick={(e) => e.stopPropagation()}>
                  Manage Your Dreams
                </Button>
              </div>
            </div>
          )}
        >
          {dreams.map((interest) => (
            <Select.Option key={interest.dream} value={interest.dream}>
              <div className="flex justify-between text-center px-1.5">
                <span>{interest.dream}</span>
              </div>
            </Select.Option>
          ))}
        </Select>
      </div>
      {dreamdata && (
        <div className="w-full m-4 flex justify-around">
          <Button onClick={addRoadmap}>save dream</Button>
          <Button onClick={() => handleDeleteDream(selectedInterest)}>
            delete dream
          </Button>
        </div>
      )}

      {dreamdata && (
        <>
          <UserDreams dream={dreamdata} />
          {/* <DreamTodo /> */}
        </>
      )}
    </>
  );
};

export default Dream;
