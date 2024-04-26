/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../../hooks/auth-context";
import useDocumentTitle from "../../hooks/use-document-title";
import Signup from "../signup";

const Login = () => {
  // useMetaVersion("1.0");
  const navigate = useNavigate();
  const { isDarkMode, currentImage } = useAuth();
  const auth = useAuth();
  const [loginAvailable, setLoginAvailable] = useState(true);
  const [loadings, setLoadings] = useState<boolean>(false);
  useDocumentTitle("Login");
  if (auth.user && auth.user.email) {
    return <Navigate to="/" />;
  }

  const onFinish = async (values: any) => {
    if (loginAvailable) {
      setLoginAvailable(false);
      setLoadings(true);
      try {
        await auth.login(values.email, values.password);
        notification.success({ message: "Log in successfully." });
        navigate("/", { replace: true });
      } catch (err) {
        notification.error({ message: (err as Error).message });
        setLoginAvailable(true);
      }
      setLoadings(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-10 lg:py-14 xl:py-16">
        <div className="mx-auto px-4 flex flex-col items-center space-y-2">
          {isDarkMode === true ? (
            <img className="h-20 w-20" src={currentImage} alt="Dark-Logo" />
          ) : (
            <img
              // className="h-25 w-25 max-h-24 object-contain"
              style={{ maxHeight: 250, maxWidth: 250, objectFit: "contain" }}
              src={currentImage}
              alt="Light-Logo"
            />
          )}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            The next generation of learning
          </p>
        </div>
      </header>
      <main className="flex items-center justify-center py-6 sm:py-12">
        <div className="space-y-6 w-full max-w-sm px-4">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your email below to login to your account
            </p>
          </div>
          <Form
            name="normal_login"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Email" />
                </Form.Item>
              </div>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Link style={{ float: "right" }} to="/forgot">
                  Forgot password
                </Link>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full h-10 bg-black"
                  loading={loadings}
                >
                  Log in
                </Button>
              </Form.Item>
            </div>
            <Signup />
          </Form>
        </div>
      </main>
    </div>
  );
};

export default Login;
