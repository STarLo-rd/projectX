/* eslint-disable @typescript-eslint/no-explicit-any */
// PersonalInformationForm.tsx
import React from "react";
import { Button, Form, Input, Select } from "antd";

const { Option } = Select;

interface Props {
  nextStep: (values) => void;
  prevStep: () => void;
}

const PersonalInformationForm: React.FC<Props> = ({ nextStep, prevStep }) => {
  const handleSubmit = (values: any) => {
    console.log(values);
    nextStep(values); // Pass form data to the nextStep function
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item label="Age" name="age">
        <Input type="number" placeholder="Enter your age" />
      </Form.Item>
      <Form.Item
        label="Relationship Status"
        name="relationship"
        // rules={[{ required: true, message: "Please select your relationship status" }]}
      >
        <Select placeholder="Select relationship status">
          <Option value="Single">Single</Option>
          <Option value="In a Relationship">In a Relationship</Option>
          <Option value="Married">Married</Option>
          <Option value="Divorced">Divorced</Option>
          <Option value="Widowed">Widowed</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Behavior"
        name="behavior"
        // rules={[{ required: true, message: "Please select your behavior" }]}
      >
        <Select placeholder="Select behavior">
          <Option value="Gentle">Gentle</Option>
          <Option value="Tough">Tough</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Hobbies" name="hobbies">
        <Input placeholder="Enter your hobbies" />
      </Form.Item>

      <Form.Item label="Preferred Working Environment" name="workEnvironment">
        <Select placeholder="Select preferred working environment">
          <Option value="Remote">Remote</Option>
          <Option value="Office">Office</Option>
          <Option value="Hybrid">Hybrid</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Personality Traits" name="personalityTraits">
        <Select mode="multiple" placeholder="Select personality traits">
          <Option value="Critical Thinking">Critical Thinking</Option>
          <Option value="Creativity">Creativity</Option>
          <Option value="Leadership">Leadership</Option>
          <Option value="Problem Solving">Problem Solving</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Education Level" name="educationLevel">
        <Select placeholder="Select your education level">
          <Option value="Post-secondary degree">Post-secondary degree</Option>
          <Option value="Currently completing post-secondary degree">
            Currently completing post-secondary degree
          </Option>
          <Option value="Completed high school">Completed high school</Option>
          <Option value="Currently in high school">
            Currently in high school
          </Option>
          <Option value="Not started high school">
            Not started high school
          </Option>
          <Option value="Attended but did not complete high school">
            Attended but did not complete high school
          </Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" onClick={prevStep} style={{ marginRight: 8 }}>
          Previous
        </Button>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PersonalInformationForm;
