"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import PraikiLogo from "@/public/image 3Praiki-Logo.png";
import { Inter } from "next/font/google";
import { useParams, useRouter } from "next/navigation";
import { resetPassword } from "@/app/api/api";

const inter600 = Inter({ subsets: ["latin"], weight: "600" });
const inter400 = Inter({ subsets: ["latin"], weight: "400" });

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

function ResetPassword() {
  const url = window.location.href;
  const lastSlashIndex = url.lastIndexOf("/");
  const token = url.substring(lastSlashIndex + 1);
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [emailExpireError, setEmailExpireError] = useState("");
  const [successPopup, setSuccessPopup] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
    validatePass: "",
  });

  const closeResetSuccessPopup = () => {
    setSuccessPopup(false);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
  };

  function PasswordChecklist({ password }) {
    const rules = {
      minLength: password.length >= 8,
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      number: /[0-9]/.test(password),
      capital: /[A-Z]/.test(password),
    };
    const allValid = Object.values(rules).every((isValid) => isValid);

    if (allValid) {
      return null;
    }

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

  const validateAndSetField = (fieldName, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));

    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "New password must be at least 8 characters long";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "This field is required";
    } else if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = "Password does not match";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const data = { password: formData.newPassword, token: token };
      const response = await resetPassword(data);
      if (response?.status === 200) {
        setSuccessPopup(true);
        setTimeout(() => {
          setSuccessPopup(false);
          router.push("/login");
        }, 3000);
        setEmailExpireError("");
      } else {
        if (response.data.success === false) {
          setEmailExpireError(response.data.message);
        }
      }
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row max-w-screen h-[100vh] bg-[#E5E5E5] overflow-y-hidden">
        {/* left part */}
        <div className="flex-grow flex-shrink-0 lg:max-w-[500px] w-full  bg-[#1068AD] ">
          {/* Content for the top part */}
          <div className="py-4">
            <Image
              src={PraikiLogo}
              width={150}
              height={88}
              alt="Logo"
              className="ml-4"
            />
          </div>
        </div>

        {/* Right part */}
        <div
          className={`${inter400.className} flex-grow max-w-screen mx-auto my-20 px-3 lg:px-0`}
        >
          {successPopup && (
            <div
              style={{ margin: "0 80px" }}
              className="flex justify-between w-auto bg-[#d4edda] ml-4 mr-4 mx-10 p-5 text-[#155724] rounded data1"
            >
              <strong className="">
                Your password has been successfully reset.{" "}
              </strong>
              <button
                type="button"
                className=""
                onClick={closeResetSuccessPopup}
              >
                x
              </button>
            </div>
          )}
          {/* Content for the bottom part */}
          <div className="lg:px-20 lg:py-10 h-fit">
            <div className="top-banner my-3">
              <h1
                className={`${inter600.className} text-title-xl lg:text-title-xxl text-[#434343] text-center lg:text-start drop-shadow-md`}
              >
                Reset Password
              </h1>
            </div>
            <form
              className="reset-password-content grid grid-cols-1 lg:gap-5 gap-3"
              onSubmit={handleSubmit}
            >
              <div className="w-auto ">
                <label className="text-title-sm">New Password</label>
                <div className="relative flex">
                  <input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={formData.newPassword || ""}
                    className="block bg-white max-w-[554px] w-full mt-3 p-3 rounded-md border border-[#E5E5E5] rounded-tr-[0px] rounded-br-[0px] border-r-[0px]"
                    placeholder="Reset password"
                    onChange={(e) =>
                      validateAndSetField("newPassword", e.target.value)
                    }
                  />
                  <span
                    className="flex items-center mt-[13px] bg-white rounded-tr-lg rounded-br-lg p-[10px] h-[48px] border border-white"
                    onClick={toggleNewPasswordVisibility}
                  >
                    {showNewPassword ? showPassIcon : hidePassIcon}
                  </span>
                </div>
                {formData.newPassword && (
                  <PasswordChecklist password={formData.newPassword} />
                )}
                {errors.newPassword && (
                  <span className="text-danger text-md">
                    {errors.newPassword}
                  </span>
                )}
              </div>
              <div className="w-auto ">
                <label className="text-title-sm">Confirm Password</label>
                <div className="relative flex">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword || ""}
                    className="block bg-white max-w-[554px] w-full mt-3 p-3 rounded-md border border-[#E5E5E5] rounded-tr-[0px] rounded-br-[0px] border-r-[0px]"
                    placeholder="Confirm password"
                    onChange={(e) =>
                      validateAndSetField("confirmPassword", e.target.value)
                    }
                  />
                  <span
                    onClick={toggleConfirmPasswordVisibility}
                    className="flex items-center mt-[13px] bg-white rounded-tr-lg rounded-br-lg p-[10px] h-[48px] border border-white"
                  >
                    {showConfirmPassword ? showPassIcon : hidePassIcon}
                  </span>
                </div>

                {errors.confirmPassword && (
                  <span className="text-danger text-md">
                    {errors.confirmPassword}
                  </span>
                )}
                {emailExpireError && (
                  <span className="text-danger text-md">
                    {emailExpireError}
                  </span>
                )}
                {formData.confirmPassword && (
                  <PasswordChecklist password={formData.confirmPassword} />
                )}
              </div>
              <button
                className="bg-[#1068AD] text-white w-fit h-[38px] rounded-md border px-2 py-1 border-[#1068AD] hover:text-[#1068AD] hover:bg-white hover:border hover:border-[#1068AD] transition-all duration-300"
                type="submit"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
