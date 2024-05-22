/* eslint-disable @typescript-eslint/no-explicit-any */
// TechnicalSkillForm.tsx
import React from "react";
import { Button, Form, Input, Radio, Select } from "antd";

// const { Option } = Select;

interface Props {
  nextStep: (values) => void;
  prevStep: () => void;
}

const TechnicalSkillForm: React.FC<Props> = ({ nextStep, prevStep }) => {
  const handleSubmit = (values: any) => {
    console.log(values);
    nextStep(values); // Pass form data to the nextStep function
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        label="Programming Languages"
        name="programmingLanguages"
        // rules={[{ required: true, message: "Please enter your programming languages" }]}
      >
        <Input placeholder="Enter programming languages" />
      </Form.Item>

      <Form.Item label="Industry Focus" name="industryFocus">
        <Select mode="tags" placeholder="Select or enter industry focus">
          <Select.Option value="Technology">Technology</Select.Option>
          <Select.Option value="Finance">Finance</Select.Option>
          <Select.Option value="Healthcare">Healthcare</Select.Option>
          <Select.Option value="E-commerce">E-commerce</Select.Option>
          <Select.Option value="Education">Education</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Project Types"
        name="projectTypes"
        // rules={[{ required: true, message: "Please enter your preferred project types" }]}
      >
        <Input placeholder="Enter preferred project types" />
      </Form.Item>

      <Form.Item
        label="Learning Resources"
        name="learningResources"
        // rules={[{ required: true, message: "Please enter your preferred learning resources" }]}
      >
        <Input placeholder="Enter preferred learning resources" />
      </Form.Item>

      <Form.Item label="Interest in Information Technology" name="interestIT">
        <Radio.Group>
          <Radio.Button value="Very Good">Very Good</Radio.Button>
          <Radio.Button value="Good">Good</Radio.Button>
          <Radio.Button value="Neutral">Neutral</Radio.Button>
          <Radio.Button value="Bad">Bad</Radio.Button>
          <Radio.Button value="Very Bad">Very Bad</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Interest in Strategy Games"
        name="interestStrategyGames"
      >
        <Radio.Group>
          <Radio.Button value="Very Good">Very Good</Radio.Button>
          <Radio.Button value="Good">Good</Radio.Button>
          <Radio.Button value="Neutral">Neutral</Radio.Button>
          <Radio.Button value="Bad">Bad</Radio.Button>
          <Radio.Button value="Very Bad">Very Bad</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Interest in Leadership" name="interestLeadership">
        <Radio.Group>
          <Radio.Button value="Very Good">Very Good</Radio.Button>
          <Radio.Button value="Good">Good</Radio.Button>
          <Radio.Button value="Neutral">Neutral</Radio.Button>
          <Radio.Button value="Bad">Bad</Radio.Button>
          <Radio.Button value="Very Bad">Very Bad</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Interest in Art and Creativity"
        name="interestArtCreativity"
      >
        <Radio.Group>
          <Radio.Button value="Very Good">Very Good</Radio.Button>
          <Radio.Button value="Good">Good</Radio.Button>
          <Radio.Button value="Neutral">Neutral</Radio.Button>
          <Radio.Button value="Bad">Bad</Radio.Button>
          <Radio.Button value="Very Bad">Very Bad</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Interest in Traveling" name="interestTraveling">
        <Radio.Group>
          <Radio.Button value="Very Good">Very Good</Radio.Button>
          <Radio.Button value="Good">Good</Radio.Button>
          <Radio.Button value="Neutral">Neutral</Radio.Button>
          <Radio.Button value="Bad">Bad</Radio.Button>
          <Radio.Button value="Very Bad">Very Bad</Radio.Button>
        </Radio.Group>
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

export default TechnicalSkillForm;
