/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// AdditionalInformationForm.tsx
import React from "react";
import { Button, Form, Input, Select } from "antd";

const { Option } = Select;

interface Props {
  formData: any;
  prevStep: () => void;
  handleSubmit: (values) => void;
}

const AdditionalInformationForm: React.FC<Props> = ({
  formData,
  prevStep,
  handleSubmit,
}) => {
  const onFinish = (values: any) => {
    handleSubmit(values);
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item
        label="Preferred Team Size"
        name="teamSize"
        rules={[
          { required: true, message: "Please select your preferred team size" },
        ]}
      >
        <Select placeholder="Select preferred team size">
          <Option value="Small">Small</Option>
          <Option value="Medium">Medium</Option>
          <Option value="Large">Large</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Management Experience"
        name="managementExperience"
        valuePropName="checked"
      >
        <Input type="checkbox" />
      </Form.Item>

      <Form.Item
        label="Public Speaking Experience"
        name="publicSpeakingExperience"
        valuePropName="checked"
      >
        <Input type="checkbox" />
      </Form.Item>

      <Form.Item label="Special Skills" name="specialSkills">
        <Input placeholder="Enter any special skills" />
      </Form.Item>

      <Form.Item label="Preferred Learning Style" name="learningStyle">
        <Select placeholder="Select preferred learning style">
          <Option value="Visual">Visual</Option>
          <Option value="Auditory">Auditory</Option>
          <Option value="Kinesthetic">Kinesthetic</Option>
          <Option value="Reading/Writing">Reading/Writing</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Volunteer Experience" name="volunteerExperience">
        <Input.TextArea
          rows={4}
          placeholder="Describe your volunteer experience"
        />
      </Form.Item>

      <Form.Item label="Preferred Work-Life Balance" name="workLifeBalance">
        <Select placeholder="Select preferred work-life balance">
          <Option value="Equal emphasis on work and personal life">
            Equal emphasis on work and personal life
          </Option>
          <Option value="More focus on personal life">
            More focus on personal life
          </Option>
          <Option value="More focus on work">More focus on work</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Preferred Communication Style"
        name="communicationStyle"
      >
        <Select placeholder="Select preferred communication style">
          <Option value="Direct">Direct</Option>
          <Option value="Collaborative">Collaborative</Option>
          <Option value="Assertive">Assertive</Option>
          <Option value="Empathetic">Empathetic</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Bio"
        name="bio"
        rules={[
          { required: true, message: "Please provide a brief bio" },
          { max: 500, message: "Bio must be less than 500 characters" },
        ]}
      >
        <Input.TextArea rows={4} placeholder="Tell us about yourself" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" onClick={prevStep} style={{ marginRight: 8 }}>
          Previous
        </Button>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AdditionalInformationForm;
