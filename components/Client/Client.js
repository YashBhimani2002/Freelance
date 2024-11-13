"use client";
/* eslint-disable */

import { Mulish } from "next/font/google";
import { Inter } from "next/font/google";

const inter500 = Inter({ subsets: ["latin"], weight: "500" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });
import React from "react";
import "./Client.css";
import { useRouter } from "next/navigation";
import Mainlogo from "../../public/images/socialimages/mainlogo.png";
import GoogleAuth from "../google/GoogleAuth";
import FacebookLogin from "react-facebook-login";
import { LinkedIn } from "react-linkedin-login-oauth2";
import { usePathname } from "next/navigation";
import PasswordChecklist from "react-password-checklist";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import {
  Registration,
  Userverify,
  faceBookLogin,
  faceBookRegister,
  getCountries,
  handleGoogleCallback,
  linkedInRegistration,
} from "../../app/api/api.js";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

import emailvec from "../../public/images/Email verification/email-vec.png";

const inter400 = Inter({ subsets: ["latin"], weight: "400" });
const inter300 = Inter({ subsets: ["latin"], weight: "300" });
const inter700 = Inter({ subsets: ["latin"], weight: "700" });

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

function Client() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const path = usePathname();
  let id = "";
  if (path === "/signup/Client") {
    id = 1;
  } else if (path === "/signup/Professional") {
    id = 2;
  }

  const [signUp, setSignUp] = useState(false);
  const [storeEmail, setStoreEmail] = useState();
  const [countryid, setCountryid] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [countryError, setCountryError] = useState("");
  const [timeLeft, setTimeLeft] = useState(900);
  const [timerInterval, setTimerInterval] = useState(null);
  const [test, setTest] = useState(true);
  const [continueClicked, setContinueClicked] = useState(false);
  const [googleSignUpErrorMessage, setGoogleSignUpErrorMessage] = useState("");
  const [googleSignUpSuccessMessage, setGoogleSignUpSuccessMessage] =
    useState("");
  const [facebookSignUpErrorMessage, setFacebookSignUpErrorMessage] =
    useState("");
  const [facebookSignUpSuccessMessage, setFacebookSignUpSuccessMessage] =
    useState("");
  const [linkdinSignUpErrorMessage, setLinkdinSignUpErrorMessage] =
    useState("");
  const [linkdinSignUpSuccessMessage, setLinkdinSignUpSuccessMessage] =
    useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const startTimer = () => {
    setTimerInterval(
      setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000)
    );
  };

  const stopTimer = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);
  };

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getCountries();
        if (response) {
          if (response.status == 200) {
            const sortedCountries = response.data.sort((a, b) =>
              a.name.localeCompare(b.name)
            );
            setCountryList(sortedCountries);
          }
        }
      } catch (error) {
        console.error(error);
        setCountryError("Error fetching countries");
      }
    };

    fetchCountries();
  }, []);

  const countryNameget = countryList.find(
    (item) => item.id === parseInt(countryid)
  );

  //This is use for check user is logdin using Facebook acoount
  const responseFacebook = async (response) => {
    if (response.error) {
      setFacebookSignUpErrorMessage(response.error.message);
      return;
    }
    let data = {
      token: response.signedRequest,
      accessToken: response.accessToken,
    };

    if (path === "/signup/Client") {
      data.id = 1;
    } else if (path === "/signup/Professional") {
      data.id = 2;
    }
    const result = await faceBookRegister(data);
    if (result?.data?.success) {
      setFacebookSignUpSuccessMessage("Signup Successful");
      const existingToken = Cookies.get("authToken");
      const options = {
        expires: new Date(Date.now() + 12 * 60 * 60 * 1000),
      };
      if (!existingToken) {
        Cookies.set("authToken", result.data.data.authToken , options);
      }
      if (path === "/signup/Client") {
        window.location.href = "/projects";
      } else if (path === "/signup/Professional") {
        window.location.href = "/findwork";
      }
    } else {
      setFacebookSignUpErrorMessage(result.data.error);
    }
  };
  let num = 0;
  const linkedInSuccess = async (code) => {
    try {
      if (num == 0 && code) {
        num++;
        let payload = {
          token: code,
        };
        if (path === "/signup/Client") {
          payload.id = 1;
        } else if (path === "/signup/Professional") {
          payload.id = 2;
        }
        const { data } = await linkedInRegistration(payload);
        if (data?.success) {
          setLinkdinSignUpSuccessMessage("Signup Successful");
          num = 0;
          const existingToken = Cookies.get("authToken");
          const options = {
            expires: new Date(Date.now() + 12 * 60 * 60 * 1000),
          };
          if (!existingToken) {
            Cookies.set("authToken", data.data.authToken, options);
          }
          if (path === "/signup/Client") {
            window.location.href = "/projects";
          } else if (path === "/signup/Professional") {
            window.location.href = "/findwork";
          }
        } else {
          setLinkdinSignUpErrorMessage(data.error);
          num = 0;
        }
      }
    } catch (error) {
      num = 0;
    }
  };

  const linkedInFailed = (error) => {
    if (error.error != "user_closed_popup") {
      setLinkdinSignUpErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (countryNameget) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        country: countryNameget.name || "",
      }));
    } else {
    }
  }, [countryNameget?.id]);

  const getCountryName = (countryid) => {
    const selectedCountry = countryList.find(
      (country) => country.id === countryid
    );
    return selectedCountry ? selectedCountry.name : "";
  };

  useEffect(() => {
    if (countryid !== 0) {
    }
  }, [countryid]);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    country: "",
    termsconditions: false,
    login_as: id,
    subscription: false,
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    country: "",
    termsconditions: "",
  });
  const [emailSignUpErr, setEmailSignErr] = useState("");

  // Function to handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Initialize errors object
    let newErrors = { ...errors };
    if (name == "firstname" || name == "lastname") {
      if (value.trim().length < 1) {
        newErrors[name] = `${
          name == "firstname" ? "First name" : "Last name"
        } must be at least 1 characters`;
      } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        newErrors[name] = `Please enter a valid ${
          name == "firstname" ? "first name" : "last name"
        }`;
      } else {
        newErrors[name] = "";
      }
    } else if (name == "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors[name] = "Please enter a valid email address";
      }
      // Split the email address into local part and domain part
      const [localPart, domainPart] = value.split("@");
      // Regular expression to check for special characters in the domain part
      const specialCharCheck = /^[a-zA-Z0-9._%+-]+$/;
      if (!specialCharCheck.test(domainPart)) {
        newErrors[name] = "Domain part contains invalid characters";
      } else {
        newErrors[name] = "";
      }
    }
    // Handle checkboxes separately
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      // Handle other input fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    // Update errors state
    setErrors(newErrors);
  };

  const validateEmail = (email) => {
    const regex =
      /^[^\s@]+@(gmail\.com|yahoo\.com|outlook\.com|outlook\.in|syndelltech\.in|[^.]*\.(org|net))$/i;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    // Password length validation
    return password.length >= 8;
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    const value = checked ? "1" : ""; // If checked, set value to '1', otherwise ''
    setFormData((prevFormData) => ({
      ...prevFormData,
      subscription: value, // Update termsconditions with the value
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = formData;
    const Email = formData.email;
    if (isSubmitting) return;
    setIsSubmitting(true); // Set submitting state to true

    setStoreEmail(Email);
    // Clear previous errors
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: "",
      country: "",
      termsconditions: "",
    }));
    let isValid = true;

    if (!formData.firstname) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstname: "The first name field is required.",
      }));
      isValid = false;
    }

    if (!formData.lastname) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastname: "The last name field is required.",
      }));
      isValid = false;
    }

    if (!formData.email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "The email field is required.",
      }));
      isValid = false;
    }
    if (formData.email && !validateEmail(formData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email format.",
      }));
      isValid = false;
    }
    if (!formData.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "The password field is required.",
      }));
      isValid = false;
    } else if (!validatePassword(formData.password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 8 characters long.",
      }));
      isValid = false;
    }
    if (!formData.country) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        country: "Please select a country.",
      }));
      isValid = false;
    }
    if (!formData.termsconditions) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        termsconditions:
          "You must agree to the Terms of Service and Privacy Policy.",
      }));
      isValid = false;
    }
    if (!isValid) {
      // If any validation fails, stop the submission
      return;
    }
    if (
      errors.firstname !== "" ||
      errors.lastname !== "" ||
      errors.password !== "" ||
      errors.country !== "" ||
      errors.email !== "" ||
      errors.termsconditions !== ""
    ) {
      return;
    }
    try {
      // Call the registration API
      const response = await Registration(formData);
      if (response && response?.data && response?.data?.success) {
        // Reset the form if registration is successful
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          country: "",
          termsconditions: true,
          login_as: id,
        });
        setSignUp(true);
        setEmailSignErr("");
      } else {
        if (response.data.error === "Email already exists") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "Email already exists",
          }));
          setEmailSignErr("Email already exists");
        }
      }
    } catch (error) {
      if (error.response) {
      }
    } finally {
      setIsSubmitting(false); // Reset submitting state regardless of success or failure
    }
  };

  useEffect(() => {
    if (signUp) {
      // Add event listener for Enter key press
      const handleKeyPress = (event) => {
        if (event.key === "Enter") {
          sendEmail();
        }
      };

      // Attach event listener to the document
      document.addEventListener("keydown", handleKeyPress);

      // Clean up by removing the event listener when component unmounts
      return () => {
        document.removeEventListener("keydown", handleKeyPress);
      };
    }
  }, [signUp, continueClicked]);

  const sendEmail = async () => {
    try {
      const data = { email: storeEmail };

      // Assuming Userverify is an asynchronous function
      const response = await Userverify(data);

      // Handle the response as needed
      // Start the timer when the email is sent successfully
      startTimer();
      setContinueClicked(true);
    } catch (error) {
      console.error("Error during email verification:", error);
    }
  };

  useEffect(() => {
    // Clean up the timer when the component is unmounted
    return () => {
      if (timerInterval) {
        stopTimer();
      }
    };
  }, [timerInterval]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleCountryChange = (e) => {
    setFormData({
      ...formData,
      country: e.target.value,
    });
    setCountryid(e.target.value);
    setCountryError(""); // Reset country error on change
    setErrors((prevErrors) => ({
      ...prevErrors,
      country: "", // Reset country error on change
    }));
  };

  const handlePasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };

  function PasswordChecklist({ password }) {
    const rules = {
      minLength: password.length >= 8,
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      number: /[0-9]/.test(password),
      capital: /[A-Z]/.test(password),
    };

    return (
      <ul>
        {Object.entries(rules).map(([rule, isValid]) => {
          let label;
          switch (rule) {
            case "minLength":
              label = "Password must be 8 characters";
              break;
            case "specialChar":
              label = "Include at least one special character (!@#$%^&*())";
              break;
            case "number":
              label = "Include at least one number";
              break;
            case "capital":
              label = "Include at least one capital letter";
              break;
            default:
              label = "";
              break;
          }
          return (
            <li key={rule} className={isValid ? "text-[#32CD32]" : "text-red"}>
              {label}: {isValid ? "✓" : "✗"}
            </li>
          );
        })}
      </ul>
    );
  }

  //This is create google acount
  const responseGoogle = async (googleUser) => {
    const userData = googleUser;
    const data = {
      email: userData.profileObj.email,
      google_id: userData.googleId,
      google_token: userData.accessToken,
      first_name: userData.profileObj.givenName,
      last_name: userData.profileObj.familyName,
      user_type: parseInt(id),
    };
    await handleGoogleCallback(data).then((res) => {
      if (res) {
        if (res?.status == 200) {
          navigate(res.data.redirect);
        }
      }
    });
  };
  const responseGooglefailer = (res) => {};
  const handlePraikiLogoClick = () => {
    window.location.href = "/";
  };

  return (
    <>
      <section className={` gstart-sec signup-sec`}>
        <div className="row">
          <div className="col-md-4 ps-0">
            <div className="side-step">
              <div
                className="logo-image cursor-pointer"
                onClick={handlePraikiLogoClick}
              >
                <a href="/">
                  <Image
                    src={Mainlogo}
                    alt="logo"
                    title=""
                    style={{ width: "140px" }}
                  />
                </a>
              </div>
              <div className="stepwizard ">
                <div className="stepwizard-row setup-panel">
                  <h3
                    className={`${mulish700.className} mb-[30px] text-[39px] text-white`}
                  >
                    Join Praiki
                  </h3>
                  <div className="stepwizard-step col-xs-3">
                    {signUp === true ? (
                      <>
                        <div className="">
                          <a
                            href="#step-3"
                            type="button"
                            id="st3"
                            className="btn btn-one btn-circle3Email btn-default"
                          ></a>
                          <p>
                            <small>Create account</small>
                          </p>
                        </div>
                        <div className="stepwizard-step col-xs-3">
                          {!continueClicked ? (
                            <a
                              href="#step-2"
                              type="button"
                              id="st2"
                              className="btn btn-two btn-default btn-circle2Email"
                              style={{
                                pointerEvents: "none",
                                cursor: "default",
                              }}
                            ></a>
                          ) : (
                            <a
                              href="#step-2"
                              type="button"
                              id="st2"
                              className="btn btn-two btn-default btn-circle2"
                              style={{
                                pointerEvents: "none",
                                cursor: "default",
                              }}
                            ></a>
                          )}
                          <p>
                            <small>Verify email</small>
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="">
                          <a
                            href="#step-1"
                            type="button"
                            id="st1"
                            className="btn btn-one btn-circle1 btn-default"
                          ></a>
                          <p>
                            <small>Create account</small>
                          </p>
                        </div>
                        <div className="stepwizard-step col-xs-3">
                          <a
                            href="#step-2"
                            type="button"
                            id="st2"
                            className="btn btn-two btn-default btn-circle2Email"
                            style={{ pointerEvents: "none", cursor: "default" }}
                          ></a>
                          <p>
                            <small>Verify email</small>
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {signUp === true ? (
            <div className="emailConfirmation md:min-h-screen flex py-10 md:pt-0 items-start md:items-center justify-center">
              <div className="  flex flex-col items-center justify-center">
                <div className="email-images">
                  <Image src={emailvec} alt="alt" width={300} height={300} />
                </div>
                <div className="contentEmail flex flex-col items-center justify-center tracking-normal">
                  <h2 className={`${mulish700.className}`}>
                    Confirm your email
                  </h2>
                  <p className={`${inter400.className}`}>
                    Click{" "}
                    <span className={`${inter700.className}`}>continue</span> to
                    confirm your email
                    <span>({storeEmail}).</span>
                    <br className="hidden md:block" />
                    Be sure to check the spam folder{" "}
                  </p>
                  <button
                    className={`${inter300.className} tracking-wide`}
                    onClick={() => sendEmail()}
                  >
                    Continue
                  </button>
                </div>
                {continueClicked && (
                  <div>
                    <h2 style={{ color: "red", fontSize: "20px" }}>
                      Time left = {formatTime(timeLeft)}
                    </h2>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-subgrid  col-span-3">
              <div className="col-start-3 md:col-start-3 lg:col-start-2 lg:pl-[400px] xl:pl-[100px]">
                <div className="login-info">
                  {/* ****************error Message Email Already exist***************** */}
                  {emailSignUpErr !== "" && (
                    <div className="w-auto bg-[#f87171] ml-auto m-10 p-5 text-[#b91c1c] rounded data">
                      <button
                        type="button"
                        className="float-right text-lg font-semibold text-black opacity-50 bg-transparent border-none"
                        data-dismiss="alert"
                        onClick={() => setEmailSignErr("")}
                      >
                        ×
                      </button>
                      <strong id="message_show">{emailSignUpErr}</strong>
                    </div>
                  )}
                  {/* ****************error Message google***************** */}
                  {googleSignUpErrorMessage !== "" && (
                    <div className="w-auto bg-[#f87171] ml-auto m-10 p-5 text-[#b91c1c] rounded data">
                      <button
                        type="button"
                        className="float-right text-lg font-semibold text-black opacity-50 bg-transparent border-none"
                        data-dismiss="alert"
                        onClick={() => setGoogleSignUpErrorMessage("")}
                      >
                        ×
                      </button>
                      <strong id="message_show">User already exists</strong>
                    </div>
                  )}
                  {/* ****************Success Message google***************** */}
                  {googleSignUpSuccessMessage !== "" && (
                    <div className="w-auto bg-[#d4edda] ml-auto m-10 p-5 text-[#155724] rounded data1">
                      <button
                        type="button"
                        className="float-right text-lg font-semibold text-black opacity-50 bg-transparent border-none"
                        data-dismiss="alert"
                        onClick={() => setGoogleSignUpSuccessMessage("")}
                      >
                        ×
                      </button>
                      <strong id="message_show">
                        {googleSignUpSuccessMessage}
                      </strong>
                    </div>
                  )}
                  {/* ****************Success Message facebook***************** */}
                  {facebookSignUpSuccessMessage !== "" && (
                    <div className="w-auto bg-[#d4edda] ml-auto m-10 p-5 text-[#155724] rounded data1">
                      <button
                        type="button"
                        className="float-right text-lg font-semibold text-black opacity-50 bg-transparent border-none"
                        data-dismiss="alert"
                        onClick={() => setFacebookSignUpSuccessMessage("")}
                      >
                        ×
                      </button>
                      <strong id="message_show">
                        {facebookSignUpSuccessMessage}
                      </strong>
                    </div>
                  )}
                  {/* ****************error Message facebook***************** */}
                  {facebookSignUpErrorMessage !== "" && (
                    <div className="w-auto bg-[#f87171] ml-auto m-10 p-5 text-[#b91c1c] rounded data">
                      <button
                        type="button"
                        className="float-right text-lg font-semibold text-black opacity-50 bg-transparent border-none"
                        data-dismiss="alert"
                        onClick={() => setFacebookSignUpErrorMessage("")}
                      >
                        ×
                      </button>
                      <strong id="message_show">
                        {facebookSignUpErrorMessage}
                      </strong>
                    </div>
                  )}
                  {/* ****************Success Message LinkedIn***************** */}
                  {linkdinSignUpSuccessMessage !== "" && (
                    <div className="w-auto bg-[#d4edda] ml-auto m-10 p-5 text-[#155724] rounded data1">
                      <button
                        type="button"
                        className="float-right text-lg font-semibold text-black opacity-50 bg-transparent border-none"
                        data-dismiss="alert"
                        onClick={() => setLinkdinSignUpSuccessMessage("")}
                      >
                        ×
                      </button>
                      <strong id="message_show">
                        {linkdinSignUpSuccessMessage}
                      </strong>
                    </div>
                  )}
                  {/* ****************error Message Linkedin***************** */}
                  {linkdinSignUpErrorMessage !== "" && (
                    <div className="w-auto bg-[#f87171] ml-auto m-10 p-5 text-[#b91c1c] rounded data">
                      <button
                        type="button"
                        className="float-right text-lg font-semibold text-black opacity-50 bg-transparent border-none"
                        data-dismiss="alert"
                        onClick={() => setLinkdinSignUpErrorMessage("")}
                      >
                        ×
                      </button>
                      <strong id="message_show">
                        {linkdinSignUpErrorMessage}
                      </strong>
                    </div>
                  )}
                  <div className="step lg:mb-[50px]">
                    <form
                      role="form"
                      id="frm_step1"
                      method="post"
                      autoComplete="off"
                      enctype="multipart/form-data"
                      onSubmit={handleSubmit}
                    >
                      <div
                        className="panel panel-primary setup-content"
                        id="step-1"
                      >
                        <div className="panel-body tracking-wide">
                          <div className="row">
                            <div className="col-md-12">
                              <h1
                                className={`${mulish700.className} text-[#343434] text-[44px] font-700 mb-[30px]`}
                              >
                                Create a new account
                              </h1>
                              <div className="footer-line">
                                <span>
                                  Already have an account?{" "}
                                  <Link href="/login">Log in</Link>
                                </span>
                              </div>
                              <div
                                className={`${inter500.className} flex flex-col justify-start xl:flex-row xl:items-center gap-2 xl:gap-3 my-6 pt-5 lg:pt-0 md:mr-10 lg:mr-0`}
                              >
                                <GoogleAuth
                                  setGoogleSignUpErrorMessage={
                                    setGoogleSignUpErrorMessage
                                  }
                                  setGoogleSignUpSuccessMessage={
                                    setGoogleSignUpSuccessMessage
                                  }
                                />

                                <FacebookLogin
                                  appId={
                                    process.env.NEXT_PUBLIC_FACEBOOK_APP_ID
                                  }
                                  autoLoad={false}
                                  callback={responseFacebook}
                                  cssClass="bg-[#1877f2] h-[38.4px] flex items-center transition-all duration-200 ease-in-out border border-[#fff] p-1 xl:p-2 tracking-wide rounded text-white gap-1 xl:gap-3 text-[11px] md:max-lg:text-base xl:text-base w-[100%] xl:w-auto flex justify-center xl:justify-start hover:border-[#fff]"
                                  textButton={
                                    <span className="shrink-0 text-sm">
                                      Sign Up with Facebook
                                    </span>
                                  }
                                  icon={facebookIcon}
                                />
                                <LinkedIn
                                  clientId={
                                    process.env.NEXT_PUBLIC_LINKEDIN_APP_ID
                                  }
                                  className="btn btn-linked"
                                  redirectUri={
                                    process.env
                                      .NEXT_PUBLIC_LINKEDIN_CALLBACK_URI
                                  }
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
                                      className="bg-[#0274b3] h-[38.4px] cursor-pointer flex tracking-wide transition-all duration-200 ease-in-out items-center border border-[#fff] p-1 xl:p-2 rounded text-white gap-1 xl:gap-3 text-[11px] md:max-lg:text-base xl:text-base  justify-center xl:justify-start hover:border-[#fff]"
                                      onClick={linkedInLogin}
                                    >
                                      <span className="">{linkdinIcon}</span>
                                      <p className="flex items-center text-sm">
                                        Sign Up with Linkedin
                                      </p>
                                    </div>
                                  )}
                                </LinkedIn>
                              </div>
                              <div className="or-email mt-10">
                                <p
                                  className={`${mulish400.className} text-[17px] text-[#7E8082] text-center`}
                                >
                                  Or Sign up with Email
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="form-group">
                                <label
                                  className={`${inter500.className} control-label`}
                                  style={{ display: "block" }}
                                >
                                  First Name
                                  <span className="error my-1">*</span>
                                </label>
                                <input
                                  maxLength="100"
                                  type="text"
                                  name="firstname" // Corrected name attribute
                                  id="fname"
                                  placeholder="Enter First Name"
                                  value={formData.firstname} // Corrected key in formData
                                  onChange={handleInputChange}
                                />
                                {errors.firstname ||
                                formData.firstname === "" ? (
                                  <p className="error my-1" id="fname_error">
                                    {errors.firstname}
                                  </p>
                                ) : (
                                  ""
                                )}
                              </div>
                              <div className="form-group">
                                <label
                                  className={`${inter500.className} control-label`}
                                  style={{ display: "block" }}
                                >
                                  Last Name<span className="error my-1">*</span>
                                </label>
                                <input
                                  maxLength="100"
                                  type="text"
                                  name="lastname" // Corrected name attribute
                                  id="lname"
                                  placeholder="Enter Last Name"
                                  value={formData.lastname} // Corrected key in formData
                                  onChange={handleInputChange}
                                />
                                {errors.lastname || formData.lastname === "" ? (
                                  <p className="error my-1" id="fname_error">
                                    {errors.lastname}
                                  </p>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <div className="form-group">
                                <label
                                  className={`${inter500.className} control-label`}
                                  style={{ display: "block" }}
                                >
                                  Email<span className="error my-1">*</span>
                                </label>
                                <input
                                  maxlength="100"
                                  type="text"
                                  name="email"
                                  id="email"
                                  value={formData.email} // Corrected key in formData
                                  onChange={handleInputChange}
                                  className="form-control"
                                  placeholder="Enter Email"
                                />
                                {errors.email && (
                                  <p className="error my-1" id="fname_error">
                                    {errors.email}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <div className="form-group">
                                <label
                                  className={`${inter500.className} control-label`}
                                  style={{ display: "block" }}
                                >
                                  Password<span className="error my-1">*</span>
                                </label>
                                <div className="relative">
                                  <input
                                    maxlength="100"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    className="form-control"
                                    placeholder="Enter Password"
                                    value={formData.password}
                                    onChange={handlePasswordChange}
                                  />
                                  <span
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer inline-flex items-center px-3 text-sm text-gray rounded-s-md border-grey"
                                  >
                                    {showPassword ? showPassIcon : hidePassIcon}
                                  </span>
                                </div>
                                {formData.password && (
                                  <PasswordChecklist
                                    password={formData.password}
                                  />
                                )}
                                {errors.password &&
                                  formData.password === "" && (
                                    <p className="error my-1" id="fname_error">
                                      {errors.password}
                                    </p>
                                  )}
                              </div>
                            </div>
                            {/*country start  */}
                            <div className="col-sm-12">
                              <div className="form-group">
                                <label
                                  className={`${inter500.className} control-label`}
                                  style={{ display: "block" }}
                                >
                                  Country<span className="error my-1">*</span>
                                </label>
                                <select
                                  className="fast-input-content w-100"
                                  onChange={handleCountryChange}
                                >
                                  <option value="">Select Country</option>
                                  {countryList.map((country) => (
                                    <option
                                      key={country.id}
                                      value={country._id}
                                    >
                                      {country.name}
                                    </option>
                                  ))}
                                </select>
                                {errors.country && formData.country === "" && (
                                  <p className="error my-1" id="fname_error">
                                    {errors.country}
                                  </p>
                                )}
                              </div>
                            </div>
                            {/* country end */}
                            <div className="col-md-12">
                              <div className="form-check flex flex-row items-baseline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value="1"
                                  id="subscription"
                                  checked={formData.subscription === "1"} // Check if termsconditions is '1'
                                  onChange={handleCheckboxChange} // Handle checkbox change
                                />
                                <label
                                  style={{
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                  }}
                                  className="form-check-label "
                                  htmlFor="subscription"
                                >
                                  Send occassional email to help me get the most
                                  out of Praiki.
                                </label>
                                <p
                                  className="error my-1"
                                  id="defaultCheck1_error"
                                ></p>
                              </div>
                              <div className="form-check form-check items-baseline gap-2">
                                <input
                                  className="form-check-input "
                                  type="checkbox"
                                  value="2"
                                  name="termsconditions"
                                  id="termsconditions"
                                  checked={formData.termsconditions}
                                  onChange={(e) => {
                                    setFormData({
                                      ...formData,
                                      termsconditions: e.target.checked,
                                    });
                                    setErrors((prevErrors) => ({
                                      ...prevErrors,
                                      termsconditions: "", // Reset country error on change
                                    }));
                                  }}
                                />

                                <label
                                  style={{ marginLeft: "5px" }}
                                  className="form-check-label"
                                  for="termsconditions"
                                >
                                  I understand and agree to the Praiki{" "}
                                  <a
                                    href="/policy#scrollHere2"
                                    className="hoverLink"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Terms of Service
                                  </a>{" "}
                                  and{" "}
                                  <a
                                    href="/policy#scrollHere1"
                                    className="hoverLink"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Privacy Policy
                                  </a>
                                  .<span className="error my-1">*</span>
                                </label>
                                <p
                                  className="error my-1"
                                  id="defaultCheck2_error"
                                >
                                  {errors.termsconditions}
                                </p>
                                <div className="msgerror"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        className="btn btn-blue w-auto btn-account"
                        id="btn_step1"
                        type="submit"
                        disabled={isSubmitting} // Disable the button while submitting
                      >
                        {isSubmitting ? "Loading..." : "Create My Account"}{" "}
                        {/* Show loading text if submitting */}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Client;
