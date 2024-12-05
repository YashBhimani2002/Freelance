"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Inter } from "next/font/google";
import { Mulish } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { updateapplication } from "@/app/api/api";
import Error from "../../error";
import ErrorBoundary from "../../ErrorBoundry";

const inter = Inter({ subsets: ["latin"], weight: "400" });
const basic = Inter({ subsets: ["latin"] });
const inter500 = Inter({ subsets: ["latin"], weight: "500" });
const inter600 = Inter({ subsets: ["latin"], weight: "600" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });
const mulish500 = Mulish({ subsets: ["latin"], weight: "500" });
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
const mulish800 = Mulish({ subsets: ["latin"], weight: "800" });

function ContractModal({ isOpen, onClose, myContract, myApplicationDetails }) {
  const router = useRouter();
  const cancelIcon = (
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
  );

  const rightArrowIcon = (
    <svg
      class="w-3 h-3 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m16.2 19 4.8-7-4.8-7H3l4.8 7L3 19h13.2Z"
      />
    </svg>
  );
  const [milestoneType, setMilestoneType] = useState("multiple");
  const [milestone, setMilestone] = useState("");
  const [hour, setHour] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [jobPitch, setJobPitch] = useState("");
  const [errors, setErrors] = useState({});
  const [totalBudget, setTotalBudget] = useState(null);

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  useEffect(() => {
    let totalBudget = 0;
    setJobPitch(myApplicationDetails?.invjob?.contract_desc);

    myApplicationDetails?.milestone.map((mile) => {
      totalBudget = totalBudget + mile.milestone_price;
    });
    setTotalBudget(totalBudget);
  }, [myApplicationDetails]);

  const handleSubmitContract = async () => {
    const dataTosend = {
      milestones: myApplicationDetails.milestone,
      pitch: jobPitch,
      jobid: myContract.job_id,
    };

    try {
      const response = await updateapplication(dataTosend);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    // Validation for milestone
    if (!milestone.trim()) {
      errors.milestone = "Milestone is required";
    }

    // Validation for hour
    if (!hour.trim()) {
      errors.hour = "Hour is required";
    }

    // Validation for bid amount
    if (!bidAmount.trim()) {
      errors.bidAmount = "Bid amount is required";
    } else if (isNaN(bidAmount) || bidAmount < 0 || bidAmount > 10000000) {
      errors.bidAmount = "Bid amount must be a number between 0 and 10,000,000";
    }

    // Validation for start date
    if (!startDate) {
      errors.startDate = "Start date is required";
    }

    // Validation for end date
    if (!endDate) {
      errors.endDate = "End date is required";
    }

    // Validation for job pitch
    if (!jobPitch.trim()) {
      errors.jobPitch = "Job pitch is required";
    }

    if (Object.keys(errors).length === 0) {
      // Submit the form if there are no errors
      // submission logic here
    } else {
      setErrors(errors);
    }
  };

  const frontUrl = process.env.NEXTAUTH_URL;

  const handleMilestoneTypeChange = (event) => {
    const radioId = event.target.id;

    if (radioId === "flexRadioDefaultMultiple") {
      setMilestoneType("multiple");
    } else if (radioId === "flexRadioDefaultSingle") {
      setMilestoneType("single");
    }
  };

  if (!isOpen) {
    return null;
  }

  const handleJobDetailsClick = () => {
    router.push(`https://praiki.com/projects/${id}`);
  };

  const formatDateForDatePicker = (dateString) => {
    const date = new Date(dateString);

    // Check if the date is valid
    if (!(date instanceof Date && !isNaN(date))) {
      return "Invalid Date";
    }

    // Format the date to MM/DD/YYYY
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "2-digit", // MM
      day: "2-digit", // DD
      year: "numeric", // YYYY
    });
    return formattedDate;
  };

  return (
    <ErrorBoundary fallback={<Error />}>
      <>
        <div
          className={`${
            isOpen ? "show" : ""
            } fixed left-0 bottom-0 w-full h-full z-999999 overflow-y-scroll flex justify-center items-center bg-black bg-opacity-70 p-[10px] md:p-0 scrollbar-custom`}
          tabIndex="-1"
          role="dialog"
        >
          <div className="absolute custom-modal-width top-5 bg-white m-3 md:w-180 rounded-[20px] slideInFromTop">
            <div className="rounded-[25px]">
              {/* *********************form********************** */}
              <form onSubmit={handleSubmit}>
                <div className="p-[16px] border-b border-solid border-[#e9ecef] flex items-center justify-between">
                  <h5
                    className={`${mulish800.className} text-[26px] text-[#000000]`}
                  >
                    Contract
                  </h5>
                  <div
                    onClick={onClose}
                    className="bg-[#F2F2F2] p-0 w-10 h-10 rounded-full mt-0 cursor-pointer flex justify-center items-center"
                  >
                    {cancelIcon}
                  </div>
                </div>
                <div className="p-[16px]">
                  <div className="w-full bg-[#e9f1ffe3] rounded-[27px] h-auto py-[30px] px-[20px] mb-[28px]">
                    <div className="flex justify-between items-center mb-[15px]">
                      <div className={`${mulish600.className} text-[25px]`}>
                        Job Details
                      </div>

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
                    </div>
                    <div
                      className={`${mulish600.className} text-[21px] mb-[10px] text-[#000]`}
                    >
                      {/* Digital Marketing */}
                      myContract[0]?.jobs_data[0]?.job_title
                    </div>
                    <div
                      className={`${mulish500.className} text-[15px] text-[#434343] mb-[15px]`}
                    >
                      {myContract[0]?.jobs_data[0]?.job_description}
                    </div>
                    <div
                      className={`${inter500.className} text-[11px] text-[#000] mb-[18px]`}
                    >
                      SEOEditing
                    </div>

                    <div className="flex items-center justify-start flex-wrap gap-3">
                      <span
                        id=""
                        className={`${mulish700.className} text-[14px] text-[#000]`}
                      >
                        {myContract[0]?.jobs_data[0]?.budget_type} Price
                      </span>
                      <span
                        id=""
                        className={`${mulish700.className} text-[14px] text-[#000]`}
                      >
                        Budget:
                        <span
                          id=""
                          className={`${mulish400.className} text-[14px] text-[#000]`}
                        >
                          {myApplicationDetails.budget[0].budget}
                        </span>
                      </span>

                      <div className="mr-[24px] flex gap-1 h-fit">
                        <Image
                          src="/images/findjob-img/userimg.png"
                          alt="usericon"
                          className=""
                          width={20}
                          height={20}
                          style={{ height: "fit-content", alignSelf: "center" }}
                        />
                        <div className="flex items-center">
                          <Image
                            src="/images/findjob-img/rating.svg"
                            width={20}
                            height={20}
                            alt={`Rating`}
                          />
                          <Image
                            src="/images/findjob-img/rating.svg"
                            width={20}
                            height={20}
                            alt={`Rating`}
                          />
                          <Image
                            src="/images/findjob-img/rating.svg"
                            width={20}
                            height={20}
                            alt={`Rating`}
                          />
                          <Image
                            src="/images/findjob-img/rating.svg"
                            width={20}
                            height={20}
                            alt={`Rating`}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Image
                          src="/images/findjob-img/clock.svg"
                          alt="usericon"
                          width={20}
                          height={20}
                          className=""
                        />
                        <p
                          className={`${mulish400.className} text-[#434343] text-[14px]`}
                        >
                          48d ago
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`text-[#000]  ${mulish600.className} text-[25px] mb-[13px]`}
                  >
                    Contract Proposal
                  </div>
                  <div
                    className={`${inter500.className} text-[16px] mb-[8px] text-[#2D3748]`}
                  >
                    Project Terms
                  </div>

                  <div className="flex flex-wrap items-center mt-[10px] gap-4 md:gap-8">
                    <div className="">
                      <div className="flex items-center">
                        <input
                          className="form-check-label bg-blue border border-[#e9ecef] text-white cursor-pointer mr-[8px]"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefaultMultiple"
                          value="multiple"
                          checked={milestoneType === "multiple"}
                          onChange={handleMilestoneTypeChange}
                        />
                        <label
                          className={`${inter500.className} text-[14px] text-[#718096]`}
                          htmlFor="flexRadioDefaultMultiple"
                        >
                          Multiple Milestone
                        </label>
                      </div>
                    </div>
                    <div className="">
                      <div className="flex items-center">
                        <input
                          className=" bg-gray border border-[#e9ecef] cursor-pointer mr-[8px]"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefaultSingle"
                          value="single"
                          checked={milestoneType === "single"}
                          onChange={handleMilestoneTypeChange}
                        />
                        <label
                          className={`form-check-label ${inter500.className} text-[14px] text-[#718096]`}
                          htmlFor="flexRadioDefaultSingle"
                        >
                          Single Milestone
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    {myApplicationDetails?.milestone.map((mile) => {
                      return (
                        <div
                          key={index}
                          className="flex flex-col justify-start items-center my-3 w-full"
                        >
                          <div className="flex flex-col md:flex-row gap-3 items-center justify-start w-full">
                            <div className="w-full md:w-auto">
                              <div className="space-y-2">
                                <label
                                  htmlFor=""
                                  className={`${inter500.className} text-[16px] text-[#2D3748] block`}
                                >
                                  Milestone
                                </label>
                                <input
                                  id={``}
                                  type="text"
                                  className={`${inter500.className} text-[#495057] border w-full md:w-auto border-[#E2E8F0] rounded-[0.25rem] text-[14px] h-[40px] p-2 focus:outline-none`}
                                  value={
                                    milestone ? milestone : mile.milestone_task
                                  }
                                  onChange={(e) =>
                                    handleInputChange(e, setMilestone)
                                  }
                                />

                                <div
                                  className={`text-red text-[12px] mb-[20px] min-h-[20px] ${inter500.className}`}
                                >
                                  {errors.milestone && errors.milestone}
                                </div>
                              </div>
                            </div>

                            <div className="w-full md:w-auto">
                              <div className="space-y-2">
                                <label
                                  htmlFor={`validationHours`}
                                  className={`${inter500.className} text-[16px] block text-[#2D3748]`}
                                >
                                  Hours
                                </label>
                                <input
                                  type="number"
                                  className={`${inter500.className} text-[#495057] border w-full md:w-[200px] border-[#E2E8F0] rounded-[0.25rem] text-[14px] h-[40px] p-2 focus:outline-none`}
                                  placeholder="Hours"
                                  value={hour ? hour : mile.milestone_hours}
                                  onChange={(e) =>
                                    handleInputChange(e, setHour)
                                  }
                                  id={`validationHours`}
                                  min="0"
                                  max="1000"
                                  onKeyDown={(e) => {
                                    if (
                                      e.target.value.length >= 4 ||
                                      parseInt(e.target.value + e.key) > 1000
                                    ) {
                                      e.preventDefault();
                                    }
                                    if (
                                      !(
                                        e.key === "Backspace" ||
                                        e.key === "Delete" ||
                                        e.key === "ArrowLeft" ||
                                        e.key === "ArrowRight" ||
                                        e.key === "Home" ||
                                        e.key === "End" ||
                                        (e.key >= "0" && e.key <= "9")
                                      )
                                    ) {
                                      e.preventDefault();
                                    }
                                  }}
                                />

                                <div
                                  className={`text-red text-[12px] mb-[20px] min-h-[20px] ${inter500.className}`}
                                >
                                  {errors.hour && errors.hour}
                                </div>
                              </div>
                            </div>

                            <div className="w-full md:w-auto">
                              <div className="space-y-2">
                                <label
                                  htmlFor={`validationBidAmount`}
                                  className={`${inter500.className} text-[16px] block mb-[8px] text-[#2D3748]`}
                                >
                                  Bid Amount
                                </label>
                                <div className="flex items-center">
                                  <div
                                    className={`w-[40px] bg-[#e9ecef] h-[40px] flex items-center justify-center rounded-l`}
                                  >
                                    <span
                                      className={`${inter500.className} text-sm text-[#495057]`}
                                    >
                                      N
                                    </span>
                                  </div>
                                  <input
                                    type="number"
                                    className={`${inter500.className} text-[#495057] border w-full md:w-auto border-[#E2E8F0] rounded-[0.25rem] text-[14px] h-[40px] p-2 focus:outline-none`}
                                    placeholder="Bid Amount"
                                    value={
                                      bidAmount
                                        ? bidAmount
                                        : mile.milestone_price
                                    }
                                    onChange={(e) =>
                                      handleInputChange(e, setBidAmount)
                                    }
                                    id={`validation`}
                                    min="0"
                                    max="1000000"
                                    onKeyDown={(e) => {
                                      if (
                                        e.target.value.length >= 7 ||
                                        parseInt(e.target.value + e.key) >
                                          1000000
                                      ) {
                                        e.preventDefault();
                                      }

                                      if (
                                        !(
                                          e.key === "Backspace" ||
                                          e.key === "Delete" ||
                                          e.key === "ArrowLeft" ||
                                          e.key === "ArrowRight" ||
                                          e.key === "Home" ||
                                          e.key === "End" ||
                                          (e.key >= "0" && e.key <= "9")
                                        )
                                      ) {
                                        e.preventDefault();
                                      }
                                    }}
                                  />
                                </div>

                                <div
                                  className={`text-red text-[12px] min-h-[20px] mb-[20px] ${inter500.className}`}
                                >
                                  {errors.bidAmount && errors.bidAmount}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col md:flex-row items-center w-full gap-3 md:my-2">
                            <div className="w-full md:w-auto">
                              <div className="flex flex-col gap-2">
                                <label
                                  htmlFor={`validationStartDate`}
                                  className={`${inter500.className} text-[16px] block text-[#2D3748]`}
                                >
                                  Expected Start Date
                                </label>
                                <DatePicker
                                  placeholderText="MM/DD/YYYY"
                                  className="border border-[#E2E8F0] rounded-[0.25rem] text-[14px] h-[40px] p-2 w-full md:w-[250px]"
                                  selected={
                                    startDate
                                      ? startDate
                                      : new Date(
                                          mile.milestone_original_start_date
                                        )
                                  }
                                  onChange={(date) => setStartDate(date)}
                                  isClearable
                                />

                                <div
                                  className={`text-red text-[12px] min-h-[20px] mb-[20px] ${inter500.className}`}
                                >
                                  {errors.startDate && errors.startDate}
                                </div>
                              </div>
                            </div>

                            <div className="w-full md:w-auto">
                              <div className="flex flex-col gap-2">
                                <label
                                  htmlFor={`validationEndDate`}
                                  className={`${inter500.className} text-[16px] block text-[#2D3748]`}
                                >
                                  Expected Due Date
                                </label>
                                <DatePicker
                                  placeholderText="MM/DD/YYYY"
                                  id="validationEndDate"
                                  className="border border-[#E2E8F0] rounded-[0.25rem] text-[14px] h-[40px] p-2 w-full md:w-[250px]"
                                  selected={
                                    endDate
                                      ? endDate
                                      : new Date(
                                          mile.milestone_original_end_date
                                        )
                                  }
                                  onChange={(date) => setEndDate(date)}
                                />

                                <div
                                  className={`text-red text-[12px] min-h-[20px] mb-[20px] ${inter500.className}`}
                                >
                                  {errors.endDate && errors.endDate}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {/* **********************add more*********************** */}
                    <input
                      type="button"
                      className={`w-full md:w-auto cursor-pointer bg-[#E9F1FF] ${inter600.className} text-[14px] text-[#434343] text-center border border-transparent rounded-sm py-[10px] my-3 px-[12px] hover:bg-[#1068AD] hover:text-[#fff]`}
                      value="Add more"
                      disabled
                    />
                  </div>

                  <div className="">
                    <div className="mb-[1rem]">
                      <label
                        htmlFor="validationTooltip01"
                        className={`inline-block mb-[8px] text-[#2D3748] text-[16px] w-full ${inter500.className}`}
                      >
                        Job Pitch
                      </label>
                      <textarea
                        className={`block ${inter500.className} w-full py-[0.375rem] px-[0.75rem] text-[#495057] border border-[#ced4da] text-[14px] rounded-[0.25rem]`}
                        id="cletter"
                        name="cletter"
                        placeholder="Please enter your pitch for this job"
                        value={jobPitch}
                        onChange={(e) => handleInputChange(e, setJobPitch)}
                      ></textarea>

                      <div
                        className={`text-red text-[12px] mb-[20px] ${inter500.className}`}
                      >
                        {errors.jobPitch && errors.jobPitch}
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <div className="mb-[1rem]">
                      <label
                        htmlFor="files"
                        className={`inline-block mb-[8px] text-[#2D3748] text-[16px] w-full ${inter500.className}`}
                      >
                        Add Attachments
                      </label>

                      <input
                        type="file"
                        className={`m-0 block ${inter500.className} w-full py-[0.375rem] px-[0.75rem] rounded-[0.25rem]  h-[40px] border border-[#E2E8F0] text-[12.8px] text-[#adadad] ${inter.className}`}
                        id="files"
                      />
                      <small
                        className={`text-[12.8px] text-[#adadad] ${inter.className}`}
                      >
                        Note: Upload upto 1 Mb files (Allowed files only
                        docx,doc or pdf)
                      </small>
                      <br />
                      <div>
                        <button className={`flex items-center gap-2`}>
                          <span
                            className={` text-[12.8px] text-[#adadad] ${inter.className}`}
                          >
                            {rightArrowIcon}
                          </span>{" "}
                          <a
                            className={`text-[12.8px]  text-[#adadad] ${inter.className}`}
                          >
                            {myApplicationDetails.attachment[0]?.fileName}
                          </a>{" "}
                          <span
                            className={`cursor-pointer text-[#adadad] ${inter600.className}`}
                          >
                            x
                          </span>{" "}
                        </button>
                        {/* <button className={`flex items-center gap-2`}>
                      <span
                        className={` text-[12.8px] text-[#adadad] ${inter.className}`}
                      >
                        {rightArrowIcon}
                      </span>{" "}
                      <span
                        className={`text-[12.8px]  text-[#adadad] ${inter.className}`}
                      >
                        static.pdf
                      </span>{" "}
                      <span
                        className={`cursor-pointer text-[#adadad] ${inter600.className}`}
                      >
                        x
                      </span>{" "}
                    </button> */}
                        {/* <button className={`flex items-center gap-2`}>
                      <span
                        className={` text-[12.8px] text-[#adadad] ${inter.className}`}
                      >
                        {rightArrowIcon}
                      </span>{" "}
                      <span
                        className={`text-[12.8px]  text-[#adadad] ${inter.className}`}
                      >
                        static.pdf
                      </span>{" "}
                      <span
                        className={`cursor-pointer text-[#adadad] ${inter600.className}`}
                      >
                        x
                      </span>{" "}
                    </button> */}
                      </div>
                      <br />
                      <small
                        className={`text-[12.8px] text-[#adadad] ${inter.className}`}
                      >
                        Note: Changes to this proposal is subject to agreement
                        by the applicant. Do not worry, only payment makes
                        contract binding.
                      </small>
                    </div>
                  </div>
                  <div className="bg-[#F6F6F6] h-auto mt-[30px] p-[15px] rounded-[16px]">
                    <div
                      className={`text-[16px] text-[#212529] mb-[10px] ${inter500.className}`}
                    >
                      Payment Summary
                    </div>

                    <div className="flex align-items-center justify-between">
                      <div
                        className={` text-[14px] text-[#718096] mb-[8px] ${inter.className}`}
                      >
                        Total Project Cost
                      </div>
                      {totalBudget !== null && (
                        <div
                          className={`text-[14px] text-[#718096] mb-[8px] ${inter.className}`}
                        >
                          {totalBudget}
                        </div>
                      )}
                    </div>
                    <div className="flex align-items-center justify-between">
                      <div
                        className={`text-[14px] text-[#718096] mb-[8px] ${inter.className}`}
                      >
                        Freelance Fees (10%)
                      </div>
                      <div
                        className={`text-[14px] text-[#718096] mb-[8px] ${inter.className}`}
                      >
                        {totalBudget / 10}
                      </div>
                    </div>
                    <div className="flex align-items-center justify-between">
                      <div
                        className={`text-[14px] text-[#718096] mb-[8px] ${inter.className}`}
                      >
                        Your Net Earnings
                      </div>
                      <div
                        className={`text-[14px] text-[#718096] mb-[8px] ${inter.className}`}
                      >
                        {totalBudget - totalBudget / 10}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex align-items-end gap-2  border-t border-solid border-[#e9ecef] p-5">
                  <button
                    onClick={handleSubmitContract}
                    type="submit"
                    className={`w-full md:w-auto cursor-pointer bg-[#E9F1FF] ${inter600.className} text-[14px] text-[#434343] text-center border border-transparent px-[12px] py-[10px] rounded-[10px] hover:text-[#fff] hover:bg-[#1068AD]`}
                  >
                    Submit Contract
                  </button>
                </div>
                {/* ***************form end**************** */}
              </form>
            </div>
          </div>
        </div>
      </>
    </ErrorBoundary>
  );
}
ContractModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ContractModal;
