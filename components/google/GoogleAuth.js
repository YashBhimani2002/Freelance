"use client";

import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { usePathname, useRouter } from "next/navigation";
import { googleLogin, googleRegistration } from "../../app/api/api";
import Cookies from "js-cookie";
import { FaGoogle } from "react-icons/fa";
import "./style.css";
const GoogleAuth = ({
  setGoogleErrorMessage,
  setGoogleSuccessMessage,
  setGoogleSignUpErrorMessage,
  setGoogleSignUpSuccessMessage,
  storeId, // Add storeId here
}) => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  // const [buttonType, setButtonType] = useState("standard");
  const path = usePathname();
  const router = useRouter();

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (path.includes("login")) {
  //       // If on login page, use standard for large screens, icon for small screens
  //       if (window.innerWidth < 1024) {
  //         setButtonType("icon");
  //       } else {
  //         setButtonType("standard");
  //       }
  //     } else {
  //       // For non-login pages, always use icon
  //       setButtonType("icon");
  //     }
  //   };

  //   // Set initial button type based on the screen size and page
  //   handleResize();

  //   // Add event listener for screen resizing
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [path]);

  const responseGoogle = async (credentialResponse) => {
    const token = credentialResponse.credential;

    if (!token) {
      setGoogleErrorMessage("Google authentication failed.");
      return;
    }

    try {
      if (path === "/login") {
        const response = await googleLogin(token);

        if (response?.status === 200) {
          const {
            success,
            message,
            token: authToken,
            login_as,
          } = response.data;

          if (!success) {
            setGoogleErrorMessage(message);
            return;
          }
          const options = {
            expires: new Date(Date.now() + 12 * 60 * 60 * 1000),
          };
          Cookies.set("authToken", authToken , options);
          setGoogleSuccessMessage(message);

          if (login_as === 1) {
            window.location.href = "/projects";
          } else if (login_as === 2) {
            window.location.href = "/findwork";
          }
        }
      } else if (storeId) {
        const userProfile = storeId;
        const sendData = { token, userProfile };

        const response = await googleRegistration(sendData);
        const { success, message, data, error } = response?.data || {};

        if (!success) {
          setGoogleSignUpErrorMessage(error || "Registration failed.");
          return;
        }

        setGoogleSignUpSuccessMessage(message);
        const options = {
          expires: new Date(Date.now() + 12 * 60 * 60 * 1000),
        };
        Cookies.set("authToken", data?.authToken || "" , options);

        if (userProfile === 1) {
          window.location.href = "/projects";
        } else if (userProfile === 2) {
          window.location.href = "/findwork";
        }
      }
    } catch (error) {
      setGoogleErrorMessage("An error occurred during authentication.");
    }
  };

  return (
    <div className="h-auto" style={{ textAlign: "center" }}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <GoogleLogin
          onSuccess={responseGoogle}
          onError={(error) =>
            setGoogleErrorMessage("Google authentication failed.")
          }
          buttonText="login"
          className="absolute top-0"
          type="icon"
          // width="210"
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleAuth;
