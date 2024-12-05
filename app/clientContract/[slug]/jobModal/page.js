"use client";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  jobApply,
  postNotification,
  deletMilstoneData,
} from "../../../api/api";
import { Inter } from "next/font/google";
import { Mulish } from "next/font/google";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Error from "../../../error";
import ErrorBoundary from "../../../ErrorBoundry";

const inter = Inter({ subsets: ["latin"], weight: "400" });
const basic = Inter({ subsets: ["latin"] });
const inter500 = Inter({ subsets: ["latin"], weight: "500" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });
const mulish500 = Mulish({ subsets: ["latin"], weight: "500" });
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
const mulish800 = Mulish({ subsets: ["latin"], weight: "800" });

function Jobmodal(props) {
  const {
    mileStoneData,
    allContract,
    isOpen,
    isReview,
    onClose,
    jobData,
    handleModalSubmit,
  } = props;
  const [milestones, setMilestones] = useState([{ id: 1 }]);
  const [milestoneType, setMilestoneType] = useState(
    allContract[0]?.bargaining_option
  );
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [pitch, setPitch] = useState("");
  const [errors, setErrors] = useState({});
  const [selpay, setSelpay] = useState(1);
  const [maxDate, setMaxDate] = useState(new Date());
  const [bidAmountValidate, setBidAmountValidate] = useState(false);
  const [bidAmountVal, setBidAmountVal] = useState([]);
  const [deletpopup, setDeletepopup] = useState(false);
  const [deletmilstoneid, setDeletemilstonId] = useState();
  const [mileStoneDataWithFile, setMileStoneDataWithFile] = useState(null);
  const [mileStoneDataWithMilestone, setMileStoneDataWithMilestone] =
    useState(null);
  const currentDate = new Date();
  const futureDate = new Date();
  futureDate.setFullYear(currentDate.getFullYear() + 1); // Set to one year from current date

  const [jobPitch, setJobPitch] = useState(null);

  useEffect(() => {
    if (mileStoneData && allContract) {
      setMileStoneDataWithFile(mileStoneData.file);
      const data = mileStoneData.milstone.filter(
        (milestone) =>
          milestone.professional_id === allContract[0].professional_id
      );
      setMileStoneDataWithMilestone(data);
    }
  }, [mileStoneData, allContract]);

  useEffect(() => {
    setMaxDate(new Date());
    const jobPitch = localStorage.getItem("job-Pitch");
    setJobPitch(jobPitch);
  }, []);
  const ratings = Array.from({ length: 5 }, (_, index) => index + 1);

  const addMoreDiv = () => {
    // Validate fields in the current div
    const isCurrentDivInvalid = mileStoneDataWithMilestone.some((milestone) => {
      return (
        !milestone.milestone_task ||
        !milestone.milestone_hours ||
        !milestone.milestone_price ||
        !milestone.milestone_start_date ||
        !milestone.milestone_end_date
      );
    });
    // Proceed with adding more divs
    if (milestoneType !== "single") {
      const newMilestone = {
        _id: mileStoneDataWithMilestone.length + 1,
        milestone_task: "",
        milestone_hours: "",
        milestone_price: "",
        milestone_start_date: new Date(),
        milestone_end_date: new Date(),
      };
      setMileStoneDataWithMilestone([
        ...mileStoneDataWithMilestone,
        newMilestone,
      ]);
    }
  };
  const handledeletepopup = (value) => {
    setDeletepopup(!deletpopup);
    setDeletemilstonId(value);
  };

  const deleteDiv = async () => {
    setDeletepopup(!deletpopup);
    const value = deletmilstoneid;
    if (typeof value == "string") {
      const data = {
        milstone_id: value,
      };
      await deletMilstoneData(data).then((res) => {});
    }
    const updatedMilestones2 = mileStoneDataWithMilestone.filter(
      (item) => item._id !== value
    );
    setMileStoneDataWithMilestone(updatedMilestones2);
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

      updatedMilestones[index][fieldName] = dateValue;
      setMileStoneDataWithMilestone(updatedMilestones);

      if (fieldName === "milestone_start_date") {
        // Find the index of the milestone_end_date DatePicker
        const endDatePickerIndex = index;

        // Get the next day of the selected milestone_start_date
        const nextDay = new Date(dateValue);
        nextDay.setDate(nextDay.getDate() + 1);

        // Update the minDate for the milestone_end_date DatePicker
        const updatedDatePickerMilestones = [...mileStoneDataWithMilestone];
        updatedDatePickerMilestones[endDatePickerIndex]["milestone_end_date"] =
          nextDay;

        // Set the updated milestones data
        setMileStoneDataWithMilestone(updatedDatePickerMilestones);
      }
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

  const handleSubmit = async () => {
    const newErrors = {};

    mileStoneDataWithMilestone.forEach((milestone, index) => {
      if (!milestone.milestone_task && selpay == 1) {
        newErrors[`milestone_task${index}`] = "Please enter deliverable";
      }
      if (!milestone.milestone_hours) {
        newErrors[`milestone_hours${index}`] = "Please enter milestone hours";
      }
      if (!milestone.milestone_price) {
        newErrors[`milestone_price${index}`] = "Please enter Bid Amount";
      }
      if (!milestone.milestone_start_date) {
        newErrors[`milestone_start_date${index}`] =
          "Please enter Expected Start Date";
      }
      if (!milestone.milestone_end_date) {
        newErrors[`milestone_end_date${index}`] =
          "Please enter Expected Due Date";
      }
    });

    // Add additional validations if needed

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    } else {
      handleModalSubmit(mileStoneDataWithMilestone);
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
  // Calculate Praiki Fees (10% of the total bid amount or jobData values)
  const praikiFees = (totalBidAmount * 0.1).toFixed(1);

  // Calculate Your Net Earnings
  const netEarnings = totalBidAmount + parseFloat(praikiFees);

  const getTotalProjectCost = (name) => {
    let totalCost = 0;
    let MirrarArrya = mileStoneData.milstone;
    MirrarArrya.forEach((milestone) => {
      if (allContract[0].professional_id === milestone.professional_id) {
        totalCost += parseFloat(milestone.milestone_price);
      }
    });
    if (name === "cost") {
      return totalCost.toFixed(2); // Assuming you want to show two decimal places
    }
    if (name === "pCost") {
      let value = totalCost / 10;
      return value.toFixed(2);
    }
    if (name === "tEarn") {
      let value = totalCost - totalCost / 10;
      return value.toFixed(2);
    }
  };

  return (
    <ErrorBoundary fallback={<Error />}>
      <>
        <div
          className={`modal bg-[#0000006e] ${
            deletpopup ? "bg-[#000000BF]" : "bg-[#00000074]"
          } ${
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
                          <span
                            id=""
                            className={`${inter500.className} text-[11px] text-[#434343]`}
                            key={index}
                          >
                            {value}
                          </span>
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
                      {ratings.map((rating) => (
                        <img
                          key={rating}
                          src="/images/findjob-img/rating.svg"
                          alt={`Rating ${rating}`}
                        />
                      ))}
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
                        disabled={milestoneType != "multiple"}
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
                        disabled={milestoneType != "single"}
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
                                  readOnly={milestoneType === "single"}
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
                                      "milestone_task",
                                      e.target.value
                                    )
                                  }
                                />
                                {errors[`milestone_task${index}`] && (
                                  <div className="proposal_error-message">
                                    {errors[`milestone_task${index}`]}
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
                                {errors[`milestone_hours${index}`] && (
                                  <div className="proposal_error-message">
                                    {errors[`milestone_hours${index}`]}
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
                                {errors[`milestone_price${index}`] && (
                                  <div className="proposal_error-message">
                                    {errors[`milestone_price${index}`]}
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
                                    milestone.milestone_start_date !== null &&
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
                                  minDate={new Date()}
                                  maxDate={
                                    milestone.milestone_end_date &&
                                    milestone.milestone_end_date
                                  }
                                  isClearable
                                />
                                {errors[`milestone_start_date${index}`] && (
                                  <div className="proposal_error-message">
                                    {errors[`milestone_start_date${index}`]}
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
                                    milestone.milestone_end_date !== null &&
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
                                  minDate={
                                    milestone.milestone_start_date
                                      ? new Date(milestone.milestone_start_date)
                                      : new Date()
                                  }
                                />

                                {errors[`milestone_end_date${index}`] && (
                                  <div className="proposal_error-message">
                                    {errors[`milestone_end_date${index}`]}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-3 mb-[14px]">
                            <input
                              type="button"
                              className={`add-milestone responsiveness-in ${
                                milestoneType === "single"
                                  ? "disabled single"
                                  : ""
                              }`}
                              value="Add More"
                              onClick={addMoreDiv}
                              disabled={true}
                            />
                            {index >= 1 && (
                              <input
                                type="button"
                                className="btn btn-danger text-white delete_milestone"
                                value="Delete"
                                onClick={() => handledeletepopup(milestone._id)}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
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
                    <textarea
                      className="form-control mtask1"
                      id="cletter"
                      name="cletter"
                      placeholder="Please enter your pitch for this job"
                      value={jobPitch}
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
                    <br />
                    {isReview &&
                      mileStoneData !== null &&
                      allContract &&
                      mileStoneData.file.map((milestone) => {
                        const url = process.env.NEXT_PUBLIC_BACKEND_URL;
                        if (
                          milestone.user_id === allContract[0].professional_id
                        ) {
                          return (
                            <div key={milestone.id}>
                              <ul
                                className="inline-block mb-[8px] list-disc ms-4 text-[#adadad]"
                                style={{ listStyleType: "disc" }}
                              >
                                <li>
                                  <a
                                    href={milestone.filepath} // URL to the file
                                    download={milestone.fileName} // Suggests the filename for downloading
                                    className="flex items-center gap-3 text-[#2D3748]"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {milestone.fileName}
                                  </a>
                                </li>
                              </ul>
                            </div>
                          );
                        }
                      })}
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
                    onClick={() => handleSubmit()}
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
          {deletpopup ? (
            <div class="fixed top-0 z-999999 w-255 max-w-[40%]">
              <div className="flex justify-end relative z-2">
                <button
                  onClick={() => {
                    setDeletepopup(!deletpopup);
                  }}
                  class="bg-[#1066a9] p-0 w-10 h-10 rounded-full mt-0 cursor-pointer flex justify-center items-center text-2xl font-[900] leading-none text-white"
                >
                  ×
                </button>
              </div>
              <div className="bg-white absolute w-[97.3%] top-[55%] z-1 rounded-[25px] border border-[#c7c7c7]">
                <div class="p-4 flex-1 relative border-b border-[#e9ecef] ">
                  <p class="text-black font-semibold tracking-normal">
                    Do you really want to delete record?
                  </p>
                </div>
                <div className="flex justify-end align-items-center p-4 border-t border-[#e9ecef] gap-2">
                  <button
                    onClick={() => {
                      setDeletepopup(!deletpopup);
                    }}
                    class="bg-[#F0F0F0] inline-block font-[400] text-center whitespace-nowrap align-middle select-none border border-transparent px-3 py-2 text-4 leading-normal rounded transition duration-150 ease-in-out"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      deleteDiv();
                    }}
                    class="text-white bg-[#007bff] inline-block font-[400] text-center whitespace-nowrap align-middle select-none border border-transparent px-3 py-2 text-4 leading-normal rounded transition duration-150 ease-in-out"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
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
