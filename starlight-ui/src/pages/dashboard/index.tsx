import React from "react";
import { useAuth } from "../../hooks/auth-context";
import { Card, Avatar, Typography, Divider } from "antd";
import { UserOutlined, CalendarOutlined, KeyOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export const Dashboard = () => {
  const { user } = useAuth();

  // Custom date formatting function
  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="max-w-md shadow-lg rounded-lg">
        <div className="flex flex-col items-center">
          <Avatar
            size={64}
            icon={<UserOutlined />}
            className="bg-blue-500 text-white mb-4"
          />
          <Title level={3} className="mb-2">
            Welcome, {user.email}
          </Title>
          <Text type="secondary" className="mb-4">
            Your Account Insights
          </Text>
        </div>
        <Divider />
        <div className="flex flex-col space-y-4 my-4">
          <div className="flex items-center">
            <CalendarOutlined className="mr-2 text-blue-500" />
            <Text strong>Account Created:</Text>
            <Text className="ml-2">{formatDate(user.createdAt)} </Text>
          </div>
          <div className="flex items-center">
            <KeyOutlined className="mr-2 text-blue-500" />
            <Text strong>API Key:</Text>
            <Text code className="ml-2">
              {user.apiKey}
            </Text>
          </div>
          <div className="flex items-center">
            <UserOutlined className="mr-2 text-blue-500" />
            <Text strong>Login Attempts:</Text>
            <Text className="ml-2">{user.loginAttempts}</Text>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
