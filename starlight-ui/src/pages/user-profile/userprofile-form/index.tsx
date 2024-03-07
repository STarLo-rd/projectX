import React, { useState } from "react";
import SkillCheckbox from "../../../components/skill-checkbox";
import skillsList from "../../../utils/skillList";
import { Button, Space } from "antd";

const UserProfileForm: React.FC = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const submitSkills = async (selectedSkills) => {
    try {
      console.log(selectedSkills);
      // const response = await axios.post('/api/predict', { selectedSkills });
      // Handle successful response (e.g., display results)
    } catch (error) {
      // Handle error (e.g., display an error message)
    }
  };

  const handleSkillChange = (skill: string, checked: boolean) => {
    if (checked) {
      setSelectedSkills([...selectedSkills, skill]);
    } else {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    }
  };

  const handleClearSelection = () => {
    setSelectedSkills([]);
  };

  return (
    <div>
      <h2>User Profile Form</h2>
      <form>
        <div>
          <p>Select your skills:</p>
          {skillsList.map((skill) => (
            <SkillCheckbox
              key={skill}
              skill={skill}
              onSkillChange={handleSkillChange}
              isChecked={selectedSkills.includes(skill)} // Pass the checked state
            />
          ))}
        </div>
        <Space>
          <Button onClick={() => submitSkills(selectedSkills)}>Submit</Button>
          <Button onClick={handleClearSelection}>Clear</Button>
        </Space>
      </form>
    </div>
  );
};

export default UserProfileForm;
