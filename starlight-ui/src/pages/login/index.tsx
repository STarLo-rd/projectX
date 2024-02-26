/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../../hooks/auth-context";
import useDocumentTitle from "../../hooks/use-document-title";

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
    <Form
      name="normal_login"
      className="sku-layout-unauth_form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      {isDarkMode === true ? (
        <img src={currentImage} alt="Dark-Logo" />
      ) : (
        <img src={currentImage} alt="Light-Logo" />
      )}
      <p>Welcome to projectX</p>
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
          className="sku-layout-unauth_form-button"
          loading={loadings}
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
