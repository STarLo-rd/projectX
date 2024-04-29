/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/auth-context.tsx";
// import {
//   getUserProfileByUserId,
//   modifyUserInterests,
// } from "../../../services/user-profile.ts";

interface UserProfileData {
  user: string;
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

const UserProfileForm: React.FC = () => {
  const { user } = useAuth();

  const [userProfile, setUserProfile] = useState<UserProfileData>({
    user: "",
    workingHoursPerDay: 0,
    interestedBooks: [],
    salaryRange: "",
    relationship: false,
    behavior: "",
    workPreference: "",
    salaryOrWorkHard: "",
    teamworkExperience: false,
    introvert: false,
  });

  useEffect(() => {
    console.log(user);
    setUserProfile((prevUserProfile) => ({
      ...prevUserProfile,
      user: user.id,
    }));
  }, [user]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;
    setUserProfile((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox"
          ? (event.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(userProfile);
    try {
      // const response = await addUserInterests(userProfile);
      // const response = await modifyUserInterests(userProfile);
      // console.log("User profile updated successfully:", response);
      // Handle form submission succeiss (e.g., display success message)
    } catch (error: any) {
      console.log(error?.message);
      console.log(error?.stack);
      console.error("Error updating user profile:", error);
      // Handle form submission errors (e.g., display error message)
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>User Profile</h2>
        <label htmlFor="workingHoursPerDay">Working Hours per Day:</label>
        <input
          type="number"
          id="workingHoursPerDay"
          name="workingHoursPerDay"
          value={userProfile.workingHoursPerDay}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="interestedBooks">
          Interested Books (Comma separated):
        </label>
        <br />

        <label htmlFor="salaryRange">Salary Range:</label>
        <input
          type="text"
          id="salaryRange"
          name="salaryRange"
          value={userProfile.salaryRange}
          onChange={handleChange}
        />
        <br />

        <label>
          <input
            type="checkbox"
            id="relationship"
            name="relationship"
            checked={userProfile.relationship}
            onChange={handleChange}
          />
          In a Relationship?
        </label>
        <br />

        <label htmlFor="behavior">Gentle or Tuff Behavior?:</label>
        <select
          id="behavior"
          name="behavior"
          value={userProfile.behavior}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Gentle">Gentle</option>
          <option value="Tuff">Tuff</option>
        </select>
        <br />
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default UserProfileForm;
