"use client";
import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { Mulish } from "next/font/google";
import { getidentificationStatus, identity_verification } from "../api/api";
import icon from "../../public/icons8-success.gif";
import SuccessModal from "@/components/successModel/SuccessModal";
import io from "socket.io-client";
import Error from "../error";
import ErrorBoundary from "../ErrorBoundry";
import {
  createTheme,
  ThemeProvider,
  Tooltip,
  tooltipClasses,
} from "@mui/material";
import { useSocket } from "../socketContext";
const inter500 = Inter({ subsets: ["latin"], weight: "500" });
const inter400 = Inter({ subsets: ["latin"], weight: "400" });
const inter600 = Inter({ subsets: ["latin"], weight: "600" });
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });

const IdentityVerification = () => {
  const [formData, setFormData] = useState({
    file: null,
    documentType: "",
  });
  const [errors, setErrors] = useState({});
  const [fileFormatError, setFileFormatError] = useState("");
  const [successMessage, setsuccessMessage] = useState("");
  const [isSuccessModalOpen, setShowsuccessPopup] = useState(false);
  const [identityStatus, setidentitystatus] = useState("");
  // const serverUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  // const socket = io(serverUrl);
  const {socket} = useSocket()
  useEffect(() => {
    socket.on("verifiedstatus", async () => {
      getverificationstatus();
    });
  }, []);
  const handleChange = (e) => {
    const { name, files, value } = e.target;
    if (name === "file") {
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        file,
      }));
      // Clear file format error when file changes
      setFileFormatError("");
      errors.file = "";
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      if (name === "documentType") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          documentType: "",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      const payload = new FormData();
      payload.append("file", formData.file);
      payload.append("documentType", formData.documentType);
      // Send payload to server or perform further actions
      const response = await identity_verification(payload);
      if (response?.status === 201) {
        setsuccessMessage("Updated successfully");
        setShowsuccessPopup(true);
      }
    } else {
      setErrors(errors);
    }
  };
  const getverificationstatus = async () => {
    try {
      const response = await getidentificationStatus();
      if (response && response?.data?.success == true) {
        setidentitystatus(response?.data?.identitystatus?.status);
      }
    } catch (error) { }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowsuccessPopup(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isSuccessModalOpen]);

  useEffect(() => {
    getverificationstatus();
  }, []);

  const validateForm = (data) => {
    let errors = {};
    if (!data.file) {
      errors.file = "Please upload a file.";
    } else {
      const allowedFormats = ["application/pdf", "image/png", "image/jpeg"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedFormats.includes(data.file.type)) {
        errors.file = "File must be in PDF, PNG, or JPG format.";
        // setFileFormatError("File must be in PDF, PNG, or JPG format.");
      }

      if (data.file.size > maxSize) {
        errors.file = "File size must be 5MB or less.";
      }
    }

    if (!data.documentType) {
      errors.documentType = "Please select a document type.";
    }
    return errors;
  };
  const theme = createTheme({
    palette: {
      background: {
        paper: "#1168AD",
      },
      text: {
        primary: "#ffffff",
      },
    },
  });

  const tooltipClass = {
    popper: {
      sx: {
        [`& .${tooltipClasses.arrow}`]: {
          color: (theme) => theme.palette.background.paper,
        },
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: (theme) => theme.palette.background.paper,
        },
      },
    },
  };
  return (
    <ErrorBoundary fallback={<Error />}>
      <ThemeProvider theme={theme}>
        <div className="lg:px-12 lg:py-4">
          <h1 className={`text-black text-3xl ${mulish600.className} font-normal`}>
            <Tooltip title="Identity Verification" placement="right" arrow componentsProps={tooltipClass}>
              Identity Verification
            </Tooltip>
          </h1>
          <div className="my-5 p-5 border border-borderBlue rounded-xl">
            <h1
              className={`text-[#000000] text-[25px] ${mulish600.className} mb-5`}
            >
              ID Document Verification
            </h1>
            <h3
              className={`text-getstartTitle ${inter500.className} text-base font-medium`}
            >
              Verification status
            </h3>
            {identityStatus === 0 ? (
              <p className={`text-sm py-3 text-radiolabel ${inter400.className}`}>
                Unverified
              </p>
            ) : identityStatus === 1 ? (
              <p className={`text-sm py-3 text-radiolabel ${inter400.className}`}>
                Verified
              </p>
            ) : (
              <p className={`text-sm py-3 text-radiolabel ${inter400.className}`}>
                Unverified
              </p>
            )}
            <h3
              className={`text-getstartTitle ${inter500.className} text-base pt-5`}
            >
              Upload Identification
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="w-full flex flex-col md:flex-row items-start gap-0 md:gap-16 py-3">
                <div className="w-full md:w-1/2">
                  <p
                    className={`my-2 text-base ${inter500.className} text-client_color`}
                  >
                    Upload a file
                  </p>
                  <div className="relative flex items-center">
                    <input
                      type="file"
                      id="upload"
                      name="file"
                      className={`w-full border border-stroke p-2 text-sm h-11 m-0 text-[#ADADAD] ${inter400.className} text-[12.8px] cursor-pointer rounded-md`}
                      onChange={handleChange}
                    />
                  </div>
                  {fileFormatError && (
                    <p className="text-danger text-[12.8px] py-2">
                      {fileFormatError}
                    </p>
                  )}
                  {errors.file && (
                    <p className="text-danger text-[12.8px] py-2">{errors.file}</p>
                  )}
                  <p
                    className={`text-[#ADADAD] ${inter400.className} text-[12.8px] py-2`}
                  >
                    5mb or less in PDF, PNG, or JPG formats
                  </p>
                </div>
                <div className=" w-full md:w-1/2">
                  <label
                    className={`block my-2 text-base ${inter500.className} text-client_color`}
                  >
                    Document Type
                  </label>
                  <select
                    className={`p-2 w-full border border-stroke text-sm text-[#000000] h-11 ${inter500.className} tracking-wide rounded-md`}
                    name="documentType"
                    onChange={handleChange}
                    value={formData.documentType}
                  >
                    <option value="">Select Document Type</option>
                    <option value="1">International Passport</option>
                    <option value="2">National ID Card</option>
                    <option value="3">Driver Licence</option>
                  </select>
                  {errors.documentType && (
                    <p className="text-danger text-[12.8px] py-2">
                      {errors.documentType}
                    </p>
                  )}
                </div>
              </div>
              <Tooltip title='Upload' placement="right" arrow componentsProps={tooltipClass}>
              <button
                type="submit"
                className={`my-5 sm:my-0 p-2 px-5 w-full lg:w-auto text-lg bg-sidbarseleclistcolor text-[#434343] ${inter600.className} rounded transition-colors duration-200 ease-in-out hover:bg-blue_600 hover:text-white`}
              >
                Upload
              </button>
              </Tooltip>
            </form>
            {isSuccessModalOpen && <SuccessModal message={successMessage} />}
          </div>
        </div>
      </ThemeProvider>
    </ErrorBoundary>

  );
};

export default IdentityVerification;
