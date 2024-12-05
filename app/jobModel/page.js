"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { generateText, jobApply, postNotification } from "../api/api";
import { Inter } from "next/font/google";
import { Mulish } from "next/font/google";
import Link from "next/link";
import {
  faStar as faStarOutline,
  faStarHalfAlt,
} from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarsolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import io from "socket.io-client";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import Error from "../error";
import ErrorBoundary from "../ErrorBoundry";
import PromptModal from "../aigeneratermodel/page.js";
import { useSocket } from "../socketContext";

const inter = Inter({ subsets: ["latin"], weight: "400" });
const basic = Inter({ subsets: ["latin"] });
const inter500 = Inter({ subsets: ["latin"], weight: "500" });
const inter400 = Inter({ subsets: ["latin"], weight: "400" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });
const mulish500 = Mulish({ subsets: ["latin"], weight: "500" });
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
const mulish800 = Mulish({ subsets: ["latin"], weight: "800" });
const inter600 = Inter({ subsets: ["latin"], weight: "600" });

function Jobmodal(props) {
  let {
    isOpen,
    onClose,
    jobid,
    jobData,
    reviewData,
    isReview,
    handleModalSubmit,
    selectedRevuewApplicationData,
    myApplicationDetails,
    handleappliedSuccessfully,
    onOpenLoader,
  } = props;
  const router = useRouter();
  const [milestones, setMilestones] = useState([{ id: 1 }]);
  const [milestoneType, setMilestoneType] = useState("multiple");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [pitch, setPitch] = useState("");
  const [errors, setErrors] = useState({});
  const [selpay, setSelpay] = useState(1);
  const [maxDate, setMaxDate] = useState(new Date());
  const [bidAmountValidate, setBidAmountValidate] = useState(false);
  const [bidAmountVal, setBidAmountVal] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promptModelOpen, setPromptModelOpen] = useState(false);
  // const [activeCommentIndex, setActiveCommentIndex] = useState(null);
  const [promptKey, setPromptKey] = useState(null);
  const [promptVal, setPromptVal] = useState('');
  const [promptError, setPromptError] = useState('');
  const [generating, setGenerating] = useState(false);
  const [placeholderText, setPlaceholderText] = useState('');
  const {socket} = useSocket();
  useEffect(() => {
    // Set maxDate to today's date
    setMaxDate(new Date());
  }, []);
  const ratings = Array.from({ length: 5 }, (_, index) => index + 1);

  const addMoreDiv = () => {
    // Validate fields in the current div
    const isCurrentDivInvalid = milestones.some((milestone) => {
      return !milestone.bidAmount;
    });

    if (isCurrentDivInvalid) {
      setBidAmountValidate(true);
      return;
    }
    setBidAmountValidate(false);

    // Proceed with adding more divs
    if (milestoneType !== "single") {
      const newMilestone = {
        id: milestones.length + 1,
        task: "",
        hours: "",
        bidAmount: "",
        startDate: null,
        endDate: null,
      };
      setMilestones([...milestones, newMilestone]);
    }
  };

  const deleteDiv = () => {
    const updatedMilestones = milestones.slice(0, -1);
    setMilestones(updatedMilestones);

    const updatedBidAmounts = updatedMilestones.map(
      (milestone) => milestone.bidAmount
    );
    setBidAmountVal(updatedBidAmounts);
  };

  const handleMilestoneTypeChange = (event) => {
    if (isReview) return;
    const radioId = event.target.id;

    if (radioId === "flexRadioDefaultMultiple") {
      setSelpay(1);
      setMilestoneType("multiple");
      setMilestones([
        {
          id: 1,
          bidAmount: "",
          endDate: null,
          hours: "",
          startDate: "",
          task: "",
        },
      ]);
    } else if (radioId === "flexRadioDefaultSingle") {
      setSelpay(2);
      setMilestoneType("single");
      setMilestones([
        {
          id: 1,
          bidAmount: "",
          endDate: null,
          hours: "",
          startDate: "",
          task: "",
        },
      ]);
    }
  };

  const handleInputChange = (index, fieldName, value) => {
    setBidAmountValidate(false);
    const updatedMilestones = [...milestones];
    updatedMilestones[index][fieldName] = value;
    setMilestones(updatedMilestones);

    const bidAmounts = updatedMilestones.map(
      (milestone) => milestone.bidAmount
    );
    setBidAmountVal(bidAmounts);

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[`${fieldName}${index}`];
      return newErrors;
    });
  };

  const handleChangePitch = (e) => {
    const value = e.target.value;

    // Clear pitch error
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors.pitch;
      return newErrors;
    });

    // Your existing logic for updating the pitch state
    setPitch(value);
  };
  const handleFileChange = (event) => {
    const fileInput = event.target;
    const maxFileSize = 1 * 1024 * 1024; // 1 MB

    if (fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];

      // Check file size
      if (selectedFile.size > maxFileSize) {
        setErrors({ files: "File size exceeds the allowed limit of 1 MB." });
        // Clear the file input
        fileInput.value = "";
        return;
      }

      // Check file type
      const allowedFileTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedFileTypes.includes(selectedFile.type)) {
        setErrors({
          files: "Invalid file type. Only docx, doc, or pdf files are allowed.",
        });
        // Clear the file input
        fileInput.value = "";
        return;
      }

      // Set the selected file and clear any previous errors
      setSelectedFiles([selectedFile]);
      setErrors({});
    }
  };

  const validateFiles = () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      return true; // No files selected, validation passes
    }

    const allowedFileTypes = [
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/pdf",
    ];
    const maxFileSize = 1024 * 1024; // 1 MB

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];

      if (!allowedFileTypes.includes(file.type) || file.size > maxFileSize) {
        return false;
      }
    }

    return true;
  };
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Clean up the effect when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const handleSubmit = async (submitType) => {
    try {
      setIsSubmitting(true); // Set the state to indicate form submission

      const newErrors = {};

      milestones.forEach((milestone, index) => {
        if (!milestone.task && selpay == 1) {
          newErrors[`task${index}`] = "Please enter milestone";
        }
        if (!milestone.hours) {
          newErrors[`hours${index}`] = "Please enter milestone hours";
        }
        if (!milestone.bidAmount) {
          newErrors[`bidAmount${index}`] = "Please enter bid amount";
        }
        if (!milestone.startDate) {
          newErrors[`startDate${index}`] = "Please enter expected start date";
        }
        if (!milestone.endDate) {
          newErrors[`endDate${index}`] = "Please enter expected due date";
        }
      });

      if (!pitch) {
        newErrors.pitch = "Please enter your pitch for this job";
      }

      // Validate files
      if (!validateFiles() && selectedFiles.length > 0) {
        newErrors.files = "Valid file docx|doc|pdf";
      }

      // Add additional validations if needed

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsSubmitting(false); // Reset the state after form submission is complete
        return;
      }

      let typebtn = "";

      if (submitType === "Post Your Job Now") {
        typebtn = "1";
      }

      let totalBudget;
      if (milestoneType === "multiple") {
        totalBudget =
          bidAmountVal.length > 0
            ? bidAmountVal.reduce(
              (acc, bidAmount) => acc + parseFloat(bidAmount),
              0
            )
            : 0;
      } else if (milestoneType === "single") {
        totalBudget = parseFloat(milestones[0].bidAmount);
      } else {
        totalBudget =
          jobData.budget_type === "fixed"
            ? parseFloat(jobData.budget_from)
            : parseFloat(jobData.budget_to);
      }

      // Your form submission logic here
      const formData = new FormData();
      if (selectedFiles.length > 0) {
        formData.append("file", selectedFiles[0]);
      }
      formData.append("milestones", JSON.stringify(milestones));
      formData.append("pitch", pitch);
      formData.append("jobid", jobid);
      formData.append("typebtn", typebtn);
      formData.append("selpay", selpay);
      formData.append("totalBudget", totalBudget);
      if (submitType === "Post Your Job Now") {
        formData.append("type", "active");
      } else if (submitType === "Save As Draft") {
        formData.append("type", "draft");
      }
      // const serverUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      // const socket = io(serverUrl);
      
      const retrievedCookie = Cookies.get("authToken");
      const decodedToken = jwt.decode(retrievedCookie);
      const jobID = jobData._id;
      const route = `/projects/${jobID}`;

      const dataForNotification = {
        rout: route,
        send_by: "Professional",
        subject: "job-Apply",
        client_id: jobData.user_id,
        job_id: jobData._id,
        email: jobData.user_id.email,
        first_name: jobData.user_id.first_name,
        last_name: jobData.user_id.last_name,
      };

      const notification_message = `${decodedToken.first_name} ${decodedToken.last_name} has applied for "${jobData.job_title}"`;

      await jobApply(formData).then(async (res) => {
        if (submitType === "Save As Draft") {
          onOpenLoader();
          onClose();
          window.location.href = "/application?draft=true";
        } else if (submitType === "Post Your Job Now") {
          socket.emit("jobapply");

          const data = {
            message: notification_message,
            professional_id: jobData.user_id._id,
            rout: route,
            status: 0,
          };

          socket.emit("new_notification", data);
          socket.emit("update_notification", { login_as: 2, id: jobData.user_id._id });
          await postNotification(dataForNotification).then((res) => {
            if (res?.status == 200) {
              onOpenLoader();
              onClose();
              window.location.href = "/application?applied=true";
            }
          });
        }
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false); // Reset the state if an error occurs during submission
    }
  };

  if (!isOpen) {
    return null;
  }
  const formatTimeAgo = (createdAt) => {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);

    const timeDifference = currentDate - createdDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference === 0) {
      const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutesDifference = Math.floor((timeDifference / (1000 * 60)) % 60);

      if (hoursDifference === 0) {
        if (minutesDifference === 0) {
          const secondsDifference = Math.floor(timeDifference / 1000);
          return `${secondsDifference}s ago`;
        } else {
          return `${minutesDifference}m ago`;
        }
      } else {
        return `${hoursDifference}h ago`;
      }
    } else {
      return `${daysDifference}d ago`;
    }
  };
  let totalBidAmount;
  if (milestoneType === "multiple") {
    totalBidAmount =
      bidAmountVal.length > 0
        ? bidAmountVal.reduce(
          (acc, bidAmount) => acc + parseFloat(bidAmount),
          0
        )
        : 0;
  } else if (milestoneType === "single") {
    totalBidAmount = parseFloat(milestones[0].bidAmount);
  } else {
    totalBidAmount =
      jobData.budget_type === "fixed"
        ? parseFloat(jobData.budget_from)
        : parseFloat(jobData.budget_to);
  }
  const praikiFees = (totalBidAmount * 0.1).toFixed(1);

  const netEarnings = totalBidAmount - parseFloat(praikiFees);

  const renderStars = () => {
    const stars = [];
    let review = jobData.review;

    if (typeof review === "undefined" && reviewData) {
      review = reviewData.averageRating;
    }

    if (typeof review !== "undefined") {
      const fullStars = Math.floor(review);
      const hasHalfStar = review - fullStars > 0;

      for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
          stars.push(
            <FontAwesomeIcon
              icon={faStarsolid}
              key={i}
              style={{ color: "#323232" }}
            />
          );
        } else if (i === fullStars && hasHalfStar) {
          stars.push(
            <FontAwesomeIcon
              icon={faStarHalfAlt}
              key={i}
              style={{ color: "#323232" }}
            />
          );
        } else {
          stars.push(
            <FontAwesomeIcon
              icon={faStarOutline}
              key={i}
              style={{ color: "#323232" }}
            />
          );
        }
      }
    } else {
      // Render empty stars if review data is not available
      for (let i = 0; i < 5; i++) {
        stars.push(
          <FontAwesomeIcon
            icon={faStarOutline}
            key={i}
            style={{ color: "#323232" }}
          />
        );
      }
    }

    return stars;
  };
  const cleanResponse = (responseText) => {
    // Remove any markdown-like headers (e.g., ## or **)
    let cleanedText = responseText.replace(/##|[*]/g, '');

    // Remove any extraneous spaces
    cleanedText = cleanedText.trim();

    // If the response starts with a colon, remove it
    cleanedText = cleanedText.replace(/^:\s*/, '');

    return cleanedText;
  };
  const handleAiTextGeneration = async () => {
    if (!promptVal.trim()) {
      setPromptError('Please enter a prompt');
      return;
    }
    setPromptError('');

    try {
      setGenerating(true);
      const data = promptVal;

      const response = await generateText({ data });
      if (response?.data.success) {
        setGenerating(false);
        const result = response?.data;
        if (result.text) {
          const cleanedText = cleanResponse(result.text);
          if (promptKey !== null) {
            if (promptKey == 'title') {
              setPitch(cleanedText)
            }
          }
        }
        setPromptKey(null);
        setPromptVal('');
        setPromptError('');
        setPromptModelOpen(false);
      } else {
        setGenerating(false);
        setPromptVal('');
        setPromptError(response?.data.error);
      }
    } catch (error) {
      setGenerating(false);
      console.error('Error generating AI text:', error);
      setPromptError('Error generating AI text. Please try again later!');
    }
  };
  const closePromptModal = () => {
    setPromptModelOpen(false);
    setPromptKey(null);
    setPromptVal('');
    setPromptError('');
  };
  return (
    <ErrorBoundary fallback={<Error />}>
      <>
        <div
          className={`modal bg-[#0000006e] ${
            isOpen ? "show" : ""
            } fixed left-0 bottom-0 w-full h-full z-999999 overflow-y-scroll flex justify-center items-center scrollbar-custom`}
          tabIndex="-1"
          role="dialog"
        >
          <div
            className="modal-dialog modal-dialog-centered absolute custom-modal-width top-6 bg-white m-3 md:w-180"
            style={{ borderRadius: "20px" }}
          >
            <div className="modal-content">
              <div className="modal-header border-b border-solid border-[#e9ecef] flex ">
                <h5 className="modal-title w-256">
                  {" "}
                  {isReview ? "Contract" : "Submit an Application"}
                </h5>
                <div
                  onClick={onClose}
                  className="bg-[#F2F2F2] p-0 w-10 h-10 rounded-full mt-0 cursor-pointer flex justify-center items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#404040"
                  >
                    <path
                      d="M12 10.586L16.95 5.63599L18.364 7.04999L13.414 12L18.364 16.95L16.95 18.364L12 13.414L7.04999 18.364L5.63599 16.95L10.586 12L5.63599 7.04999L7.04999 5.63599L12 10.586Z"
                      fill="#2D3748"
                    />
                  </svg>
                </div>
              </div>
              <div className="modal-body">
                <div className="top-box mb-[28px]">
                  <div className="header2">
                    <div
                      className={`job  ${mulish600.className} text-[25px] mb-[-4px]`}
                    >
                      Job Details
                    </div>
                    <Link
                      href={`/findwork/${jobData._id}`}
                      as={`/findwork/${jobData._id}`}
                    >
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          style={{ cursor: "pointer!important" }}
                        >
                          <path
                            d="M21.2512 25H7.50122C6.12051 25 5.00122 23.8807 5.00122 22.5V8.75C5.00122 7.36929 6.12051 6.25 7.50122 6.25H12.5012V8.75H7.50122V22.5H21.2512V17.5H23.7512V22.5C23.7512 23.8807 22.6319 25 21.2512 25ZM14.6262 17.1337L12.8637 15.3663L20.73 7.5H16.2512V5H25.0012V13.75H22.5012V9.26875L14.6262 17.1337Z"
                            fill="#2E3A59"
                          />
                        </svg>
                      </div>
                    </Link>
                  </div>
                  <div
                    className={`pa  ${mulish600.className} text-[21px] mb-[10px]`}
                  >
                    {jobData.job_title}
                  </div>
                  <div
                    className={`obj ${basic.className} text-[15px] text-[#434343] mb-[15px]`}
                  >
                    {jobData.job_description}
                  </div>
                  <div
                    className={`skill ${inter500.className} text-[11px] text-[#000] mb-[18px]`}
                  >
                    {jobData.skills?.map((value, index) => {
                      if (value) {
                        return (
                          <div
                            key={index}
                            className={`skill-contenyt text-[11px] ${inter400.className} text-box_clr`}
                          >
                            {value}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                  <div className="low">
                    {jobData.budget_type == "range" ? (
                      <>
                        <span
                          id="fixed"
                          className={`${mulish700.className} text-[14px] text-[#000]`}
                        >
                          Range
                        </span>
                        <span
                          id="fixed"
                          className={`${mulish700.className} text-[14px] text-[#000]`}
                        >
                          Budget:
                          <span
                            id="amount"
                            className={`${mulish400.className} text-[14px] text-[#000]`}
                          >
                            {" "}
                            N{jobData.budget_from} - N{jobData.budget_to}
                          </span>
                        </span>
                      </>
                    ) : (
                      <>
                        <span
                          id="fixed"
                          className={`${mulish800.className} text-[14px] text-[#000]`}
                        >
                          Fixed Price
                        </span>
                        <span
                          id="fixed"
                          className={`${mulish700.className} text-[14px] text-[#000]`}
                        >
                          Budget:
                          <span
                            id="amount"
                            className={`${mulish400.className} text-[14px] text-[#000]`}
                          >
                            {" "}
                            N{jobData.budget_from}
                          </span>
                        </span>
                      </>
                    )}

                    <div
                      className="mr-[24px]"
                      style={{ display: "flex", height: "fit-content" }}
                    >
                      <img
                        src="/images/findjob-img/userimg.png"
                        alt="usericon"
                        className="pe-2"
                        style={{ height: "fit-content", alignSelf: "center" }}
                      />
                      {renderStars()}
                    </div>
                    <div style={{ display: "flex" }}>
                      <img
                        src="/images/findjob-img/clock.svg"
                        alt="usericon"
                        className="mr-[10px] custom-margin"
                      />

                      <p
                        className={`${mulish400.className} text-[#434343] text-[14px] mt-[3px]`}
                      >
                        Posted {formatTimeAgo(jobData.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    className={`contact  ${mulish600.className} text-[25px] mb-[13px]`}
                  >
                    Contract Proposal
                  </div>
                  <div
                    className={`payment  ${inter500.className} text-[16px] mb-[8px] text-[#2D3748]`}
                  >
                    Payment Terms
                  </div>

                  <div className="pay-div2">
                    <div className="pay-div">
                      <div className="form-check">
                        <input
                          className="form-check-label bg-blue border border-[#e9ecef] text-white cursor-pointer mr-[8px]"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefaultMultiple"
                          checked={milestoneType === "multiple"}
                          onChange={handleMilestoneTypeChange}
                          value="multiple"
                        />
                        <label
                          className={`form-check-label ${inter500.className} text-[14px] mb-[8px] text-[#718096]`}
                          htmlFor="flexRadioDefaultMultiple"
                        >
                          Milestone Payments
                        </label>
                      </div>
                    </div>
                    <div className="pay-div">
                      <div className="form-check">
                        <input
                          className="form-check-label bg-gray border border-[#e9ecef] cursor-pointer mr-[8px]"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefaultSingle"
                          checked={milestoneType === "single"}
                          onChange={handleMilestoneTypeChange}
                          value="single"
                        />
                        <label
                          className={`form-check-label ${inter500.className} text-[14px] mb-[8px] text-[#718096]`}
                          htmlFor="flexRadioDefaultSingle"
                        >
                          Single Project Payment
                        </label>
                      </div>
                    </div>
                  </div>

                  <form>
                    {milestones.map((milestone, index) => (
                      <div className="row Add_more_form" key={milestone.id}>
                        <div className="inputs-respo flex gap-3 custome-width">
                          <div className="responsiveness-in mt-2">
                            <div className="form-group">
                              <label
                                htmlFor={`validationTask${index}`}
                                className={`${inter500.className} text-[16px] mb-[8px] text-[#2D3748]`}
                              >
                                Milestone
                              </label>
                              <input
                                id={`validationTask${index}`}
                                type="text"
                                className={`form-control mtask1 ${
                                  milestoneType === "single" ? "disabled" : ""
                                }`}
                                placeholder={
                                  milestoneType === "single"
                                    ? "Whole Project"
                                    : "Milestone"
                                }
                                readOnly={
                                  milestoneType === "single" ||
                                  isReview === true
                                }
                                style={{
                                  backgroundColor:
                                    milestoneType === "single" ? "#e9ecef" : "",
                                  cursor:
                                    milestoneType === "single"
                                      ? "not-allowed!important"
                                      : "auto",
                                }}
                                value={
                                  milestoneType === "single"
                                    ? "Whole Project"
                                    : milestone.task
                                }
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "task",
                                    e.target.value
                                  )
                                }
                              />
                              {errors[`task${index}`] && (
                                <div className="proposal_error-message">
                                  {errors[`task${index}`]}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="responsiveness-in mt-2">
                            <div className="form-group">
                              <label htmlFor={`validationHours${index}`}>
                                Hours
                              </label>
                              <input
                                type="text"
                                className="form-control mtask1"
                                placeholder="Hours"
                                value={milestone.hours}
                                id={`validationHours${index}`}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "hours",
                                    e.target.value
                                  )
                                }
                                onKeyDown={(e) => {
                                  // Allow only numbers and Backspace/Delete keys
                                  if (
                                    !/[0-9]/.test(e.key) &&
                                    e.key !== "Backspace" &&
                                    e.key !== "Delete"
                                  ) {
                                    e.preventDefault();
                                  }
                                  // Limit maximum length to 3 characters
                                  if (
                                    e.target.value.length >= 3 &&
                                    e.key !== "Backspace" &&
                                    e.key !== "Delete"
                                  ) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                              {errors[`hours${index}`] && (
                                <div className="proposal_error-message">
                                  {errors[`hours${index}`]}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className=" mt-2 w-full md:w-[32%]">
                            <div className="form-group">
                              <label htmlFor={`validationBidAmount${index}`}>
                                Bid Amount
                              </label>
                              <div>
                                <input
                                  type="text"
                                  className="form-control curr1"
                                  aria-describedby="emailHelp"
                                  value="N"
                                  style={{ background: "#e9ecef" }}
                                  readOnly
                                />
                                <input
                                  type="text"
                                  className="form-control mtask1 amt joincurr"
                                  placeholder="Amount"
                                  value={milestone.bidAmount}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "bidAmount",
                                      e.target.value
                                    )
                                  }
                                  onKeyDown={(e) => {
                                    // Allow only numbers and Backspace/Delete keys
                                    if (
                                      !/[0-9]/.test(e.key) &&
                                      e.key !== "Backspace" &&
                                      e.key !== "Delete"
                                    ) {
                                      e.preventDefault();
                                    }
                                    // Limit maximum length to 5 characters
                                    if (
                                      e.target.value.length >= 6 &&
                                      e.key !== "Backspace" &&
                                      e.key !== "Delete"
                                    ) {
                                      e.preventDefault();
                                    }
                                  }}
                                />
                              </div>
                              {errors[`bidAmount${index}`] && (
                                <div className="proposal_error-message">
                                  {errors[`bidAmount${index}`]}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="inputs-respo flex gap-7">
                          <div className="responsiveness-in">
                            <div className="form-group">
                              <label htmlFor={`validationStartDate${index}`}>
                                Expected Start Date
                              </label>
                              <DatePicker
                                selected={milestone.startDate}
                                onChange={(date) =>
                                  handleInputChange(index, "startDate", date)
                                }
                                placeholderText="MM/DD/YYYY"
                                className="form-control mtask1"
                                minDate={new Date()} // Set the minimum date to today
                                maxDate={
                                  milestone.endDate ? milestone.endDate : null
                                }
                                isClearable
                              />
                              {errors[`startDate${index}`] && (
                                <div className="proposal_error-message">
                                  {errors[`startDate${index}`]}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="responsiveness-in">
                            <div className="form-group">
                              <label htmlFor={`validationEndDate${index}`}>
                                Expected Due Date
                              </label>
                              <DatePicker
                                selected={milestone.endDate}
                                onChange={(date) =>
                                  handleInputChange(index, "endDate", date)
                                }
                                placeholderText="MM/DD/YYYY"
                                className="form-control mtask1"
                                isInputReadonly
                                minDate={milestone.startDate || new Date()}
                              />
                              {errors[`endDate${index}`] && (
                                <div className="proposal_error-message">
                                  {errors[`endDate${index}`]}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-3 mb-[14px]">
                      <input
                        type="button"
                        className={`add-milestone responsiveness-in ${
                          milestoneType === "single" ? "disabled single" : ""
                        }`}
                        value="Add More"
                        onClick={addMoreDiv}
                        disabled={milestoneType === "single"}
                      />
                      {milestones.length > 1 && (
                        <input
                          type="button"
                          className="btn btn-danger text-white delete_milestone"
                          value="Delete"
                          onClick={deleteDiv}
                        />
                      )}
                    </div>
                  </form>

                  <div className="col-md-12">
                    <div className="form-group">
                      {isReview ? (
                        <label
                          htmlFor="validationTooltip01"
                          className="inline-block mb-[8px]"
                        >
                          Job Pitch
                        </label>
                      ) : (
                        <div className="flex flex-1 w-full items-center">
                          <label
                            htmlFor="validationTooltip01"
                            className="inline-block mb-[8px] flex-1"
                          >
                            Write a Pitch<span className="error">*</span>
                          </label>
                          <a
                            className="flex gap-2 items-end justify-end"
                            onClick={() => {
                              setPromptKey("title");
                              setPlaceholderText("Ex: Write a pitch");
                              setPromptModelOpen(true);
                            }}
                          >
                            <MyCustomIcon width={20} height={20} />
                            <p
                              className={`text-[13px] text-[#ffb705] ${inter500.className}`}
                            >
                              Write with AI
                            </p>
                          </a>
                        </div>
                      )}
                      <textarea
                        className="form-control mtask1"
                        id="cletter"
                        name="cletter"
                        value={pitch}
                        onChange={handleChangePitch}
                        disabled={isReview}
                      ></textarea>
                      {errors.pitch && (
                        <div className="proposal_error-message">
                          {errors.pitch}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label
                        htmlFor="validationTooltip01"
                        className="inline-block mb-[8px]"
                      >
                        {isReview
                          ? "Download Attachments"
                          : "Include Attachments"}
                      </label>
                      <input
                        type="file"
                        className={`form-control-file mtask1 h-0text-[12.8px] text-[#adadad] ${inter.className}`}
                        id="files"
                        onChange={handleFileChange}
                        disabled={isReview}
                        accept=".docx, .doc, .pdf"
                      />
                      {errors.files && (
                        <div className="proposal_error-message">
                          {errors.files}
                        </div>
                      )}
                      <small
                        className={`text-[12.8px] text-[#adadad] ${inter.className}`}
                      >
                        Note: Upload upto 1 Mb files (Allowed files only
                        docx,doc or pdf)
                      </small>
                      <br />
                      <br />
                      <small
                        className={`text-[12.8px] text-[#adadad] ${inter.className}`}
                      >
                        {isReview
                          ? "Note: Changes to this proposal is subject to agreement by the applicant. Do not worry, only payment makes contract binding."
                          : ""}
                      </small>
                    </div>
                  </div>

                  <div className="pay-summary">
                    <div
                      className={`pay-title text-[16px] text-[#212529] mb-[10px] ${inter500.className}`}
                    >
                      Payment Summary
                    </div>
                    <div className="flex align-items-center justify-between">
                      <div
                        className={`hlo text-[14px] text-[#718096] mb-[8px] ${inter.className}`}
                      >
                        Total Project Cost
                      </div>
                      <div
                        className={`hlo text-[14px] text-[#718096] mb-[8px] ${inter.className}`}
                      >
                        N{totalBidAmount.toFixed(2)}
                      </div>
                    </div>
                    <div className="flex align-items-center justify-between">
                      <div
                        className={`hlo text-[14px] text-[#718096] mb-[8px] ${inter.className}`}
                      >
                        Freelance Fees (10%)
                      </div>
                      <div
                        className={`hlo text-[14px] text-[#718096] mb-[8px] ${inter.className}`}
                      >
                        {praikiFees}
                      </div>
                    </div>
                    <div className="flex align-items-center justify-between">
                      <div
                        className={`hlo text-[14px] text-[#718096] mb-[8px] ${inter.className}`}
                      >
                        Your Net Earnings
                      </div>
                      <div
                        className={`hlo text-[14px] text-[#718096] mb-[8px] ${inter.className}`}
                      >
                        {netEarnings.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex align-items-end gap-2  border-t border-solid border-[#e9ecef] p-5">
                {isReview ? (
                  <button
                    className="cursor-pointer bg-[#E9F1FF] font-inter font-semibold text-[14px] leading-[28px] text-[#434343] inline-block text-center border border-transparent py-[10px] px-[12px] rounded-[10px] transition-colors ease-in-out duration-150 hover:bg-[#1068AD] hover:text-[#ffffff]"
                    onClick={handleModalSubmit}
                    disabled={isSubmitting}
                  >
                    Submit Review
                  </button>
                ) : (
                  <button
                    className="cursor-pointer bg-[#E9F1FF] font-inter font-semibold text-[14px] leading-[28px] text-[#434343] inline-block text-center border border-transparent py-[10px] px-[12px] rounded-[10px] transition-colors ease-in-out duration-150 hover:bg-[#1068AD] hover:text-[#ffffff]"
                    onClick={() => handleSubmit("Post Your Job Now")}
                    disabled={isSubmitting}
                  >
                    Submit Application
                  </button>
                )}
                {!isReview && (
                  <button
                    className="bg-[#286cac] font-inter font-medium text-[14px] leading-[28px] text-white border border-[#286cac] py-[10px] px-[12px] rounded-[10px] transition-colors ease-in-out hover:bg-transparent hover:text-[#286cac] hover:border-[#286cac]"
                    onClick={() => handleSubmit("Save As Draft")}
                    disabled={isSubmitting}
                  >
                    Save Draft
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <PromptModal
          isOpen={promptModelOpen}
          promptVal={promptVal}
          setPromptVal={setPromptVal}
          promptError={promptError}
          handleSubmit={handleAiTextGeneration}
          closePromptModal={closePromptModal}
          generating={generating}
          placeholderText={placeholderText}
        />
      </>
    </ErrorBoundary>
  );
}

const MyCustomIcon = ({width , height}) => (
  <svg width={width} height={height} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M9.90268 7.16895C8.79941 8.00541 7.75547 8.91736 6.77838 9.89826C2.17447 14.5022 -0.156617 19.6322 1.56904 21.3595C3.29469 23.0851 8.42633 20.7524 13.0286 16.1501C14.0096 15.1725 14.9215 14.128 15.7579 13.0242" 
      stroke="#FFB703" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M15.7583 13.0233C18.473 16.6268 19.5787 20.0166 18.2383 21.357C16.511 23.0842 11.381 20.7515 6.77713 16.1493C2.17646 11.5437 -0.154627 6.41533 1.57103 4.68806C2.9114 3.3493 6.3012 4.45495 9.90467 7.16808" 
      stroke="#FFB703" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M9.09375 13.0239C9.09375 13.2386 9.17903 13.4445 9.33082 13.5963C9.48261 13.7481 9.68849 13.8333 9.90316 13.8333C10.1178 13.8333 10.3237 13.7481 10.4755 13.5963C10.6273 13.4445 10.7126 13.2386 10.7126 13.0239C10.7126 12.8093 10.6273 12.6034 10.4755 12.4516C10.3237 12.2998 10.1178 12.2145 9.90316 12.2145C9.68849 12.2145 9.48261 12.2998 9.33082 12.4516C9.17903 12.6034 9.09375 12.8093 9.09375 13.0239ZM13.157 5.97563C12.647 5.88659 12.647 5.15651 13.157 5.06909C14.0578 4.91304 14.8917 4.49193 15.5521 3.85956C16.2124 3.2272 16.6692 2.41231 16.864 1.51904L16.8932 1.3782C17.0033 0.876369 17.7188 0.873132 17.8321 1.37334L17.871 1.53684C18.0741 2.4257 18.5353 3.23477 19.1965 3.86258C19.8577 4.49039 20.6896 4.90898 21.5877 5.06586C22.0993 5.15489 22.0993 5.88983 21.5877 5.97725C20.6896 6.13413 19.8577 6.55272 19.1965 7.18053C18.5353 7.80834 18.0741 8.6174 17.871 9.50626L17.8321 9.66976C17.7188 10.1716 17.0033 10.1684 16.8932 9.66652L16.8608 9.52568C16.6659 8.63241 16.2091 7.81752 15.5488 7.18516C14.8885 6.5528 14.0546 6.13168 13.1537 5.97563H13.157Z" 
      stroke="#FFB703" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);
export default Jobmodal;
