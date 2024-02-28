
import React, { useState } from 'react';
import SkillCheckbox from '../../../components/skill-checkbox';
import skillsList from '../../../utils/skillList';

const UserProfileForm: React.FC = () => {
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

    const handleSkillChange = (skill: string, checked: boolean) => {
        if (checked) {
            setSelectedSkills([...selectedSkills, skill]);
        } else {
            setSelectedSkills(selectedSkills.filter((s) => s !== skill));
        }
    };

    return (
        <div>
            <h2>User Profile Form</h2>
            <form>
                <div>
                    <p>Select your skills:</p>
                    {skillsList.map((skill) => (
                        <SkillCheckbox key={skill} skill={skill} onSkillChange={handleSkillChange} />
                    ))}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default UserProfileForm;
