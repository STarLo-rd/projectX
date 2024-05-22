/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Card, List, Tag } from "antd";

const UserDreams: React.FC<{ dream: any }> = ({ dream }) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thurday",
    "Friday",
    "Saturday",
  ];

  // Function to check if a day is present in the habit's days list
  const isDayPresent = (day: string, habitDays: string[]) => {
    return habitDays.includes(day);
  };
  const formatDate = (deadline: string) => {
    // Parse the deadline string to an integer
    const daysToAdd = parseInt(deadline);
    
    // Get the current date
    const currentDate = new Date();
  
    // Calculate the deadline date by adding the number of days to the current date
    const deadlineDate = new Date(currentDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
  
    return deadlineDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <>
      <Card title={dream.dream}>
        <Card type="inner" title="Habits" className="mt-2">
          <List
            bordered
            dataSource={dream.habits}
            renderItem={(habit: any) => (
              <List.Item>
                <div>
                  <strong style={{ marginRight: 8 }}>{habit.habit}</strong>
                  <div className="mt-2">
                    {daysOfWeek.map((day, index) => (
                      // Conditionally render shaded tag if the day is present in the habit's days list
                      <Tag
                        key={index}
                        color={
                          isDayPresent(day, habit.days) ? "cyan" : undefined
                        }
                        style={{ marginRight: 4 }}
                      >
                        {day.charAt(0)}
                      </Tag>
                    ))}
                  </div>
                </div>
              </List.Item>
            )}
          />
        </Card>

        <Card type="inner" title="Tasks" className="mt-2">
          <List
            bordered
            dataSource={dream.tasks || dream.milestones}
            renderItem={(task: any) => (
              <List.Item>
                <strong>{task.task}</strong> - Deadline:{" "}
                {formatDate(task.deadline)}
              </List.Item>
            )}
          />
        </Card>

        <Card type="inner" title="Notes" className="mt-2">
          <List
            bordered
            dataSource={dream.notes}
            renderItem={(note: any) => <List.Item>{note}</List.Item>}
          />
        </Card>
      </Card>
    </>
  );
};

export default UserDreams;
