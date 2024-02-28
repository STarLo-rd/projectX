// src/components/common/SkillCheckbox.tsx

import React, { useState } from 'react';

interface SkillCheckboxProps {
    skill: string;
    onSkillChange: (skill: string, checked: boolean) => void;
}

const SkillCheckbox: React.FC<SkillCheckboxProps> = ({ skill, onSkillChange }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        onSkillChange(skill, !isChecked);
    };

    return (
        <label>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
            {skill}
        </label>
    );
};

export default SkillCheckbox;
