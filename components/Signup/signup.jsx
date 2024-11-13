import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import Logo from "../../public/logo.png";
import Logo2 from "../../public/image 5.png";

import getStartedImg from "../../public/AuthImages/get-start.jpg";
import { Inter } from "next/font/google";
import { Mulish } from "next/font/google";
import "./style.css";
import GoogleAuth from "../google/GoogleAuth";
import FacebookLogin from "react-facebook-login";
import { LinkedIn } from "react-linkedin-login-oauth2";
import emailvec from "../../public/images/Email verification/email-vec.png";
import imgEmail from "../../components/assets/CardDetail/email_conform.png";
import {
  Registration,
  Userverify,
  faceBookLogin,
  faceBookRegister,
  getCountriesForSignup,
  handleGoogleCallback,
  linkedInRegistration,
} from "../../app/api/api";
import Loader from "../common/Loader";
const inter = Inter({ subsets: ["latin"], weight: "500" });
const inter400 = Inter({ subsets: ["latin"], weight: "400" });
const inter700 = Inter({ subsets: ["latin"], weight: "700" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });
const inter500 = Inter({ subsets: ["latin"], weight: "500" });

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

function Signup() {
  const [selectedUserType, setSelectedUserType] = useState("");
  const [continueErr, setContinueErr] = useState("");
  const [googleSignUpErrorMessage, setGoogleSignUpErrorMessage] = useState("");
  const [googleSignUpSuccessMessage, setGoogleSignUpSuccessMessage] =
    useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countryLoading, setCountryLoading] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [countryError, setCountryError] = useState("");
  const [countryid, setCountryid] = useState("");
  const [storeEmail, setStoreEmail] = useState();
  const [signUp, setSignUp] = useState(false);
  const [userTypeError, setUserTypeError] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null); // Create a ref for the popup
  const [popupMessage, setPopupMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(900);
  const [storeId, setStoreId] = useState("");

  const countryNameget = countryList.find(
    (item) => item.id === parseInt(countryid)
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  let id = "";

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.firstname) {
      newErrors.firstname = "First Name is required";
      isValid = false;
    }
    if (!formData.lastname) {
      newErrors.lastname = "Last Name is required";
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }
    if (!formData.country) {
      newErrors.country = "Country is required";
      isValid = false;
    }
    if (!formData.termsconditions) {
      newErrors.termsconditions = "You must agree to the terms and conditions";
      isValid = false;
    }
    if (!selectedUserType) {
      newErrors.userTypeError = "Please select a user type";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRadioChange = (event) => {
    const userType = event.target.value;
    setSelectedUserType(userType);

    // Determine the store ID based on the selected user type
    const storeIds =
      userType === "Client" ? 1 : userType === "Professional" ? 2 : "";

    setStoreId(storeIds);

    // Update the formData with the appropriate store ID
    setFormData((prevFormData) => ({
      ...prevFormData,
      login_as: storeIds,
    }));

    setContinueErr(""); // Clear error state if applicable
  };

  const responseFacebook = async (response) => {
    if (response.error) {
      setFacebookSignUpErrorMessage(response.error.message);
      return;
    }
    let data = {
      token: response.signedRequest,
      accessToken: response.accessToken,
      id: storeId, // Use the storeId from state here
    };

    const result = await faceBookRegister(data);
    if (result?.data?.success) {
      setFacebookSignUpSuccessMessage("Signup Successful");
      const existingToken = Cookies.get("authToken");
      const options = {
        expires: new Date(Date.now() + 12 * 60 * 60 * 1000),
      };
      if (!existingToken) {
        Cookies.set("authToken", result.data.data.authToken, options);
      }
      if (storeId === 1) {
        window.location.href = "/projects";
      } else if (storeId === 2) {
        window.location.href = "/findwork";
      }
    } else {
      setFacebookSignUpErrorMessage("Login Failed.");
    }
  };

  useEffect(() => {
    const url = window.location.href;
    const params = new URL(url).searchParams;
    const userType = params.get("userType");

    if (userType) {
      const cleanedUserType = userType.replace(/"/g, "").trim();
      if (cleanedUserType === "Client" || cleanedUserType === "Professional") {
        const storeIds = cleanedUserType === "Client" ? 1 : cleanedUserType === "Professional" ? 2 : "";
  
        setStoreId(storeIds);
        setSelectedUserType(cleanedUserType);
        setFormData((prev) => ({
          ...prev,
          login_as: cleanedUserType == "Client" ? 1 : 2,
        }));
      } else {
        console.warn(`Invalid user type: ${cleanedUserType}`);
      }
    }
  }, []);

  // useEffect(() => {
  //   const url = window.location.href;
  //   const params = new URL(url).searchParams;
  //   const userType = params.get('userType');

  //   console.log("userType", userType)
  // }, []);

  useEffect(() => {
    if (countryNameget) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        country: countryNameget.name || "",
      }));
    } else {
    }
  }, [countryNameget?.id]);

  // Function to handle input change

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    termsconditions: false,
    login_as: "",
    subscription: false,
  });
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    termsconditions: "",
    userTypeError: "",
  });
  const [emailSignUpErr, setEmailSignErr] = useState("");

  const validatePasswords = () => {
    let isValid = true;
    const newErrors = { password: "", confirmPassword: "" };

    if (formData.password === "") {
      newErrors.password = "Password is required";
      isValid = false;
    }
    if (formData.confirmPassword === "") {
      newErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
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
    setErrors(newErrors);
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
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

  // if (type === "checkbox") {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: checked,
  //   }));
  // } else {
  //   // Handle other input fields
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // }

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    const value = checked ? "1" : ""; // If checked, set value to '1', otherwise ''
    setFormData((prevFormData) => ({
      ...prevFormData,
      subscription: value, // Update termsconditions with the value
    }));
  };

  const fetchCountries = async () => {
    try {
      setCountryLoading(true);
      const response = await getCountriesForSignup();
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
    } finally {
      setCountryLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const getCountryName = (countryid) => {
    const selectedCountry = countryList.find(
      (country) => country.id === countryid
    );
    return selectedCountry ? selectedCountry.name : "";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const Email = formData.email;

    if (!validateForm()) return;

    setIsSubmitting(true);
    setStoreEmail(Email);

    try {
      // Call the registration API
      const response = await Registration(formData);

      if (response && response.data) {
        if (response.data.success) {
          // Reset the form if registration is successful
          setFormData({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmPassword: "",
            country: "",
            termsconditions: false,
            login_as: "",
            subscription: false,
          });
          setSignUp(true);
          setEmailSignErr("");
          setShowPopup(true);

          // Ensure email is set before calling sendEmail
          if (Email) {
            await sendEmail(Email);
          } else {
            console.error("Email is not set in formData");
          }
        } else {
          if (response.data.error === "Email already exists") {
            setErrors((prevErrors) => ({
              ...prevErrors,
              email: "Email already exists",
            }));
            setEmailSignErr("Email already exists");
          }
        }
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      if (error.response && error.response.data) {
        console.error("Error details:", error.response.data);
      }
    } finally {
      setIsSubmitting(false); // Reset submitting state regardless of success or failure
    }
  };

  useEffect(() => {
    if (countryid !== 0) {
    }
  }, [countryid]);
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
    let newErrors = { ...errors };
    let value = e.target.value;
    if (value.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
      newErrors.password = "Password must contain a special character";
    else if (!/[0-9]/.test(value))
      newErrors.password = "Password must contain a number";
    else if (!/[A-Z]/.test(value))
      newErrors.password = "Password must contain a capital letter";
    else newErrors.password = "";
    setErrors(newErrors);
    setFormData({ ...formData, password: e.target.value });
  };

  const sendEmail = async (Email) => {
    try {
      if (!Email) {
        console.error("No email provided for verification.");
        return;
      }

      const data = { email: Email };

      // Assuming Userverify is an asynchronous function
      const response = await Userverify(data);

      if (response && response.data) {
        // Handle the response as needed
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error during email verification:", error);
    }
  };

  const linkedInSuccess = async (code) => {
    try {
      if (num == 0 && code) {
        num++;
        let payload = {
          token: code,
          id: storeId, // Use the storeId from state here
        };
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
          if (storeId === 1) {
            window.location.href = "/projects";
          } else if (storeId === 2) {
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

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowPopup(false); // Close popup if clicked outside
    }
  };

  useEffect(() => {
    // Attach event listener on mount
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {showPopup && (
        // <div className="popup-overlay">
        //   <div className="popup-content" ref={popupRef}>
        //     <div className="flex flex-col items-center justify-center">
        //       <div className="email-images">
        //         <Image src={emailvec} alt="alt" width={200} height={200} />
        //       </div>
        //       <div className="contentEmail flex flex-col items-center justify-center tracking-normal">
        //         <h2>Confirm your email</h2>
        //         <p>
        //           Please go to your mailbox and <span>continue</span> to confirm
        //           your email
        //           <span>({storeEmail}).</span>
        //           <br className="hidden md:block" />
        //           Be sure to check the spam folder{" "}
        //         </p>
        //       </div>
        //     </div>
        //     <button onClick={() => setShowPopup(false)}>Close</button>
        //   </div>
        // </div>
        <div className="fixed bg-[#00000080] top-0 bottom-0 left-0 right-0 z-1 flex justify-center">
          <div
            className="flex flex-row bg-white rounded-[32px] my-auto mx-[10px] md:my-auto md:mx-auto w-[20rem] h-[20rem] md:w-[25rem] md:h-[460px]"
            ref={popupRef}
          >
            {/* <div className="w-[17.5rem] hidden md:block">
              <Image
                src={imgEmail}
                className="object-cover h-full rounded-tl-[32px] rounded-bl-[32px] "
              />
            </div> */}
            <div className="flex flex-col flex-1 items-center justify-start">
              <div className="w-full h-[10rem] md:h-[17rem] items-end flex justify-center">
                <Image
                  src={emailvec}
                  alt="alt"
                  className="w-[9rem] h-[7rem] md:w-[15rem] md:h-[11rem] lg:w-[50%] lg:h-[50%] mb-2 md:mb-4"
                />
              </div>
              <div className="py-0 px-6">
                <p
                  className={`text-[24px] md:text-[30px] leading-[52.8px] ${mulish700.className}`}
                >
                  Register Sucessfuly
                </p>
              </div>
              <div>
                <p
                  className={`text-[12px] md:text-[13px] ${inter400.className} text-center px-7 md:px-12`}
                >
                  Welcome to freelance platform
                </p>
                <p
                  className={`text-[12px] md:text-[13px] ${inter400.className} text-center px-5 md:px-0`}
                >
                  your email ({storeEmail}) is registerd.
                </p>
                {/* <p
                  className={`text-[12px] md:text-[13px] ${inter400.className} text-center px-5 md:px-3`}
                >
                  to check please login with this email
                </p> */}
                {/* <p
                  className={`text-[12px] md:text-[14px] ${inter400.className} text-center px-5 md:px-3`}
                >
                  Please go to your mailbox and <span>continue</span> to confirm
                  your email <span>Yash.bhimani@gmail.com.</span>
                  <br className="hidden md:block" />
                  Be sure to check the spam folder
                </p> */}
              </div>
            </div>
          </div>
        </div>
      )}

      {countryLoading ? (
        <Loader />
      ) : (
        <section className="bg-white md:h-[100vh] overflow-hidden">
          <div className="flex flex-col md:flex-row bg-[#f1f3f6] h-[100vh] overflow-auto">
            <div className="hidden lg:block w-full lg:w-[42%] h-[100vh] relative">
              <div className="absolute left-5 top-5 w-[8rem]">
                <a href="/">
                  <Image src={Logo} alt="praiki_logo" />
                </a>
              </div>
              <div className="w-full h-full">
                <Image
                  src={getStartedImg}
                  className="w-full h-full object-cover object-top"
                  alt="Get Started"
                />
              </div>
            </div>
            <div className="flex justify-center items-start w-[100%] lg:w-[58%] m-auto h-full mt-22 sm:mt-0 py-8 md:py-30 lg:py-14 overflow-y-auto px-6 sm:px-20 lg:px-0 scrollbar-custom">
              <div className="lg:relative w-full lg:w-[80%] xl:w-[70%]">
                <div className="absolute left-5 top-5 w-[8rem] block lg:hidden">
                  <a href="/">
                    <Image src={Logo2} alt="praiki_logo" width={"85%"} />
                  </a>
                </div>
                <h1
                  className={`text-[25px] md:text-[34px] lg:text-[45px] text-center mb-6 text-box_clr ${mulish700.className}`}
                >
                  Create a new account
                </h1>

                <form method="post" action="#" onSubmit={handleSubmit}>
                  <div>
                    <div className="flex justify-between gap-2 sm:gap-8 custome-height">
                      <label
                        htmlFor="flexRadioDefault1"
                        className={`flex items-center bg-white w-full pl-3 sm:pl-5 text-sm ${inter.className} rounded-[15px] cursor-pointer w-full h-[40px]`}
                      >
                        <input
                          className="mr-2"
                          type="radio"
                          name="user_type"
                          id="flexRadioDefault1"
                          value="Client"
                          checked={selectedUserType === "Client"}
                          onChange={handleRadioChange}
                        />
                        <span className="tracking-wide text-client_color cursor-pointer">
                          Client
                        </span>
                      </label>

                      <label
                        htmlFor="flexRadioDefault2"
                        className={`flex items-center pl-3 sm:pl-5 bg-white w-full text-sm ${inter.className} rounded-[15px] cursor-pointer custome-margin h-[40px]`}
                      >
                        <input
                          className="mr-2"
                          type="radio"
                          name="user_type"
                          id="flexRadioDefault2"
                          value="Professional"
                          checked={selectedUserType === "Professional"}
                          onChange={handleRadioChange}
                        />
                        <span className="tracking-wide text-client_color cursor-pointer">
                          Professional
                        </span>
                      </label>
                    </div>
                    <div className="m-1">
                      {errors.userTypeError && (
                        <p className="error my-1 text-red-500">
                          {errors.userTypeError}
                        </p>
                      )}
                    </div>
                  </div>
{/* 
                  <div className="flex justify-center items-center flex-row">
                    <div className="text-xl pr-[20px]">Sign up with:</div>
                    <div
                      className={`${inter500.className} ${
                        selectedUserType == "" && "pointer-events-none"
                      } mobile_view  flex flex-row justify-start md:flex-row xl:items-center gap-2 xl:gap-3 my-6 md:mr-10 lg:mr-0`}
                    >
                      <GoogleAuth
                        setGoogleSignUpErrorMessage={
                          setGoogleSignUpErrorMessage
                        }
                        setGoogleSignUpSuccessMessage={
                          setGoogleSignUpSuccessMessage
                        }
                        storeId={storeId} // Pass the storeId as a prop
                        disabled={selectedUserType} // Disable when no user type is selected
                      />

                      <FacebookLogin
                        appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
                        autoLoad={false}
                        callback={responseFacebook}
                        cssClass="bg-[#1877f2] h-[38.4px] flex items-center transition-all duration-200 ease-in-out border border-[#fff] p-2 lg:p-1 xl:p-2 tracking-wide rounded text-white gap-1 xl:gap-3 text-[11px] md:max-lg:text-base xl:text-base w-[100%] xl:w-auto flex justify-center xl:justify-start hover:border-[#fff]"
                        icon={facebookIcon}
                        textButton=""
                        disabled={selectedUserType} // Disable when no user type is selected
                      />
                      <LinkedIn
                        clientId={process.env.NEXT_PUBLIC_LINKEDIN_APP_ID}
                        className="btn btn-linked"
                        redirectUri={
                          process.env.NEXT_PUBLIC_LINKEDIN_CALLBACK_URI
                        }
                        scope="email openid profile"
                        onSuccess={(code) => {
                          linkedInSuccess(code);
                        }}
                        onError={(error) => {
                          linkedInFailed(error);
                        }}
                        disabled={selectedUserType} // Disable when no user type is selected
                      >
                        {({ linkedInLogin }) => (
                          <div
                            className="bg-[#0274b3] h-[38.4px] cursor-pointer flex tracking-wide transition-all duration-200 ease-in-out items-center border border-[#fff] p-2 lg:p-1 xl:p-2 rounded text-white gap-1 xl:gap-3 text-[11px] md:max-lg:text-base xl:text-base  justify-center xl:justify-start hover:border-[#fff]"
                            onClick={linkedInLogin}
                          >
                            <span className="">{linkdinIcon}</span>
                          </div>
                        )}
                      </LinkedIn>
                    </div>
                  </div> */}
                  {googleSignUpErrorMessage && (
                    <div className="error-message text-red flex justify-center font-bold">
                      {googleSignUpErrorMessage}
                    </div>
                  )}

                  {/* <div className="flex w-full justify-center items-center">
                    <div className="border-b-[1px] border-[#b0b5b8] w-[15%]"></div>
                    <div className="md:w-[72px] text-center mx-3">Or Email</div>
                    <div className="border-b-[1px] border-[#b0b5b8] w-[15%]"></div>
                  </div> */}

                  <input
                    type="hidden"
                    name="_token"
                    value="OWtzYnV0yNjCcZo3Is6SboCl58acAEvL4oDohtEh"
                  />
                  <div className="mt-[15px] space-y-3 sm:space-y-5">
                    <div className="flex flex-col sm:flex-row justify-between items-start space-y-3 sm:space-y-0 sm:gap-8">
                      <div className="form-group w-full">
                        <label
                          className={`control-label`}
                          style={{ display: "block" }}
                        >
                          First Name
                          <span className="error my-1">*</span>
                        </label>
                        <input
                          className="rounded-[6px] h-[35px] pl-[10px] border border-[#b0b5b8] w-full"
                          maxLength="100"
                          type="text"
                          name="firstname"
                          id="fname"
                          placeholder="Enter First Name"
                          value={formData.firstname}
                          onChange={handleInputChange}
                        />
                        {errors.firstname && (
                          <p className="error my-1" id="fname_error">
                            {errors.firstname}
                          </p>
                        )}
                      </div>
                      <div className="form-group w-full">
                        <label
                          className={`control-label`}
                          style={{ display: "block" }}
                        >
                          Last Name
                          <span className="error my-1">*</span>
                        </label>
                        <input
                          className="rounded-[6px] h-[35px] pl-[10px] border border-[#b0b5b8] w-full"
                          maxLength="100"
                          type="text"
                          name="lastname"
                          id="lname"
                          placeholder="Enter Last Name"
                          value={formData.lastname}
                          onChange={handleInputChange}
                        />
                        {errors.lastname && (
                          <p className="error my-1" id="lname_error">
                            {errors.lastname}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="form-group">
                        <label
                          className={`control-label`}
                          style={{ display: "block" }}
                        >
                          Email
                          <span className="error my-1">*</span>
                        </label>
                        <input
                          maxLength="100"
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="form-control rounded-[6px] h-[35px] pl-[10px] border border-[#b0b5b8] w-full"
                          placeholder="Enter Email"
                        />
                        {errors.email && (
                          <p className="error my-1" id="email_error">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start space-y-3 sm:space-y-0 sm:gap-8">
                      <div className="form-group w-full">
                        <label
                          className={`control-label`}
                          style={{ display: "block" }}
                        >
                          Password
                          <span className="error my-1">*</span>
                        </label>
                        <div className="relative">
                          <input
                            maxLength="100"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            className="form-control rounded-[6px] h-[35px] pl-[10px] border border-[#b0b5b8] w-full pr-8"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handlePasswordChange}
                          />
                          <span
                            onClick={togglePasswordVisibility}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer inline-flex items-center px-3 text-sm text-gray rounded-s-md border-grey"
                          >
                            {showPassword ? showPassIcon : hidePassIcon}
                          </span>
                        </div>
                        {errors.password && (
                          <p className="error my-1" id="password_error">
                            {errors.password}
                          </p>
                        )}
                      </div>

                      <div className="form-group w-full">
                        <label
                          className={`control-label`}
                          style={{ display: "block" }}
                        >
                          Confirm Password
                          <span className="error my-1">*</span>
                        </label>
                        <div className="relative">
                          <input
                            maxLength="100"
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            id="confirmPassword"
                            className="rounded-[6px] h-[35px] pl-[10px] border border-[#b0b5b8] w-full pr-8"
                            placeholder="Re-enter Password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                          />
                          <span
                            onClick={toggleConfirmPasswordVisibility}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer inline-flex items-center px-3 text-sm text-gray rounded-s-md border-grey"
                          >
                            {showConfirmPassword ? showPassIcon : hidePassIcon}
                          </span>
                        </div>
                        {errors.confirmPassword && (
                          <p className="error my-1" id="confirmPassword_error">
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* Country Selection */}
                    <div className="w-full">
                      <div className="form-group">
                        <label
                          className={`control-label`}
                          style={{ display: "block" }}
                        >
                          Country
                          <span className="error my-1">*</span>
                        </label>
                        <select
                          name="country"
                          className="fast-input-content w-full rounded-[6px] h-[35px] pl-[10px] border border-[#b0b5b8] my-[10px]"
                          onChange={handleInputChange}
                          value={formData.country}
                        >
                          <option value="">Select Country</option>
                          {countryList.map((country) => (
                            <option key={country._id} value={country._id}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                        {errors.country && (
                          <p className="error my-1" id="country_error">
                            {errors.country}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* End Country Selection */}
                    <div className="w-full space-y-2">
                      <div className="form-check flex flex-row items-center">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="subscription"
                          id="subscription"
                          checked={formData.subscription}
                          onChange={handleInputChange}
                        />
                        <label
                          style={{
                            marginLeft: "5px",
                            cursor: "pointer",
                            fontSize: "10px !important",
                          }}
                          className="form-check-label custome-text "
                          htmlFor="subscription"
                        >
                          Send occasional email to help me get the most out of
                          Praiki.
                        </label>
                      </div>
                      <div>
                        <div className="form-check form-check flex flex-row items-center">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="termsconditions"
                            id="termsconditions"
                            checked={formData.termsconditions}
                            onChange={handleInputChange}
                          />
                          <label
                            style={{
                              marginLeft: "5px",
                              fontSize: "10px !important",
                            }}
                            className="form-check-label custome-text"
                            htmlFor="termsconditions"
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
                        </div>
                        {errors.termsconditions && (
                          <p className="error my-1" id="termsconditions_error">
                            {errors.termsconditions}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-[20px] space-y-2 flex flex-row gap-8 flex-wrap">
                    <button
                      className="btn btn-blue btn-account w-full lg:w-[33%] text-[17px] pt-[4px]"
                      id="btn_step1"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Loading..." : "Create My Account"}
                    </button>
                    <div
                      className={`text-lg text-client_color text-center lg:text-left tracking-wide flex-1 md:flex-0`}
                    >
                      <span className="text-[16px] text-center">
                        Already have an account?{" "}
                        <Link
                          href="/login"
                          className={`text-btn_bg hover:text-[#ff661e] ${inter700.className}`}
                        >
                          Log in
                        </Link>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Signup;
