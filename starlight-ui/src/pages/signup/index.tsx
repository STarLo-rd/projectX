import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import AxiosInstance from "../../services/axios-instance";
import { useAuth } from "../../hooks/auth-context"; // Import the useAuth hook
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import authService from "../../services/authentication";
import { createUser } from "../../services/user";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [googleData, setGoogleData] = useState(null);
  const auth = useAuth();

  const navigate = useNavigate();

  const handleGoogleLogin = async (response) => {
    try {
      console.log(response);
      const credentials = jwtDecode(response.credential);
      console.log(credentials);
      const existingUser = await authService.fetchUserByEmail(
        credentials.email
      );
      console.log(existingUser);

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

      // Call your login function with the Google profile data
      // await login(response.profileObj.email, response.profileObj.googleId);
      // Add the result to your CMS collection
      // addUserToCMSCollection(response.profileObj);
    } catch (error) {
      console.error("Google Login failed:", error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="662460220289-bbjjlhmt16nf1ogjt2odpqn545shsugi.apps.googleusercontent.com">
      <GoogleLogin onSuccess={handleGoogleLogin} />
    </GoogleOAuthProvider>
  );
};

export default Signup;
