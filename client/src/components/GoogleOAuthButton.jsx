import React from "react";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";///using api we have backend

const GoogleOAuthButton = () => {
  const clientId =
    "994377185964-r1qjkmfa5vjkacon774mm5ro6ogsem7t.apps.googleusercontent.com";
  const scopes = ["profile", "email"];

  const onSuccess = async (credentialResponse) => {
    // Handle successful login
    const response = await axios.post("/api/users/oauth/google/callback/link", {
      credential: credentialResponse.credential,
    });
    console.log(credentialResponse);
  };

  const onError = (error) => {
    // Handle login failure
    console.log("error: ", error);
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_ENV_CLIENT_ID}>
      <GoogleLogin
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onError}
        cookiePolicy={"single_host_origin"}
        scope={scopes.join(" ")}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleOAuthButton;
