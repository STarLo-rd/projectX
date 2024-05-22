import { jwtDecode, JwtPayload } from "jwt-decode";
import authService from "../../services/authentication";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useAuth } from "../../hooks/auth-context";
import { createUser } from "../../services/user";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

interface CustomJwtPayload extends JwtPayload {
  email: string;
}
const SSOLogin = () => {
  const auth = useAuth();

  const navigate = useNavigate();

  const handleGoogleLogin = async (response) => {
    try {
      const credentials: CustomJwtPayload = jwtDecode(response.credential);
      console.log(credentials);
      const existingUser = await authService.fetchUserByEmail(
        credentials.email
      );

      if (existingUser) {
        try {
          await auth.loginSSO(response);
          notification.success({ message: "Log in successfully." });
          navigate("/", { replace: true });
        } catch (err) {
          notification.error({ message: (err as Error).message });
          // setLoginAvailable(true);
        }
      } else {
        await createUser(credentials);
        await auth.loginSSO(response);
        notification.success({ message: "Log in successfully." });
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Google Login failed:", error);
    }
  };
  return (
    <>
      <GoogleOAuthProvider clientId="662460220289-bbjjlhmt16nf1ogjt2odpqn545shsugi.apps.googleusercontent.com">
        <GoogleLogin onSuccess={handleGoogleLogin} />
      </GoogleOAuthProvider>
    </>
  );
};
export default SSOLogin;
