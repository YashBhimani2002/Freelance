"use client";
/* eslint-disable */
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "./forgot.css";
import "../../components/Login/login.css";
import { ForgotPassword } from "../../app/api/api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import praikiLogo from "../../public/praiki.svg";
import loginImage from "../../public/login.jpg";
import { Inter } from "next/font/google";
import { Mulish } from "next/font/google";
import Logo2 from "../../public/image 5.png";

const inter = Inter({ subsets: ["latin"], weight: "500" });
const mulish = Mulish({ subsets: ["latin"], weight: "700" });

const backArrowIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.828 6.99968H16V8.99968H3.828L9.192 14.3637L7.778 15.7777L0 7.99968L7.778 0.22168L9.192 1.63568L3.828 6.99968Z"
      fill="#7E8082"
    />
  </svg>
);

function Forgot() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isResetAllowed, setIsResetAllowed] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const validateEmail = () => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError("Email is required");
      setIsResetAllowed(false);
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      setIsResetAllowed(false);
    } else {
      setEmailError("");
      setIsResetAllowed(true);
    }
  };
  useEffect(() => {
    // Reset email error when email changes
    setEmailError("");
  }, [email]);

  useEffect(() => {
    // Call handleResetPassword when isResetAllowed changes
    if (isResetAllowed) {
      handleResetPassword();
    }
  }, [isResetAllowed]);

  const handleResetPassword = async () => {
    validateEmail();
    const data = { email: email };
    if (isResetAllowed) {
      try {
        // Make an API call to check if the email exists
        const response = await ForgotPassword(data);
        if (response?.data?.success) {
          setIsEmailSent(true);
          setEmail("");
          setEmailError("");
        } else {
          // Handle the case where the email doesn't exist
          if (response?.data?.success === false) {
            setEmailError(response.data.message);
          }
        }
      } catch (error) {
        // Handle API call errors
        console.log("API call error:", error.message);
      }
    }
  };
  const closeResetSuccessPopup = () => {
    setIsEmailSent(false);
  };
  return (
    <>
      <div className="bg-white h-[100vh] overflow-x-hidden">
        <div className=" flex flex-col md:flex-row justify-center lg:justify-start  h-full w-screen bg-[#F1F3F6] overflow-y-scroll">
          {/* ----------left side-------- */}
          <div className="w-auto h-full hidden lg:block lg:w-[42%] relative overflow-hidden">
            <div className="w-32 absolute top-3 left-2">
              <a href="#">
                <Image
                  src={praikiLogo}
                  alt="logo"
                  title=""
                  width={140}
                  height={60}
                />
              </a>
            </div>
            <div className="w-full h-full overflow-hidden md:pr-1">
              <a href="#">
                <Image
                  src={loginImage}
                  alt="image"
                  width={800}
                  height={2000}
                  className="w-full h-full object-cover object-top"
                />
              </a>
            </div>
          </div>
          {/* ----------right side-------- */}
          <div className=" w-full lg:w-[58%] h-full px-10 md:px-0 lg:ml-7 lg:mx-0 md:mx-10 md:overflow-y-auto">
            <div className="absolute top-8 block lg:hidden">
              <div className="w-32">
                <a href="#">
                  <Image
                    src={Logo2}
                    alt="logo"
                    title=""
                    width={140}
                    height={60}
                  />
                </a>
              </div>
            </div>
            {isEmailSent && (
              <div className="absolute top-30 right-0 lg:relative lg:top-0 flex justify-between w-auto bg-[#d4edda] lg:ml-auto lg:m-10 p-5 text-[#155724] rounded data1">
                <strong className="">Reset email sent successfully</strong>
                <button
                  type="button"
                  className="mx-4 lg:mx-0"
                  onClick={closeResetSuccessPopup}
                >
                  x
                </button>
              </div>
            )}
            <div className="py-5 lg:px-0 lg:py-16 forget-psw-sec-responsive">
              <div className="">
                <h1
                  className={` ${mulish.className} text-[#434343] text-[25px] md:text-[34px] lg:text-[45px] text-center lg:text-left`}
                >
                  Forgot Password?
                </h1>
                <div
                  className={` ${inter.className} text-sm md:text-lg font-medium text-center lg:text-left my-2 lg:my-5`}
                >
                  <span className="text-[#2D3748] tracking-wide">
                    No worries, we'll send you reset instructions.
                  </span>
                </div>
                <div className="mt-4 lg:mt-7 mr-0 lg:mr-[20%] xl:mr-[20%]">
                  <div
                    className={`${inter.className} flex flex-col text-base text-client_color space-y-2 md:space-y-3 py-3 md:py-5`}
                  >
                    <label
                      htmlFor="exampleInputEmail1"
                      className="tracking-wide"
                    >
                      Email<span className="text-red">*</span>
                    </label>

                    <input
                      type="email"
                      className="p-2 text-sm bg-[#fff] border border-inputbordercolor rounded-[6px]"
                      id="email"
                      name="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <p className="text-sm text-red" id="email_error">
                      {emailError}
                    </p>
                  </div>
                </div>
                <div className={inter.className}>
                  {isEmailSent ? (
                    <p
                      className={` ${inter.className} text-danger text-sm md:text-lg font-medium text-center md:text-left text-[#2D3748] tracking-wide`}
                    ></p>
                  ) : (
                    <button
                      className="bg-submtBtn rounded-[10px] text-white text-base py-2 px-3 w-full lg:w-auto border border-transparent hover:text-submtBtn hover:border-submtBtn cursor-pointer hover:bg-transparent"
                      id="btn_reset_password"
                      type="button"
                      onClick={handleResetPassword}
                    >
                      Reset Password
                    </button>
                  )}
                </div>
              </div>
              <div className={`${inter.className} py-14 group`}>
                <Link
                  className="flex items-center gap-3 text-[#1068AD] group-hover:text-[#ff661e]"
                  href="/login"
                >
                  <span className="group-hover:text-[#2884cc]">
                    {backArrowIcon}
                  </span>
                  Back To Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Forgot;
