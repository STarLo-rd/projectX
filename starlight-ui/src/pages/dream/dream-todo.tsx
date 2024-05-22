import React, { useEffect, useState } from "react";
import { getUserDream, saveDream, saveHistory } from "../../services/dream";
import { useAuth } from "../../hooks/auth-context";
import { Checkbox, List } from "antd";

const DreamTodo = () => {
  const [todayHabit, setTodayHabit] = useState([]);
  const { user } = useAuth();

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

  const fetchDreams = async () => {
    const dreamData = await getUserDream(user.email);
    if (dreamData && dreamData.dreams) {
      const todayHabits = dreamData.dreams.flatMap((dream) => {
        // console.log(dream)
        const dreamDays = JSON.parse(dream.data).habits;
        const filteredData = dreamDays.filter((habit) =>
          habit.days.includes(getCurrentDay())
        );
        console.log(filteredData);
        return filteredData.map((item) => item.habit);
      });

      console.log("todayHabits", todayHabits);
      setTodayHabit(todayHabits);
    }
  };

  // Load interests on component mount
  useEffect(() => {
    fetchDreams();
  }, [user]);

  const handleToggle = async (habit) => {
    try {
      await saveHistory(user,habit);
      // Fetch the user's dream data
      // const dreamData = await getUserDream(user.email);

      // if (dreamData) {
      //   const currentDay = getCurrentDay();
      //   const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in the format 'YYYY-MM-DD'

      //   // Check if an entry for the current date already exists
      //   const existingHistoryIndex = dreamData.history.findIndex(
      //     (entry) => entry.date.split("T")[0] === currentDate
      //   );

      //   console.log(existingHistoryIndex);

      //   let updatedHistory;

      //   if (existingHistoryIndex !== -1) {
      //     // Update the existing history entry with the new habit
      //     updatedHistory = [...dreamData.history];
      //     updatedHistory[existingHistoryIndex].habit.push(habit);
      //   } else {
      //     // Create a new history entry
      //     const newHistoryEntry = {
      //       date: new Date(),
      //       day: currentDay,
      //       habit: habit,
      //     };
      //     console.log("called");
      //     updatedHistory = [...dreamData.history, newHistoryEntry];
      //   }

      //   console.log("updatedhI", updatedHistory);

      //   // Update the dream-history array with the updated history
      //   const updatedDreamData = {
      //     ...dreamData,
      //     history: updatedHistory,
      //   };

      //   console.log("updatedDream", updatedDreamData);

      //   // Save the updated dream data
      //   await saveHistory(user, updatedHistory);
    //   }
    } catch (error) {
      console.error("Error updating dream history:", error);
    }
  };
  return (
    <>
      <h1>Todo</h1>
      <List
        size="large"
        bordered
        dataSource={todayHabit}
        renderItem={(habit) => (
          <List.Item
            actions={[
              <Checkbox
                onChange={() => handleToggle(habit)}
                // checked={false} // You can set checked status based on completed state
              >
                Done
              </Checkbox>,
            ]}
          >
            {habit}
          </List.Item>
        )}
      />
    </>
  );
};

export default DreamTodo;
