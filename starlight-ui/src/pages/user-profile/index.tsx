/* eslint-disable @typescript-eslint/no-explicit-any */
// App.tsx
import React, { useState } from "react";
import { Alert, Button, Layout, Space, Spin, Steps } from "antd";
// import "antd/dist/antd.css";
import GeneralInformationForm from "./general-information";
import PersonalInformationForm from "./personal-prefernces";
import TechnicalSkillForm from "./technical-skill";
import AdditionalInformationForm from "./additional-information";
import AxiosInstance from "../../services/axios-instance";
import {
  handleUserInterests,
  predictUserCarrier,
} from "../../services/user-profile";
import { useAuth } from "../../hooks/auth-context";

const { Content } = Layout;
const { Step } = Steps;

const UserProfileForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const { user } = useAuth();

  const [userInterest, setUserInterest] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const nextStep = (data: any) => {
    console.log("called form nextStep", data);
    setFormData({ ...formData, ...data });
    console.log(formData);
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (data) => {
    console.log("final data", { ...formData, ...data });
    const userData = { ...formData, ...data };
    setIsLoading(true);
    const predictData = await predictUserCarrier(userData);
    setIsLoading(false);
    console.log(predictData);
    if (predictData && predictData.domain) setUserInterest(predictData.domain);
  };

  const addInterest = async () => {
    const status = await handleUserInterests(user, userInterest);
    console.log(status);
  };

  return (
    <Layout>
      {isLoading && (
        <div className="fixed top-4 right-4 z-50">
          <Spin size="large" />
        </div>
      )}
      {userInterest && (
        <>
          <Alert
            message={userInterest}
            description="Our AI Predict Your carrer path based on the interest you given"
            type="info"
            action={
              <Space direction="vertical">
                <Button size="small" type="primary" onClick={addInterest}>
                  Add the interest as your main
                </Button>
                <Button
                  size="small"
                  danger
                  ghost
                  onClick={() => handleSubmit(formData)}
                >
                  Perform again
                </Button>
              </Space>
            }
            closable
          />
        </>
      )}

      <Content className="min-h-screen bg-gradient-to-br">
        <div className="container mx-auto flex justify-center items-center h-full">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <Steps current={currentStep} size="small">
              <Step title="General Information" />
              <Step title="Personal Preferences" />
              <Step title="Technical Skills" />
              <Step title="Additional Information" />
            </Steps>

            <div className="mt-8">
              {currentStep === 0 && (
                <GeneralInformationForm nextStep={nextStep} />
              )}
              {currentStep === 1 && (
                <PersonalInformationForm
                  nextStep={nextStep}
                  prevStep={prevStep}
                />
              )}
              {currentStep === 2 && (
                <TechnicalSkillForm nextStep={nextStep} prevStep={prevStep} />
              )}
              {currentStep === 3 && (
                <AdditionalInformationForm
                  formData={formData}
                  prevStep={prevStep}
                  handleSubmit={handleSubmit}
                />
              )}
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default UserProfileForm;
