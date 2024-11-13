/* eslint-disable */
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  LoginData,
  faceBookLogin,
  googleLogin,
  linkedInLogin,
  verifyEmail,
} from "../../app/api/api";
import FacebookLogin from "react-facebook-login";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import linkedin from "react-linkedin-login-oauth2/assets/linkedin.png";
import { useDispatch } from "react-redux";
import { setDashboardStatus } from "../../lib/features/todos/professionalClientSidebar";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import { Mulish } from "next/font/google";
import praikiLogo from "../../public/praiki.svg";
import loginImage from "../../public/login.jpg";
import GoogleAuth from "../google/GoogleAuth";
import { LinkedIn } from "react-linkedin-login-oauth2";
import { Widgets } from "@mui/icons-material";
import Logo2 from "../../public/image 5.png";

const inter = Inter({ subsets: ["latin"], weight: "500" });
const inter400 = Inter({ subsets: ["latin"], weight: "400" });
const inter600 = Inter({ subsets: ["latin"], weight: "600" });
const mulish = Mulish({ subsets: ["latin"], weight: "700" });

const facebookIcon = (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_2864_2704)">
      <rect width="24" height="24" fill="#1877F2" />
      <path
        d="M23.5 12.0694C23.5 5.71811 18.3513 0.569391 12 0.569391C5.64872 0.569391 0.5 5.71811 0.5 12.0694C0.5 17.8094 4.70538 22.567 10.2031 23.4297V15.3936H7.2832V12.0694H10.2031V9.5358C10.2031 6.65361 11.92 5.06158 14.5468 5.06158C15.805 5.06158 17.1211 5.28619 17.1211 5.28619V8.11627H15.671C14.2424 8.11627 13.7969 9.00273 13.7969 9.91218V12.0694H16.9863L16.4765 15.3936H13.7969V23.4297C19.2946 22.567 23.5 17.8094 23.5 12.0694Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_2864_2704">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const linkdinIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="24"
    height="24"
    viewBox="0 0 48 48"
  >
    <path
      fill="#0078d4"
      d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5	V37z"
    ></path>
    <path
      d="M30,37V26.901c0-1.689-0.819-2.698-2.192-2.698c-0.815,0-1.414,0.459-1.779,1.364	c-0.017,0.064-0.041,0.325-0.031,1.114L26,37h-7V18h7v1.061C27.022,18.356,28.275,18,29.738,18c4.547,0,7.261,3.093,7.261,8.274	L37,37H30z M11,37V18h3.457C12.454,18,11,16.528,11,14.499C11,12.472,12.478,11,14.514,11c2.012,0,3.445,1.431,3.486,3.479	C18,16.523,16.521,18,14.485,18H18v19H11z"
      opacity=".05"
    ></path>
    <path
      d="M30.5,36.5v-9.599c0-1.973-1.031-3.198-2.692-3.198c-1.295,0-1.935,0.912-2.243,1.677	c-0.082,0.199-0.071,0.989-0.067,1.326L25.5,36.5h-6v-18h6v1.638c0.795-0.823,2.075-1.638,4.238-1.638	c4.233,0,6.761,2.906,6.761,7.774L36.5,36.5H30.5z M11.5,36.5v-18h6v18H11.5z M14.457,17.5c-1.713,0-2.957-1.262-2.957-3.001	c0-1.738,1.268-2.999,3.014-2.999c1.724,0,2.951,1.229,2.986,2.989c0,1.749-1.268,3.011-3.015,3.011H14.457z"
      opacity=".07"
    ></path>
    <path
      fill="#fff"
      d="M12,19h5v17h-5V19z M14.485,17h-0.028C12.965,17,12,15.888,12,14.499C12,13.08,12.995,12,14.514,12	c1.521,0,2.458,1.08,2.486,2.499C17,15.887,16.035,17,14.485,17z M36,36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698	c-1.501,0-2.313,1.012-2.707,1.99C24.957,25.543,25,26.511,25,27v9h-5V19h5v2.616C25.721,20.5,26.85,19,29.738,19	c3.578,0,6.261,2.25,6.261,7.274L36,36L36,36z"
    ></path>
  </svg>
);

const showPassIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5 text-greytext"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
    />
  </svg>
);

const hidePassIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5 text-greytext"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const [googleErrorMessage, setGoogleErrorMessage] = useState("");
  const [googleSuccessMessage, setGoogleSuccessMessage] = useState("");
  const [facebookErrorMessage, setFacebookErrorMessage] = useState("");
  const [facebookSuccessMessage, setFacebookSuccessMessage] = useState("");
  const [linkdinErrorMessage, setLinkdinErrorMessage] = useState("");
  const [linkdinSuccessMessage, setLinkdinSuccessMessage] = useState("");
  const clientId =
    "17736807357-f5dn2nf4c2qvh8a7tkg48q4di1pk9b3r.apps.googleusercontent.com";
  const router = useRouter();
  const [googleerror, setGoogleerror] = useState(false);
  const [emailVerify, setEmailVerify] = useState(false);
  const [emailVerifyMessage, setEmailVerifyMessage] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("activation_token");
    if (token) {
      const fetchCountryData = async () => {
        try {
          const response = await verifyEmail({ token: token });
          if (response) {
            if (response.status == 200) {
              if (response.data.success == true) {
                setEmailVerify(true);
                setEmailVerifyMessage(response.data.message);
              }
            }
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchCountryData();
    }
  }, []);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const Logindata = async () => {
    const data = {
      email: "",
      password: "",
    };
    try {
      const result = await LoginData(data);
    } catch (err) {
      console.error(err);
    }
  };
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError("The email field is required.");
    } else if (!emailRegex.test(email)) {
      setEmailError("The email must be a valid email address.");
    } else {
      setEmailError("");
    }
  };
  const validatePassword = () => {
    if (!password.trim()) {
      setPasswordError("The password field is required.");
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError("");
    }
  };

  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");
    setLoginError("");
    setSuccessAlert(false);

    if (!email.trim() || !password.trim()) {
      if (!email.trim()) {
        setEmailError("The email field is required.");
      }
      if (!password.trim()) {
        setPasswordError("The password field is required.");
      }
      return;
    }

    validateEmail();
    validatePassword();

    if (emailError || passwordError) {
      return;
    }

    try {
      const result = await LoginData({ email, password });
      if (result?.success == false) {
        console.error("Login failed:", result.error);
      } else {
        setPasswordError("");
      }
      if (result && result.data.success) {
        setSuccessAlert(true);
        const existingToken = Cookies.get("authToken");
        const options = {
          expires: new Date(Date.now() + 12 * 60 * 60 * 1000),
        };
        if (!existingToken) {
          Cookies.set("authToken", result.data.token , options);
        }
        if (result.data.login_as === 2) {
          const fullName = `${result.data.first_name} ${result.data.last_name}`;
          sessionStorage.setItem("fullName", fullName);
        }
        if (result.data.google_id != null) {
          if (result.data.login_as === 2) {
            window.location.href = "/findwork";
          } else if (result.data.login_as === 1) {
            window.location.href = "/projects";
          }
        } else {
          if (result.data.login_as === 2) {
            window.location.href = "/findwork";
          } else if (result.data.login_as === 1) {
            window.location.href = "/projects";
          }
        }
      } else if (result && result.data.error) {
        const errorMessage = result.data.error.toLowerCase();

        if (errorMessage.includes("verification is incomplete")) {
          console.error("Login failed:", result.data.error);
          setLoginError(
            "Your verification is incomplete. Complete registration."
          );
        } else {
          console.error("Login failed:", result.data.error);
          setLoginError(result.data.error || "Login failed");
          setGoogleErrorMessage("");
        }
      } else {
        console.error("Login failed: Unexpected response format");
        setLoginError(result.data.error || "User already exists");
      }
    } catch (error) {
      setLoginError("Login failed. Please check your credentials.");
      console.error("Error during login:", error);
    }
  };

  const responseFacebook = async (response) => {
    if (response.error) {
      setFacebookErrorMessage(response.error.message);
    }
    const data = {
      token: response.signedRequest,
      access_token: response.accessToken,
    };
    const result = await faceBookLogin(data);
    if (result?.data.success) {
      const existingToken = Cookies.get("authToken");
      const options = {
        expires: new Date(Date.now() + 12 * 60 * 60 * 1000),
      };
      if (!existingToken) {
        Cookies.set("authToken", result.data.authToken , options);
      }
      setFacebookSuccessMessage("Login Successful");
      if (result.data.login_as == 1) {
        window.location.href = "/projects";
      } else if (result.data.login_as === 2) {
        window.location.href = "/findwork";
      }
    } else {
      setFacebookErrorMessage("Login Failed.");
    }
  };

  const responseGoogle = async (googleUser) => {
    const userData = googleUser;
    const data = {
      email: userData.profileObj.email,
      google_id: userData.googleId,
      google_token: userData.accessToken,
    };
    await googleLogin(data).then((res) => {
      if (res) {
        if (res?.status == 200) {
          if (res.data.success == true) {
            navigate(res.data.redirect);
          } else if (res.data.success == false) {
            setGoogleerror(true);
          }
        }
      }
    });
  };

  let num = 0;
  const linkedInSuccess = async (code) => {
    try {
      if (num == 0 && code) {
        num++;
        const { data } = await linkedInLogin(code);
        if (data?.success) {
          const existingToken = Cookies.get("authToken");
          const options = {
            expires: new Date(Date.now() + 12 * 60 * 60 * 1000),
          };
          if (!existingToken) {
            Cookies.set("authToken", data.authToken , options);
          }
          num = 0;
          setLinkdinSuccessMessage("Login successful");
          if (data.login_as == 1) {
            window.location.href = "/projects";
          } else if (data.login_as === 2) {
            window.location.href = "/findwork";
          }
        } else {
          num = 0;
          setLinkdinErrorMessage(data.error);
        }
      }
    } catch (error) {}
  };
  const linkedInFailed = (error) => {
    if (error.error != "user_closed_popup") {
      setLinkdinErrorMessage(error.message);
    }
  };
  const validateEmailInput = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return false;
    }
    const [localPart, domainPart] = email.split("@");
    const specialCharCheck = /^[a-zA-Z0-9._%+-]+$/;
    if (!specialCharCheck.test(domainPart)) {
      return false;
    }
    return true;
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    if (!validateEmailInput(inputEmail)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  useEffect(() => {
    if (successAlert === true) {
      setGoogleErrorMessage("");
      setFacebookErrorMessage("");
      setLinkdinErrorMessage("");
      setEmailVerifyMessage("");
      setEmailVerify(false);
    }

    if (googleSuccessMessage !== "") {
      setLoginError("");
      setFacebookErrorMessage("");
      setLinkdinErrorMessage("");
    }

    if (facebookSuccessMessage !== "") {
      setLoginError("");
      setGoogleErrorMessage("");
      setLinkdinErrorMessage("");
    }

    if (linkdinSuccessMessage !== "") {
      setLoginError("");
      setGoogleErrorMessage("");
      setFacebookErrorMessage("");
    }

    if (loginError !== "") {
      setGoogleErrorMessage("");
      setFacebookErrorMessage("");
      setLinkdinErrorMessage("");
      setEmailVerifyMessage("");
      setEmailVerify(false);
    }

    if (googleErrorMessage !== "") {
      setLoginError("");
      setFacebookErrorMessage("");
      setLinkdinErrorMessage("");
      setEmailVerifyMessage("");
      setEmailVerify(false);
    }

    if (facebookErrorMessage !== "") {
      setGoogleErrorMessage("");
      setLinkdinErrorMessage("");
      setLoginError("");
      setEmailVerifyMessage("");
      setEmailVerify(false);
    }

    if (linkdinErrorMessage !== "") {
      setGoogleErrorMessage("");
      setFacebookErrorMessage("");
      setLoginError("");
      setEmailVerifyMessage("");
      setEmailVerify(false);
    }
  }, [
    googleSuccessMessage,
    successAlert,
    facebookSuccessMessage,
    linkdinSuccessMessage,
    loginError,
    googleErrorMessage,
    facebookErrorMessage,
    linkdinErrorMessage,
    emailVerifyMessage,
  ]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        handleLogin();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [email, password]);

  return (
    <>
      <div className="bg-white h-[100vh] overflow-hidden lg:overflow-x-hidden">
        <div className="lg:flex md:flex-row w-screen h-[100vh] bg-[#F1F3F6] overflow-y-scroll scrollbar-custom">
          <div className="w-auto h-[80px] lg:h-[100vh] lg:w-[42%] relative overflow-hidden">
            <div className="w-32 absolute top-3 left-2">
              <a href="/">
                <Image
                  src={praikiLogo}
                  alt="logo"
                  title=""
                  width={140}
                  height={60}
                  className="hidden lg:block"
                />
                <Image
                  src={Logo2}
                  alt="logo"
                  title=""
                  width={140}
                  height={60}
                  className="block lg:hidden"
                />
              </a>
            </div>
            <div className="w-full hidden lg:block h-[100vh] overflow-hidden">
              <Image
                src={loginImage}
                alt="image"
                width={800}
                height={2000}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
          <div className="w-full lg:w-[58%] h-auto lg:h-[100vh] px-6 sm:px-10 lg:px-0 lg:ml-7 lg:mx-0 md:overflow-y-auto">
            {loginError !== "" && (
              <div
                className="w-auto bg-[#f87171] ml-auto m-10 p-5 text-[#b91c1c] rounded data"
                style={{ display: loginError ? "block" : "none" }}
              >
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  onClick={() => setLoginError("")}
                >
                  ×
                </button>
                <strong id="message_show">{loginError}</strong>
              </div>
            )}
            {emailVerify && (
              <div
                className="w-auto bg-[#d4edda] ml-auto m-10 p-5 text-[#155724] rounded data1"
                style={{ display: "block" }}
              >
                <button
                  type="button"
                  className="close"
                  onClick={() => setEmailVerify(false)}
                >
                  ×
                </button>
                <strong id="message_show_success">{emailVerifyMessage}</strong>
              </div>
            )}
            {successAlert && (
              <div
                className="w-auto bg-[#d4edda] ml-auto m-10 p-5 text-[#155724] rounded data1"
                style={{ display: successAlert ? "block" : "none" }}
              >
                <button
                  type="button"
                  className="close"
                  onClick={() => setSuccessAlert(false)}
                >
                  ×
                </button>
                <strong id="message_show_success">Login Successful</strong>
              </div>
            )}
            {googleerror ? (
              <div
                className="w-auto bg-[#f87171] ml-auto m-10 p-5 text-[#b91c1c] rounded data"
                style={{ display: "block" }}
              >
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  onClick={() => setGoogleerror(false)}
                >
                  ×
                </button>
                <strong id="message_show">You'r not registred</strong>
              </div>
            ) : (
              ""
            )}
            {googleErrorMessage !== "" && (
              <div className="w-auto bg-[#f87171] ml-auto m-10 p-5 text-[#b91c1c] rounded data">
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  onClick={() => setGoogleErrorMessage("")}
                >
                  ×
                </button>
                <strong id="message_show">{googleErrorMessage}</strong>
              </div>
            )}
            {googleSuccessMessage !== "" && (
              <div className="w-auto bg-[#d4edda] ml-auto m-10 p-5 text-[#155724] rounded data1">
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  onClick={() => setGoogleSuccessMessage("")}
                >
                  ×
                </button>
                <strong id="message_show">{googleSuccessMessage}</strong>
              </div>
            )}
            {facebookSuccessMessage !== "" && (
              <div className="w-auto bg-[#d4edda] ml-auto m-10 p-5 text-[#155724] rounded data1">
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  onClick={() => setFacebookSuccessMessage("")}
                >
                  ×
                </button>
                <strong id="message_show">{facebookSuccessMessage}</strong>
              </div>
            )}
            {facebookErrorMessage !== "" && (
              <div className="w-auto bg-[#f87171] ml-auto m-10 p-5 text-[#b91c1c] rounded data">
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  onClick={() => setFacebookErrorMessage("")}
                >
                  ×
                </button>
                <strong id="message_show">{facebookErrorMessage}</strong>
              </div>
            )}
            {linkdinErrorMessage !== "" && (
              <div className="w-auto bg-[#f87171] ml-auto m-10 p-5 text-[#b91c1c] rounded data">
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  onClick={() => setLinkdinErrorMessage("")}
                >
                  ×
                </button>
                <strong id="message_show">{linkdinErrorMessage}</strong>
              </div>
            )}
            {linkdinSuccessMessage !== "" && (
              <div className="w-auto bg-[#d4edda] ml-auto m-10 p-5 text-[#155724] rounded data1">
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  onClick={() => setLinkdinSuccessMessage("")}
                >
                  ×
                </button>
                <strong id="message_show">{linkdinSuccessMessage}</strong>
              </div>
            )}
            <div>
              <div className="py-2 lg:px-0 lg:py-10  ">
                <h1
                  className={` ${mulish.className} text-[#434343] text-[25px] md:text-[34px] lg:text-[45px] text-center lg:text-left`}
                >
                  Login to Praiki
                </h1>
                <div
                  className={` ${inter.className} text-sm md:text-lg font-medium text-center lg:text-left my-2 lg:my-4`}
                >
                  <span className="text-[#2D3748] tracking-wide">
                    Don’t have an account?{" "}
                    <Link
                      href="/signup"
                      className="text-btn_bg font-semibold hover:text-[#ff661e]"
                    >
                      Sign up
                    </Link>
                  </span>
                </div>
                <div className="flex justify-center lg:justify-start items-center pt-5 lg:pt-0">
                  <div className="text-lg md:text-xl pr-[15px] md:pr-[20px]">
                    Sign in with:
                  </div>
                  <div
                    className={`${inter.className} w-auto flex justify-center lg:justify-start flex-row items-center gap-2 xl:gap-3 lg:my-6 pt-0 lg:pt-0`}
                  >
                    <GoogleAuth
                      setGoogleErrorMessage={setGoogleErrorMessage}
                      setGoogleSuccessMessage={setGoogleSuccessMessage}
                    />
                    <FacebookLogin
                      appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
                      autoLoad={false}
                      callback={responseFacebook}
                      cssClass="bg-[#1877f2] h-[40.4px] w-max flex items-center transition-all duration-200 ease-in-out border border-[#fff] p-2 lg:p-2 tracking-wide rounded text-white gap-1 lg:gap-3 text-[11px] md:max-lg:text-base xl:text-base lg:w-auto flex justify-center lg:justify-start hover:border-[#fff]"
                      textButton=""
                      // textButton={
                      //   <span className="hidden lg:block shrink-0 text-sm">
                      //     Sign in with Facebook
                      //   </span>
                      // }
                      icon={facebookIcon}
                    />
                    <LinkedIn
                      clientId={process.env.NEXT_PUBLIC_LINKEDIN_APP_ID}
                      className="btn btn-linked"
                      redirectUri={`https://praiki.com/linkedin/callback`}
                      scope="email openid profile"
                      onSuccess={(code) => {
                        linkedInSuccess(code);
                      }}
                      onError={(error) => {
                        linkedInFailed(error);
                      }}
                    >
                      {({ linkedInLogin }) => (
                        <div
                          className="bg-[#0274b3] w-fit h-[40.4px] cursor-pointer flex tracking-wide transition-all duration-200 ease-in-out items-center border border-[#fff] p-2 lg:p-2 rounded text-white gap-1 lg:gap-3 text-[11px] md:max-lg:text-base xl:text-base  justify-center lg:justify-start hover:border-[#fff]"
                          onClick={linkedInLogin}
                        >
                          <span className="">{linkdinIcon}</span>
                          {/* <p className="hidden lg:flex items-center text-sm">
                            Sign in with Linkedin
                          </p> */}
                        </div>
                      )}
                    </LinkedIn>
                  </div>
                </div>
                <div className="mt-4 mr-0 lg:mr-[20%] xl:mr-[20%]">
                  <form method="post" autoComplete="off">
                    <div
                      className={`${inter.className} flex flex-col text-base text-client_color space-y-2 md:space-y-3 py-3 md:py-5`}
                    >
                      <label for="exampleInputEmail1" className="tracking-wide">
                        Email
                      </label>
                      <input
                        type="email"
                        className="p-2 text-sm bg-[#fff] border border-inputbordercolor rounded-[6px]"
                        id="email"
                        name="email"
                        aria-describedby="emailHelp"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                          handleEmailChange(e);
                        }}
                        onBlur={validateEmail}
                      />

                      <p className="text-sm text-red" id="email_error">
                        {" "}
                        {emailError}
                      </p>
                    </div>
                    <div
                      className={`${inter.className} flex flex-col  text-client_color space-y-2 md:space-y-3 `}
                    >
                      <label
                        for="exampleInputPassword1"
                        className="text-base tracking-wide"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="p-2 text-sm w-full bg-[#fff] border border-inputbordercolor rounded-[6px]"
                          id="password"
                          name="password"
                          placeholder="Enter password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordError("");
                          }}
                          onBlur={validatePassword}
                        />
                        <span
                          onClick={togglePasswordVisibility}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer inline-flex items-center px-3 text-sm text-gray rounded-s-md border-grey"
                        >
                          {showPassword ? showPassIcon : hidePassIcon}
                        </span>
                      </div>
                      <p className="text-sm text-red" id="password_error">
                        {passwordError}
                      </p>
                    </div>
                    <div
                      className={`${inter600.className} text-center md:text-right my-3 hidden md:block`}
                    >
                      <Link
                        href="/forgot-password"
                        className="text-searchbg hover:text-[#ff661e] text-base text-bold"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </form>
                </div>
                <div className={`${inter.className} mt-5 md:mt-0`}>
                  <button
                    className="bg-submtBtn rounded-[10px] text-white text-base py-2 px-3 w-full md:w-auto border border-transparent hover:text-submtBtn hover:border-submtBtn cursor-pointer hover:bg-transparent"
                    id="btn_login"
                    type="button"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>
                <div
                  className={`${inter600.className} text-center md:text-right my-3 block md:hidden `}
                >
                  <Link
                    href="/forgot-password"
                    className="text-searchbg hover:text-[#ff661e] text-base text-bold"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
