/* eslint-disable @typescript-eslint/no-explicit-any */
// GeneralInformationForm.tsx
import React from "react";
import { Form, Input, Checkbox, Button } from "antd";
// import "antd/dist/antd.css";

interface Props {
  nextStep: (data: any) => void;
  prevStep?: () => void;
}

const GeneralInformationForm: React.FC<Props> = ({ nextStep }) => {
  const handleSubmit = (values: any) => {
    console.log(values);
    nextStep(values); // Pass form data to the nextStep function
  };
  return (
    <Form onFinish={handleSubmit} className="mb-8">
      <h2 className="text-2xl font-bold mb-4">General Information</h2>
      <Form.Item label="Working Hours per Day">
        <Input
          type="number"
          placeholder="Enter your average working hours per day"
        />
        <span className="block mt-1 text-sm text-gray-500">
         In hr
         (Example: 8 hours)
        </span>
      </Form.Item>

      <Form.Item label="Interested Books">
        <Input.TextArea
          rows={4}
          placeholder="List any books"
        />
        <span className="block mt-1 text-sm text-gray-500">
          Please list any books you are currently interested in, separated by
          commas.
          (Example: "Book 1, Book 2, Book 3")
        </span>
      </Form.Item>

      <Form.Item label="Salary Range (LPA)">
        <Input placeholder="Expected Salary" />
        <span className="block mt-1 text-sm text-gray-500">
          Please enter your salary range in Lakhs per annum (LPA).
          (Example: 5 - 10 LPA)
        </span>
      </Form.Item>

      <Form.Item label="Skills and Abilities" name="skillsAbilities">
        <Input.TextArea
          rows={4}
          placeholder="Enter your skills and abilities relevant to computer science"
        />
      </Form.Item>

      <Form.Item name="relationship" valuePropName="checked">
        <Checkbox>In a Relationship?</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
          Next
        </Button>
      </Form.Item>
    </Form>
  );
};

export default GeneralInformationForm;
