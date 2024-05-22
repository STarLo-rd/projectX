import { Checkbox } from "antd";
import React, { useState, useEffect } from "react";

interface SkillCheckboxProps {
  skill: string;
  onSkillChange: (skill: string, checked: boolean) => void;
  isChecked: boolean; // Added prop to control the checked state
}

const SkillCheckbox: React.FC<SkillCheckboxProps> = ({
  skill,
  onSkillChange,
  isChecked: parentChecked,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // Update isChecked based on parentChecked prop
    setIsChecked(parentChecked);
  }, [parentChecked]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onSkillChange(skill, !isChecked);
  };

  return (
    <>
      <Checkbox key={skill} checked={isChecked} onChange={handleCheckboxChange}>
        {skill}
      </Checkbox>
    </>
  );
};

export default SkillCheckbox;
