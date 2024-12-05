"use client";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import { FiDownload } from "react-icons/fi"; // Import the download icon from react-icons
import {
  clientUpdateJobMilestone,
  deleteUploadFile,
  jobApply,
  postNotification,
} from "../../../../api/api";
import { Inter } from "next/font/google";
import { Mulish } from "next/font/google";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  faStar as faStarOutline,
  faStarHalfAlt,
} from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarsolid } from "@fortawesome/free-solid-svg-icons";
import Error from "../../../../error";
import ErrorBoundary from "../../../../ErrorBoundry";

const inter = Inter({ subsets: ["latin"], weight: "400" });
const basic = Inter({ subsets: ["latin"] });
const inter500 = Inter({ subsets: ["latin"], weight: "500" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });
const mulish500 = Mulish({ subsets: ["latin"], weight: "500" });
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
const mulish800 = Mulish({ subsets: ["latin"], weight: "800" });

function Jobmodal(props) {
  let {
    isOpen,
    onClose,
    jobid,
    jobData,
    isReview,
    handleModalSubmit,
    selectedRevuewApplicationData,
    mileStoneData,
    starReview,
  } = props;
  const [milestones, setMilestones] = useState([{ id: 1 }]);
  const [milestoneType, setMilestoneType] = useState(
    selectedRevuewApplicationData.milestone_type === 1 ? "multiple" : "single"
  );
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [pitch, setPitch] = useState("");
  const [errors, setErrors] = useState({});
  const [selpay, setSelpay] = useState(1);
  const [maxDate, setMaxDate] = useState(new Date());
  const [bidAmountValidate, setBidAmountValidate] = useState(false);
  const [bidAmountVal, setBidAmountVal] = useState([]);

  const [mileStoneDataWithFile, setMileStoneDataWithFile] = useState(null);
  const [mileStoneDataWithMilestone, setMileStoneDataWithMilestone] =
    useState(null);

  useEffect(() => {
    if (mileStoneData && selectedRevuewApplicationData) {
      localStorage.setItem(
        "job-Pitch",
        selectedRevuewApplicationData.contract_desc
      );
      setMileStoneDataWithFile(mileStoneData.file);
      setMileStoneDataWithMilestone(
        mileStoneData.milstone.filter(
          (milestone) =>
            milestone.professional_id ===
            selectedRevuewApplicationData.professional_id
        )
      );
    }
  }, [mileStoneData, selectedRevuewApplicationData]);
  useEffect(() => {
    setMaxDate(new Date());
  }, []);
  const ratings = Array.from({ length: 5 }, (_, index) => index + 1);

  const addMoreDiv = () => {
    const isCurrentDivInvalid = milestones.some((milestone) => {
      return !milestone.bidAmount;
    });

    if (isCurrentDivInvalid) {
      setBidAmountValidate(true);
      return;
    }
    setBidAmountValidate(false);

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
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const getFileName = (value) => {
    const filePath = value;
    const parts = filePath.split("/");
    const filename = parts[parts.length - 1];
    const filenameWithExtension = filename;
    const filenameWithoutExtension = filenameWithExtension.replace(
      /_\d+\./,
      "."
    );
    return filenameWithoutExtension;
  };
  const handleDownload = async (filename) => {
    const fileUrl = `${url}/public/uploads/job_attachment/${filename}`;

    // Fetch the image as a blob
    const response = await fetch(fileUrl);
    const blob = await response.blob();

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = await getFileName(filename);

    // Append the link to the document body and trigger a click event
    document.body.appendChild(link);
    link.click();

    // Cleanup: remove the link from the document body and revoke the object URL
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
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
    } else if (radioId === "flexRadioDefaultSingle") {
      setSelpay(2);
      setMilestoneType("single");
      setMilestones([milestones[0]]);
    }
  };

  const handleInputChange = async (index, fieldName, value) => {
    setBidAmountValidate(false);
    const updatedMilestones = [...mileStoneDataWithMilestone];
    if (
      fieldName === "milestone_start_date" ||
      fieldName === "milestone_end_date"
    ) {
      const dateValue = value instanceof Date ? value : new Date(value);
      const isoString = dateValue.toISOString();

      updatedMilestones[index][fieldName] = dateValue;
      setMileStoneDataWithMilestone(updatedMilestones);
    } else {
      updatedMilestones[index][fieldName] = value;
      setMileStoneDataWithMilestone(updatedMilestones);
    }

    if (updatedMilestones) {
      try {
        const response = await clientUpdateJobMilestone(updatedMilestones);
      } catch (error) {}
    }
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
    if (!selectedFiles) {
      return false;
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
    const newErrors = {};

    milestones.forEach((milestone, index) => {
      if (!milestone.task && selpay == 1) {
        newErrors[`task${index}`] = "Please enter deliverable";
      }
      if (!milestone.hours) {
        newErrors[`hours${index}`] = "Please enter milestone hours";
      }
      if (!milestone.bidAmount) {
        newErrors[`bidAmount${index}`] = "Please enter Bid Amount";
      }
      if (!milestone.startDate) {
        newErrors[`startDate${index}`] = "Please enter Expected Start Date";
      }
      if (!milestone.endDate) {
        newErrors[`endDate${index}`] = "Please enter Expected Due Date";
      }
    });

    if (!pitch) {
      newErrors.pitch = "Please enter your pitch for this job";
    }

    // Validate files
    if (!validateFiles()) {
      newErrors.files = "Valid file docx|doc|pdf";
    }

    // Add additional validations if needed

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    } else {
    }

    let typebtn = "";

    if (submitType === "Post Your Job Now") {
      typebtn = "1";
    }

    // Your form submission logic here

    const formData = new FormData();
    formData.append("file", selectedFiles[0]);
    formData.append("milestones", JSON.stringify(milestones));
    formData.append("pitch", pitch);
    formData.append("jobid", jobid);
    formData.append("typebtn", typebtn);
    formData.append("selpay", selpay);
    if (submitType === "Post Your Job Now") {
      formData.append("type", "active");
    } else if (submitType === "Save As Draft") {
      formData.append("type", "draft");
    }

    const dataForNofitication = {
      rout: "/",
      send_by: "Professional",
      subject: "job-Apply",
      client_id: jobData.user_id,
      job_id: jobData._id,
    };
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
  // Calculate Praiki Fees (10% of the total bid amount or jobData values)
  const praikiFees = (totalBidAmount * 0.1).toFixed(1);

  // Calculate Your Net Earnings
  const netEarnings = totalBidAmount + parseFloat(praikiFees);

  const getTotalProjectCost = (name) => {
    let totalCost = 0;
    mileStoneDataWithMilestone?.forEach((milestone) => {
      if (
        selectedRevuewApplicationData.professional_id ===
        milestone.professional_id
      ) {
        totalCost += parseFloat(milestone.milestone_price);
      }
    });

    if (name === "cost") {
      return totalCost;
    } else if (name === "pCost") {
      return totalCost / 10;
    } else if (name === "tEarn") {
      return totalCost - totalCost / 10;
    }
  };

  const handleRemoveDocumentClick = async (id) => {
    try {
      const response = await deleteUploadFile({ file_id: id });
      if (response?.status === 200 || response?.status === 201) {
        setMileStoneDataWithFile(
          mileStoneDataWithFile.filter((milestone) => milestone.id !== id)
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderStars = (starReview) => {
    const stars = [];
    const fullStars = Math.floor(starReview);
    const hasHalfStar = starReview - fullStars > 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <FontAwesomeIcon
            icon={faStarsolid}
            key={i}
            style={{ color: "#7E8082" }}
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <FontAwesomeIcon
            icon={faStarHalfAlt}
            key={i}
            style={{ color: "#7E8082" }}
          />
        );
      } else {
        stars.push(
          <FontAwesomeIcon
            icon={faStarOutline}
            key={i}
            style={{ color: "#7E8082" }}
          />
        );
      }
    }

    return stars;
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
                    <span
                      className={`${mulish700.className} text-[14px] text-[#000]`}
                    >
                      Required skills:{" "}
                      {jobData.skills?.map((value, index) => {
                        if (value) {
                          return (
                            <span
                              id=""
                              className={`${inter500.className} text-[11px] text-[#434343] mr-[8px]`} // Adjust the margin-right as needed
                              key={index}
                            >
                              {index !== 0 && " | "} {value}
                            </span>
                          );
                        }
                        return null;
                      })}
                    </span>
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

                      {renderStars(starReview)}
                    </div>
                    <div style={{ display: "flex" }}>
                      <img
                        src="/images/findjob-img/clock.svg"
                        alt="usericon"
                        className="mr-[10px]"
                      />
                      <p
                        className={`${mulish400.className} text-[#434343] text-[14px] mt-[3px]`}
                      >
                        Posted {formatTimeAgo(jobData.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={`contact  ${mulish600.className} text-[25px] mb-[13px]`}
                >
                  Contract Proposal
                </div>
                <div
                  className={`payment  ${inter500.className} text-[16px] mb-[8px] text-[#2D3748]`}
                >
                  Project Terms
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
                        Multiple Milestone
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
                        Single Milestone
                      </label>
                    </div>
                  </div>
                </div>

                <form>
                  {mileStoneDataWithMilestone !== null &&
                    mileStoneDataWithMilestone?.map((milestone, index) => {
                      return (
                        <div className="row Add_more_form" key={milestone.id}>
                          <div className="inputs-respo flex gap-3">
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
                                      : "Enter a deliverable"
                                  }
                                  readOnly={
                                    milestoneType === "single" ||
                                    isReview === true
                                  }
                                  style={{
                                    backgroundColor:
                                      milestoneType === "single"
                                        ? "#e9ecef"
                                        : "",
                                    cursor:
                                      milestoneType === "single"
                                        ? "not-allowed!important"
                                        : "auto",
                                  }}
                                  value={milestone.milestone_task}
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
                                  value={milestone.milestone_hours}
                                  id={`validationHours${index}`}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "milestone_hours",
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
                                    value={milestone.milestone_price}
                                    onChange={(e) =>
                                      handleInputChange(
                                        index,
                                        "milestone_price",
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
                                  selected={
                                    new Date(milestone.milestone_start_date)
                                  }
                                  onChange={(date) =>
                                    handleInputChange(
                                      index,
                                      "milestone_start_date",
                                      date
                                    )
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
                                  selected={
                                    new Date(milestone.milestone_end_date)
                                  }
                                  onChange={(date) =>
                                    handleInputChange(
                                      index,
                                      "milestone_end_date",
                                      date
                                    )
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
                      );
                    })}
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
                      <label
                        htmlFor="validationTooltip01"
                        className="inline-block mb-[8px]"
                      >
                        Write a Pitch<span className="error">*</span>
                      </label>
                    )}
                    {selectedRevuewApplicationData && (
                      <textarea
                        className="form-control mtask1"
                        id="cletter"
                        name="cletter"
                        placeholder="Please enter your pitch for this job"
                        value={selectedRevuewApplicationData.contract_desc}
                        onChange={handleChangePitch}
                        disabled={isReview}
                      ></textarea>
                    )}
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
                      {isReview ? "Download Attachments" : "Add Attachments"}
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
                      Note: Upload upto 1 Mb files (Allowed files only docx,doc
                      or pdf)
                    </small>
                    <br />
                    {isReview &&
                      mileStoneDataWithFile !== null &&
                      mileStoneDataWithFile.map((milestone, index) => {
                        const url = process.env.NEXT_PUBLIC_BACKEND_URL;
                        if (
                          selectedRevuewApplicationData.professional_id ===
                          milestone.user_id
                        ) {
                          return (
                            <div key={index}>
                              <ul
                                className="inline-block mb-[8px] list-disc ms-4 text-[#adadad]"
                                style={{ listStyleType: "disc" }}
                              >
                                <li>
                                  <button
                                    onClick={() =>
                                      handleDownload(milestone.fileName)
                                    }
                                    className=" overflow-x-auto flex border mt-2 py-[6px] px-[12px] border-[#eee] rounded-md bg-white border-solid border-1 font-inter font-semibold text-base text-[#2D3748]"
                                  >
                                    <span className="text-[12px] md:text-[16px] w-full ">
                                      {getFileName(milestone.fileName)}
                                    </span>
                                    <div className="mt-1">
                                      <FiDownload /> {/* Download icon */}
                                    </div>
                                  </button>
                                  {/* {milestone.fileName}
                                  <FontAwesomeIcon
                                    onClick={() =>
                                      handleRemoveDocumentClick(milestone.id)
                                    }
                                    icon={faTimes}
                                    style={{ color: "#adadad" }}
                                  /> */}
                                </li>
                              </ul>
                            </div>
                          );
                        }
                      })}
                    <br />
                    <small
                      className={`text-[12.8px] text-[#adadad] ${inter.className}`}
                    >
                      {isReview
                        ? "Note: Changes to this proposal is subject to agreement by the applicant. Do not worry, only payment makes contract binding."
                        : "*Project Terms are negotiable.You will be notified of changes to your Terms."}
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
                      N{getTotalProjectCost("cost")}
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
                      {getTotalProjectCost("pCost")}
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
                      {getTotalProjectCost("tEarn")}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex align-items-end gap-2  border-t border-solid border-[#e9ecef] p-5">
                {isReview ? (
                  <button
                    className="cursor-pointer bg-[#E9F1FF] font-inter font-semibold text-[14px] leading-[28px] text-[#434343] inline-block text-center border border-transparent py-[10px] px-[12px] rounded-[10px] transition-colors ease-in-out duration-150 hover:bg-[#1068AD] hover:text-[#ffffff]"
                    onClick={handleModalSubmit}
                  >
                    Submit Review
                  </button>
                ) : (
                  <button
                    className="cursor-pointer bg-[#E9F1FF] font-inter font-semibold text-[14px] leading-[28px] text-[#434343] inline-block text-center border border-transparent py-[10px] px-[12px] rounded-[10px] transition-colors ease-in-out duration-150 hover:bg-[#1068AD] hover:text-[#ffffff]"
                    onClick={() => handleSubmit("Post Your Job Now")}
                  >
                    Submit Application
                  </button>
                )}
                {!isReview && (
                  <button
                    className="bg-[#286cac] font-inter font-medium text-[14px] leading-[28px] text-white border border-[#286cac] py-[10px] px-[12px] rounded-[10px] transition-colors ease-in-out hover:bg-transparent hover:text-[#286cac] hover:border-[#286cac]"
                    onClick={() => handleSubmit("Save As Draft")}
                  >
                    Save Draft
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    </ErrorBoundary>
  );
}
Jobmodal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  jobid: PropTypes.string,
  jobData: PropTypes.any,
  isReview: PropTypes.bool,
  handleModalSubmit: PropTypes.func,
};

export default Jobmodal;
